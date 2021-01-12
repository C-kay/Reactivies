#define Managed
using System;
using Azure.Extensions.AspNetCore.Configuration.Secrets;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Domain;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Azure.KeyVault;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.AzureKeyVault;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;


namespace API
{
    
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope()){
                var services = scope.ServiceProvider;
                try{
                    var context = services.GetRequiredService<DataContext>();
                    var userManager = services.GetRequiredService<UserManager<AppUser>>();
                    context.Database.Migrate();
                    Seed.SeedData(context, userManager).Wait();
                }catch(Exception ex){
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occured during migration");
                }
            }
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
               
                // .ConfigureAppConfiguration((context, config) =>
                // {
                //     if (context.HostingEnvironment.IsProduction())
                //     {
                //         var builtConfig = config.Build();
                //         //var azCredentialOptions = new DefaultAzureCredentialOptions();
                //         //azCredentialOptions.SharedTokenCacheUsername = "ceekay@ckobieyisigmail.onmicrosoft.com";
                //         var secretClient = new SecretClient(new Uri(builtConfig["VaultName"]),
                //                                                 new DefaultAzureCredential());
                //         config.AddAzureKeyVault(secretClient, new KeyVaultSecretManager());
                //     }
                // })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
                //  .ConfigureAppConfiguration((context, config) =>
                // {
                //     var builtConfig = config.Build();
                //     var vaultName = builtConfig["VaultName"];
                //     var azCredentialOptions = new DefaultAzureCredentialOptions();
                //     azCredentialOptions.SharedTokenCacheUsername = "ceekay@ckobieyisigmail.onmicrosoft.com";
                //     var credential = new DefaultAzureCredential(azCredentialOptions);
                //     var keyVaultClient = new KeyVaultClient(
                //         async (authority, resource, scope) =>
                //         {
                //             var token = await credential.GetTokenAsync(
                //                 new Azure.Core.TokenRequestContext(
                //                     new[] { "https://vault.azure.net/.default" }));
                //             return token.Token;
                //         });
                //     config.AddAzureKeyVault(
                //         vaultName,
                //         keyVaultClient,
                //         new DefaultKeyVaultSecretManager());
                // });
              
                
                
                
    }
}
