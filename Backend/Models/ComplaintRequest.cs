namespace project2.Models
{
    public class ComplaintRequest
    {
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Location { get; set; }
        //public IFormFile Attachment { get; set; } // Optional photo
    }
}
