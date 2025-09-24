using System;
using System.Collections.Generic;

namespace project2.Models;

public partial class ComplaintAttachment
{
    public int AttachmentId { get; set; }

    public int ComplaintId { get; set; }
    //public object ComplaintID { get; internal set; } = null!;
    public string FilePath { get; set; } = null!;

    public DateTime UploadedAt { get; set; }

    public virtual Complaint Complaint { get; set; } = null!;
}
