using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest{
           
            public Guid Id {get; set;}
            public string Title{get; set;}
            public string Description {get; set;}
            public string Category {get; set;}
            public DateTime? Date {get; set;}
            public string City {get; set;}
            public string Venue {get; set;}
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=> x.Title).NotEmpty();
                RuleFor(x=> x.Description).NotEmpty();
                RuleFor(x=> x.Category).NotEmpty();
                RuleFor(x=> x.Date).NotEmpty();
                RuleFor(x=> x.City).NotEmpty();
                RuleFor(x=> x.Venue).NotEmpty();
            }
        }
        

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id); // when you update any thing in acitivity it changes in the db too

                
                if(activity == null) throw new RestException(HttpStatusCode.NotFound, new {
                    activity="Not found"
                });

                activity.Title = request.Title ?? activity.Title ; // if its null then activity.Title is passed back to it
                activity.Description = request.Description ?? activity.Description;
                activity.Category = request.Category ?? activity.Category;
                activity.Date = request.Date ?? activity.Date; //make optional above to because DateTime can't be null
                activity.City = request.City ?? activity.City;
                activity.Venue = request.Venue ?? activity.Venue;
            
                var success = await _context.SaveChangesAsync() > 0; //checks if the request have been add to the database

                if(success) return Unit.Value;

                throw new Exception("Problem saving changes changes");
            }

        }
    
    }
}