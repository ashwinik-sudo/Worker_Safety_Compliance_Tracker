using System;
using System.Collections.Generic;

namespace project2.Models;

public partial class TrainingMaterial
{
    public int MaterialId { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public string FilePath { get; set; } = null!;

    public DateTime UploadedAt { get; set; }
}
