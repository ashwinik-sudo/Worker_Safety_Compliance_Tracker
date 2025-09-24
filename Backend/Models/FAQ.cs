using System.ComponentModel.DataAnnotations;

namespace project2.Models
{
    public class FAQ
    {
        
            [Key]
            public int FAQId { get; set; }

            [Required(ErrorMessage = "Question is required.")]
            [StringLength(500)]
            public string Question { get; set; }

            [Required(ErrorMessage = "Answer is required.")]
            [StringLength(2000)]
            public string Answer { get; set; }

            public DateTime CreatedAt { get; set; } = DateTime.Now;
        }
    }

