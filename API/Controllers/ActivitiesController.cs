using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
   
    public class ActivitiesController : BaseController
    {

        [HttpGet]
        public async Task <ActionResult<List.ActivitiesEnvelope>> List(int? limit, int? offset){
            return await Mediator.Send(new List.Query(limit, offset));
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task <ActionResult<ActivityDto>> Details(Guid id){
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Commmand commmand){ //[FromBody] no need because [ApiController]
            return await Mediator.Send(commmand);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command commmand){ //[FromBody]
            commmand.Id =id;
            return await Mediator.Send(commmand);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult<Unit>> Delete(Guid id){ //[FromBody]
        
            return await Mediator.Send(new Delete.Command{Id = id});
        }

        [HttpPost("{id}/attend")]
        public async Task<ActionResult<Unit>> Attend(Guid id){ //[FromBody]
        
            return await Mediator.Send(new Attend.Command{Id = id});
        }

        [HttpDelete("{id}/unattend")]
        public async Task<ActionResult<Unit>> Unattend(Guid id){ //[FromBody]
        
            return await Mediator.Send(new Unattend.Command{Id = id});
        }
    }
}