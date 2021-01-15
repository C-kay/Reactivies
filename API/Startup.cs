using API.Middleware;
using Application.Activities;
using Domain;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Persistence;
using Microsoft.AspNetCore.Identity;
using Application.Interfaces;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using AutoMapper;
using API.SignalR;
using System.Threading.Tasks;
using Infrastructure.Photos;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.

        public void ConfigureDevelopmentServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(option =>{
                option.UseLazyLoadingProxies();
                option.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });

            ConfigureServices(services);
        }

        public void ConfigureProductionServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(option =>{
                option.UseLazyLoadingProxies();
                option.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
                //option.UseSqlServer(Configuration.GetValue<string>("DefaultConnection"));
            });

            ConfigureServices(services);
        }
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers(opt =>{
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            })
                .AddFluentValidation(cfg =>{
                    cfg.RegisterValidatorsFromAssemblyContaining<Create>();
                });
                
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
                c.CustomSchemaIds(x => x.FullName);
            });

            services.AddCors(options =>{
                options.AddPolicy("CorsPolicy", policy =>{
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000")
                    .AllowCredentials();
                });
            });
            
            services.AddMediatR(typeof(List.Handler).Assembly);

            services.AddAutoMapper(typeof(List.Handler));

            services.AddSignalR();

            var builder = services.AddIdentityCore<AppUser>();
            var IdentityBuilder= new IdentityBuilder(builder.UserType, builder.Services);
            IdentityBuilder.AddEntityFrameworkStores<DataContext>();
            IdentityBuilder.AddSignInManager<SignInManager<AppUser>>();

            services.AddAuthorization(opt => {
                opt.AddPolicy("IsActivityHost", policy =>{
                    policy.Requirements.Add(new IsHostRequirement());
                });
            });

            services.AddTransient<IAuthorizationHandler, IsHostRequirementHander>();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenKey"]));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>{
                    opt.TokenValidationParameters =new TokenValidationParameters{
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateAudience= false,
                        ValidateIssuer= false
                    };

                    opt.Events = new JwtBearerEvents{
                        OnMessageReceived = context =>
                        {
                            var accessToken = context.Request.Query["access_token"];
                            var path = context.HttpContext.Request.Path;
                            if(!string.IsNullOrEmpty(accessToken) 
                                && (path.StartsWithSegments("/chat")))
                            {
                                context.Token = accessToken;
                            }
                            return Task.CompletedTask;
                        }
                    };
                });

            services.AddScoped<IJwtGenerator, JwtGenerator>();
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IFacebookAccessor, FacebookAccessor>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.Configure<FacebookAppSettings>(Configuration.GetSection("Authentication:Facebook"));
            services.Configure<CloudinarySettings>(Configuration.GetSection("Cloudinary"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            app.UseMiddleware<ErrorHandlingMiddleware>();
            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }else{
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            // app.UseXContentTypeOptions();
            // app.UseReferrerPolicy(opt => opt.NoReferrer());
            // app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
            // app.UseXfo(opt => opt.Deny());
            // app.UseCspReportOnly(opt => opt
            //         .BlockAllMixedContent()
            //         .StyleSources(s => s.Self())
            //         .FontSources(s => s.Self())
            //         .FormActions(s => s.Self())
            //         .FrameAncestors( s =>s.Self())
            //         .ImageSources(s => s.Self())
            //         .ScriptSources(s => s.Self())
            //     );

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseRouting();
            //app.UseHttpsRedirection();
            app.UseCors("CorsPolicy");
        
            
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chat");
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
            
    }
}
