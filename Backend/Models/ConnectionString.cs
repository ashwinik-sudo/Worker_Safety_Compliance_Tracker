namespace project2.Models
{
    public class ConnectionString
    {
        private static string dbcs = "Server=(localdb)\\MSSQLLocalDB;" +
                                      "Database=SafetyDB;" +
                                      "Trusted_Connection=True";

        public static string cs { get => dbcs; }
    }
}
