using System;
using System.Collections.Generic;

namespace project2.Models;

public partial class Alert
{
    public int AlertId { get; set; }

    public string? Message { get; set; }

    public string? TargetRole { get; set; }

    public DateTime? CreatedAt { get; set; }
}
