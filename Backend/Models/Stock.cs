using System;
using System.Collections.Generic;

namespace project2.Models;

public partial class Stock
{
    public int ItemId { get; set; }

    public string ItemName { get; set; } = null!;

    public int CurrentQuantity { get; set; }

    public int ReorderLevel { get; set; }

    public DateTime LastUpdated { get; set; }
}
