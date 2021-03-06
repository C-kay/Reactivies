using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest { 

            public string Id{get; set;}
            
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
        
            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
                
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
    
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName ==
                _userAccessor.GetCurrentUserName());

                var photo = user.Photo.FirstOrDefault(x=>x.Id == request.Id);

                if(photo == null)
                    throw new RestException(HttpStatusCode.NotFound, new {Photos= "Not found"});

                var currentMain = user.Photo.FirstOrDefault(x =>x.isMain);

                currentMain.isMain = false;
                photo.isMain = true;

                var success = await _context.SaveChangesAsync() > 0; //checks if the request have been add to the database

                if(success) return Unit.Value;

                throw new Exception("Problem saving changes changes");
            }
        }
    }
}