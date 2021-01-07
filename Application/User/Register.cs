using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class Register
    {
        public class Command : IRequest<User>{
           
            public string DisplayName {get; set;}
            public string Username {get; set;}
            public string Email {get; set;}
            public string Password {get; set;}
           
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.DisplayName).NotEmpty();
                RuleFor(x=>x.Username).NotEmpty();
                RuleFor(x=>x.Email).NotEmpty().EmailAddress();
                RuleFor(x=>x.Password).Password();   
            }
        }


        public class Handler : IRequestHandler<Command, User>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGerator;

            public Handler(DataContext context, UserManager<AppUser> userManager, IJwtGenerator jwtGerator)
            {
                _context = context;
                _userManager = userManager;
                _jwtGerator = jwtGerator;
            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {

                if(await _context.Users.AnyAsync(x=> x.Email == request.Email))
                {
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, 
                    new {EmailTokenProvider= "Email already exists"});
                }

                if(await _context.Users.AnyAsync(x=> x.UserName == request.Username))
                {
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, 
                    new {EmailTokenProvider= "Username already exists"});
                }


                var user = new AppUser{
                    DisplayName = request.Email,
                    Email = request.Email,
                    UserName = request.Username
                };
            
                var result = await _userManager.CreateAsync(user, request.Password);

                if(result.Succeeded){
                    return new User
                    {
                        DisplayName = user.DisplayName,
                        Token= _jwtGerator.CreateToken(user),
                        Username = user.UserName,
                        Image= null
                    };
                }

                throw new Exception("Problem creating user");

            }

        }
    }
}