namespace project2.Models
{
    public class FeedbackDTO
    {
        public int UserId { get; set; }
        public string Comment { get; set; } = null!;
        public int? Rating { get; set; }
    }
}
