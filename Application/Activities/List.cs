using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
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
            public Query(int? limit, int? offset)
            {
                this.Limit = limit;
                this.offset = offset;

            }
            public int? Limit { get; set; }
            public int? offset { get; set; }
        }

        public class Handler : IRequestHandler<Query, ActivitiesEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ActivitiesEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                
                var querable = _context.Activities.AsQueryable();
                
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