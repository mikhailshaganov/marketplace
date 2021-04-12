using System.ComponentModel.DataAnnotations;

namespace Server.BLL.DTO.UserAuthenticate
{
    public class UserAuthenticateRequest
    {
        [Required]
        public string NameIdentifier { get; set; }

        [Required]
        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}
