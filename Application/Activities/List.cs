using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{

    public class List
    {
        public class ActivitiesEnvelope
        {
            public List<ActivityDto> Activities { get; set; }
            public int ActivityCount { get; set; }
        }
        public class Query : IRequest<ActivitiesEnvelope>
        {
            public Query(int? limit, int? offset, bool isGoing, bool isHost, DateTime? startDate)
            {
                this.Limit = limit;
                this.offset = offset;
                this.IsHost = isHost;
                this.IsGoing = isGoing;
                this.StartDate = startDate ?? DateTime.Now;
            }
            public int? Limit { get; set; }
            public int? offset { get; set; }
            public bool IsHost { get; set; }
            public bool IsGoing { get; set; }
            public DateTime? StartDate { get; set; }
        }

        public class Handler : IRequestHandler<Query, ActivitiesEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<ActivitiesEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                
                var querable = _context.Activities
                    .Where(x => x.Date >= request.StartDate)
                    .OrderBy(x => x.Date)
                    .AsQueryable();

                if(request.IsGoing && !request.IsHost)
                {
                    querable = querable.Where(x => x.UserActivities.Any(a => 
                    a.AppUser.UserName == _userAccessor.GetCurrentUserName()));
                }

                if(request.IsHost && !request.IsGoing)
                {
                    querable = querable.Where(x => x.UserActivities.Any(a => 
                    a.AppUser.UserName == _userAccessor.GetCurrentUserName() && a.isHost));
                }
                
                var activities = await querable
                    .Skip(request.offset ?? 0) //if it isn't set then it is set to zero
                    .Take(request.Limit ?? 3).ToListAsync();

                // if(activities == null) throw new RestException(HttpStatusCode.NotFound, new {
                //     activity="Not found"
                // });

                return new ActivitiesEnvelope
                {
                    Activities = _mapper.Map<List<Activity>, List<ActivityDto>>(activities),
                    ActivityCount = querable.Count()
                };

            }
        }
    }

}