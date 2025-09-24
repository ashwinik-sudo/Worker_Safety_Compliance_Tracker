using System;
using System.Collections.Generic;

namespace project2.Models;

public partial class Request
{
    public int RequestId { get; set; }

    public int UserId { get; set; }

    public string ItemName { get; set; } = null!;

    public int Quantity { get; set; }

    public string Status { get; set; } = null!;

    public DateTime RequestedAt { get; set; }

    public virtual User User { get; set; } = null!;
}
