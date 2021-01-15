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
    public class Delete
    {
        public class Command : IRequest{ 

            public string Id{get; set;}
            
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
                _photoAccessor = photoAccessor;
                
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
    
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName ==
                _userAccessor.GetCurrentUserName());

                var photo = user.Photo.FirstOrDefault(x=> x.Id == request.Id);

                if(photo ==null)
                    throw new RestException(HttpStatusCode.NotFound, new {Photo= "Not found"});
                
                if(photo.isMain)
                    throw new RestException(HttpStatusCode.BadRequest, new { Photo= 
                    "you cannot delete your main photo" });

                var result = _photoAccessor.DeletePhoto(photo.Id);

                if(result ==null)
                    throw new Exception("Problem deleting photo");
                
                user.Photo.Remove(photo);

                var success = await _context.SaveChangesAsync() > 0; //checks if the request have been add to the database

                if(success) return Unit.Value;

                throw new Exception("Problem saving changes changes");
            }
        }
    }
}