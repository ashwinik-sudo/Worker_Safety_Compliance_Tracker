using Microsoft.Data.SqlClient;

namespace project2.Models
{
    public class ComplainDAL
    {
        public string cs = ConnectionString.cs;
        public void RaiseAComplain(TitleDesc td)
        {
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("RAISE", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                Random rand = new Random();
                int supId = rand.Next(2) == 0 ? 2 : 12;

                cmd.Parameters.AddWithValue("@UserId", td.UserId);
                cmd.Parameters.AddWithValue("@AssignedToSupervisorID", supId);
                cmd.Parameters.AddWithValue("@Title", td.Title);
                cmd.Parameters.AddWithValue("@Description", td.Description);
                cmd.Parameters.AddWithValue("@createdAt", DateTimeOffset.UtcNow);
                cmd.Parameters.AddWithValue("@status", 0);
                cmd.Parameters.AddWithValue("@resolvedAt", DateTimeOffset.UtcNow.AddDays(5));

                con.Open();
                cmd.ExecuteNonQuery();

            }
        }

        public void SuperComplainStatusChange(int id)
        {
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("PROGRESS", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                con.Open();
                cmd.ExecuteNonQuery();
            }

        }


        public void ResolvedStatus(int id)
        {
            using (SqlConnection con = new SqlConnection(cs))
            {

                SqlCommand cmd = new SqlCommand("RESOLVED", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                con.Open();
                cmd.ExecuteNonQuery();
            }

        }

        public List<Title> SuperComplains(int supId)

        {

            List<Title> comp = new List<Title>();

            using (SqlConnection con = new SqlConnection(cs))

            {

                SqlCommand cmd = new SqlCommand("Supervisor", con);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@supId", supId);

                con.Open();

                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())

                {

                    Title t = new Title();

                    t.title = reader["Title"].ToString();
                    t.ComplaintID = Convert.ToInt32(reader["ComplaintID"]);

                    comp.Add(t);

                }

            }

            return comp;


        }


        public List<Complaint> allComplaint()
        {
            List<Complaint> complist = new List<Complaint>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("SELECT * FROM COMPLAINTS", con);
                cmd.CommandType = System.Data.CommandType.Text;
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    int cid = reader["ComplaintId"] != DBNull.Value ? Convert.ToInt32(reader["ComplaintId"]) : 0;
                    int uid = reader["UserId"] != DBNull.Value ? Convert.ToInt32(reader["UserId"]) : 0;
                    int? sid = reader["AssignedToSupervisorID"] != DBNull.Value ? Convert.ToInt32(reader["AssignedToSupervisorID"]) : null;
                    string Title = reader["Title"] != DBNull.Value ? reader["Title"].ToString()! : string.Empty;
                    string Description = reader["Description"] != DBNull.Value ? reader["Description"].ToString()! : string.Empty;
                    DateTime cat = reader["createdAt"] != DBNull.Value ? (DateTime)reader["createdAt"] : DateTime.MinValue;
                    DateTime rat = reader["resolvedAt"] != DBNull.Value ? (DateTime)reader["resolvedAt"] : DateTime.MinValue;
                    int st = reader["Status"] != DBNull.Value ? Convert.ToInt32(reader["Status"]) : 0;

                    Complaint cc = new Complaint();
                    cc.ComplaintId = cid;
                    cc.UserId = uid;    
                    cc.AssignedToSupervisorId = sid;
                    cc.Title = Title;
                    cc.Description = Description;
                    cc.CreatedAt = cat;
                    cc.ResolvedAt = rat == DateTime.MinValue ? null : rat;
                    if(Convert.ToInt32(st) == 0) cc.Status = "Pending";
                    else if (Convert.ToInt32(st) == 1) cc.Status = "In-Progress";
                    else if (Convert.ToInt32(st) == 2) cc.Status = "Resolved";
                    else if(Convert.ToInt32(st) == 3) cc.Status = "Withdrawn"; 


                    complist.Add(cc);
                }
            }
            return complist;
        }

        //View my complaints for a user
        public List<Mycomplaint> UserMyComplaint(int userId)
        {
            List<Mycomplaint> mycomp = new List<Mycomplaint>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("MyComplProgress", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@UserId", userId);
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Mycomplaint cp = new Mycomplaint();
                    cp.ComplaintId = Convert.ToInt32(reader["ComplaintId"]);
                    cp.Title = reader["Title"].ToString() ?? "";
                    int st = Convert.ToInt32(reader["Status"]);
                    if (st == 0)
                        cp.Status = "Pending";
                    else if (st == 1)
                        cp.Status = "In-Progress";
                    else if (st == 2)
                        cp.Status = "Resolved";
                    else if (st == 3)
                        cp.Status = "Withdrawn";

                    mycomp.Add(cp);
                }

            }
            return mycomp;
        }





    }
}
