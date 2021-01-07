using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Attend
    {
        public class Command : IRequest{
           
            public Guid Id {get; set;}
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id); // when you update any thing in acitivity it changes in the db too

                
                if(activity == null) throw new RestException(HttpStatusCode.NotFound, new {
                    activity="Could not find activity"
                });

                var user = await _context.Users
                    .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());

                var attendance = await _context.UserActivities
                    .SingleOrDefaultAsync(x => x.ActivityId == activity.Id && x.AppUserId == user.Id);

                if(attendance != null)
                throw new RestException(HttpStatusCode.BadRequest,
                    new {Attendance = "Already attending this activity"});

                attendance = new UserActivity
                {
                    Activity = activity,
                    AppUser = user,
                    isHost = false,
                    DateJoined = DateTime.Now
                };

                _context.UserActivities.Add(attendance);

                var success = await _context.SaveChangesAsync() > 0; //checks if the request have been add to the database

                if(success) return Unit.Value;

                throw new Exception("Problem saving changes changes");
            }

        }
    }
}