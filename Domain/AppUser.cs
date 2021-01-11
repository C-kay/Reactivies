using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [StringLength(50)]
        override
        public string Id { get; set; }
        public string DisplayName { get; set; }
        public virtual ICollection<UserActivity> UserActivities {get; set;}
    }
}