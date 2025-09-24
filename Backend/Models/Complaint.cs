using System;
using System.Collections.Generic;

namespace project2.Models;

public partial class Complaint
{
    public int ComplaintId { get; set; }
    //public object ComplaintID { get; internal set; }
    public int UserId { get; set; }

    public int? AssignedToSupervisorId { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Status { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime? ResolvedAt { get; set; }

    public virtual User? AssignedToSupervisor { get; set; }

    public virtual ICollection<ComplaintAttachment> ComplaintAttachments { get; set; } = new List<ComplaintAttachment>();

    public virtual User User { get; set; } = null!;
}
