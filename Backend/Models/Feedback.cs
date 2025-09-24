using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace project2.Models;

public partial class Feedback
{
    public int FeedbackId { get; set; }

    public int UserId { get; set; }

    public string Comment { get; set; } = null!;

    public int? Rating { get; set; }

    public DateTime CreatedAt { get; set; }
    [JsonIgnore]
    public virtual User User { get; set; } = null!;
}
