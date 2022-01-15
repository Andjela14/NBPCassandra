using Cassandra;
using System;
using System.Collections.Generic;
using System.Text;
using OglasiSe.Models;
namespace OglasiSe
{
    public static class DataProvider
    {
        private static bool isReturned = false;
        #region User

        public static String RegistredUser(string username, string password){
            try
            {
                ISession session = SessionManager.GetSession();

                if (session == null)
                    return null;

                var prijave = session.Execute("SELECT * FROM \"User\" where username='" + username + "';");

                User user = null;
            
                foreach (var row in prijave)
                {
                    user = new User();
                    user.password = row["password"] != null ? row["password"].ToString() : string.Empty;
                    
                }
                if ( user != null && user.password == password) {
                    return "yes";
                }
                else if ( user != null && user.password != password) {
                    return "badPassword";
                }
                else{
                    return "no";
                }

            }
            catch (Exception )
            {
                return null;
            }
        }
        public static RowSet AddUser(User u)
        {
            try
            {
                ISession session = SessionManager.GetSession();
                if (session == null)
                {
                    return null;
                }
                RowSet entry = session.Execute("INSERT INTO \"User\" (username, first_name, lats_name, email, password) VALUES ('" + u.username + "', '" + u.first_name + "','" + u.lats_name +"', '" + u.email +"', '" + u.password + "') IF NOT EXISTS;");
                
                return entry;
            }
            catch (Exception )
            {
                return null;
            }
        }

        public static bool updateUsersName(string username, string first_name, string last_name)
        {
            try
            {
                ISession session = SessionManager.GetSession();
                
                
                if (session == null)
                {
                    return false;
                }

                RowSet entry = session.Execute("UPDATE \"User\" SET first_name = '" + first_name +"' , lats_name = '"+ last_name +"' WHERE username ='"+ username + "';");
                
                return true;
            }
            catch (Exception )
            {
                return false;
            }
        }
        
        public static RowSet updateUsersPass(string username, string new_password)
        {
            try
            {
                ISession session = SessionManager.GetSession();
                
                
                if (session == null)
                {
                    return null;
                }

                RowSet entry = session.Execute("UPDATE \"User\" SET password = '" + new_password +"' WHERE username ='"+ username + "';");
                
                return entry;
            }
            catch (Exception )
            {
                return null;
            }
        }

        public static bool DeleteUser(string username)
        {
           try
            {
                ISession session = SessionManager.GetSession();

                if (session == null)
                    return false;
                RowSet entry = session.Execute("DELETE FROM \"User\" WHERE username = '" + username + "';");
                return true;
            }
            catch (Exception )
            {
                return false;
            }
        }

        public static List<User> GetAllUsers()
        {
            try
            {
                ISession session = SessionManager.GetSession();
                if (session == null)
                    return null;

                var users = session.Execute("select * from \"User\";");
                List<User> returnList = new List<User>();
                User user = null;
                foreach (var row in users)
                {
                    user = new User();
                    user.username = row["username"] != null ? row["username"].ToString() : string.Empty;
                    user.first_name = row["first_name"] != null ? row["first_name"].ToString() : string.Empty;
                    user.lats_name = row["lats_name"] != null ? row["lats_name"].ToString() : string.Empty;
                    user.email = row["email"] != null ? row["email"].ToString() : string.Empty;
                    user.password = row["password"] != null ? row["password"].ToString() : string.Empty;
                    returnList.Add(user);
                }
                return returnList;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static bool DeleteUsersAdds(string username)
        {
            try
            {
                ISession session = SessionManager.GetSession();

                if (session == null)
                    return false;

                RowSet entry = session.Execute("DELETE FROM \"Advertisement\" WHERE username = '" + username + "';");
                return true;
            }
            catch (Exception)
            {
                return false;
            }

        }


        public static User GetUser(string username)
        {
            try
            {
                ISession session = SessionManager.GetSession();

                if (session == null)
                    return null;

                var prijave = session.Execute("SELECT * FROM \"User\" where username='" + username + "';");

                User user = null;
                foreach (var row in prijave)
                {
                    user = new User();
                    user.first_name = row["first_name"] != null ? row["first_name"].ToString() : string.Empty;
                    user.lats_name = row["lats_name"] != null ? row["lats_name"].ToString() : string.Empty;
                    user.username = row["username"] != null ? row["username"].ToString() : string.Empty;
                    user.email = row["email"] != null ? row["email"].ToString() : string.Empty;
                    user.password = row["password"] != null ? row["password"].ToString() : string.Empty;
                    

                }

                return user;
            }
            catch (Exception)
            {
                return null;
            }
        }
        
        #endregion

        #region Advertisement
        public static List<Advertisement> GetUsersAdds(string username)
        {
            try
            {
                ISession session = SessionManager.GetSession();

                if (session == null)
                    return null;

                var adds = session.Execute("select * from  \"UsersAdds\"  where username = '" + username + "';");
                List<Advertisement> addsList = new List<Advertisement>();
                Advertisement newadd = null;

                foreach (var add in adds)
                {
                    newadd =new Advertisement();
                    newadd.added_date = DateTime.Parse(add["added_date"].ToString());
                    newadd.add_title = add["add_title"] == null ? string.Empty : add["add_title"].ToString();
                    newadd.description = add["description"] == null ? string.Empty : add["description"].ToString();
                    newadd.location = add["location"] == null ? string.Empty : add["location"].ToString();
                    newadd.phonenumber = add["phonenumber"] == null ? string.Empty : add["phonenumber"].ToString();
                    newadd.username = add["username"] == null ? string.Empty : add["username"].ToString();
                    newadd.category = add["category"] == null ? string.Empty : add["category"].ToString();
                   
                   

                    addsList.Add(newadd);
                    
                }
                return addsList;
            }
            catch (Exception)
            {
                return null;
            }
        }
        
        public static List<Advertisement> GetAddsByCategory(string category)

        {
            try
            {
                ISession session = SessionManager.GetSession();

                if (session == null)
                    return null;

                var adds = session.Execute("SELECT * FROM \"Adds_by_category\" where category ='" + category + "';");
                List<Advertisement> addsList = new List<Advertisement>();
                Advertisement newadd = null;

                foreach (var add in adds)
                {
                    newadd =new Advertisement();
                    newadd.added_date = DateTime.Parse(add["added_date"].ToString());
                    newadd.add_title = add["add_title"] == null ? string.Empty : add["add_title"].ToString();
                    newadd.description = add["description"] == null ? string.Empty : add["description"].ToString();
                    newadd.location = add["location"] == null ? string.Empty : add["location"].ToString();
                    newadd.phonenumber = add["phonenumber"] == null ? string.Empty : add["phonenumber"].ToString();
                    newadd.username = add["username"] == null ? string.Empty : add["username"].ToString();
                    newadd.category = add["category"] == null ? string.Empty : add["category"].ToString();
                  
                    addsList.Add(newadd);
                    
                }
                return addsList;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static List<Advertisement> GetLatestAdds()
        {
            try
            {
                ISession session = SessionManager.GetSession();

                if (session == null)
                    return null;

                var adds = session.Execute("SELECT * FROM \"LatestAdds\";");
                List<Advertisement> addsList = new List<Advertisement>();
                Advertisement newadd = null;

                foreach (var add in adds)
                {
                    newadd =new Advertisement();
                    newadd.added_date = DateTime.Parse(add["added_date"].ToString());
                    newadd.add_title = add["add_title"] == null ? string.Empty : add["add_title"].ToString();
                    newadd.description = add["description"] == null ? string.Empty : add["description"].ToString();
                    newadd.location = add["location"] == null ? string.Empty : add["location"].ToString();
                    newadd.phonenumber = add["phonenumber"] == null ? string.Empty : add["phonenumber"].ToString();
                    newadd.username = add["username"] == null ? string.Empty : add["username"].ToString();
                    newadd.category = add["category"] == null ? string.Empty : add["category"].ToString();
                    

                    addsList.Add(newadd);
                    
                }
                addsList.Reverse();
                return addsList;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static List<string> GetLikedAdds(string username)
        {
            try
            {
                ISession session = SessionManager.GetSession();
                if (session == null)
                    return null;

                var likedadds = session.Execute("SELECT * FROM \"LikedAdds\" where username = '" + username +"';");
                List<string> addsList = new List<string>();
                
                foreach (var add in likedadds)
                {
                    addsList.Add( add["add_title"] == null ? string.Empty : add["add_title"].ToString());    
                }
                return addsList;
            }
            catch (Exception)
            {
                return null;
            }
        }

        

        public static bool LikeAdd(string username,string add_title,string added_date)
        {
            try
            {
                ISession session = SessionManager.GetSession();
                if (session == null)
                    return false;

                RowSet likedadds = session.Execute("INSERT INTO \"LikedAdds\" (username, add_title, added_date) VALUES ('" + username + "', '" + add_title + "', '"+ added_date +"');");
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public static bool UnlikeAdd(string username,string add_title,string added_date)
        {
            try
            {
                ISession session = SessionManager.GetSession();
                if (session == null)
                    return false;

                RowSet likedadds = session.Execute("DELETE  FROM \"LikedAdds\" where username = '" + username + "' and add_title = '" + add_title + "';");
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public static bool AddUserAdd( Advertisement add)
        {
            try
            {
                ISession session = SessionManager.GetSession();
                if (session == null)
                    return false;

                RowSet entryAdd = session.Execute("INSERT INTO \"UsersAdds\" (username, add_title, added_date, description, location, phonenumber, category) VALUES ('" + add.username + "', '" + add.add_title + "', toTimeStamp(now()), '" + add.description +"', '" + add.location +"', '"+ add.phonenumber + "', '"+ add.category  + "');");
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public static bool AddAddsByCategory( Advertisement add)
        {
            try
            {
                ISession session = SessionManager.GetSession();
                if (session == null)
                    return false;

                RowSet entryAdd = session.Execute("INSERT INTO \"Adds_by_category\" (username, add_title, added_date, description, location, phonenumber, category) VALUES ('" + add.username + "', '" + add.add_title + "', toTimeStamp(now()), '" + add.description +"', '" + add.location +"', '"+ add.phonenumber + "', '"+ add.category  + "');");
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public static bool AddLatestAdd( Advertisement add)
        {
            try
            {
                ISession session = SessionManager.GetSession();
                if (session == null)
                    return false;

                RowSet entryAdd = session.Execute("INSERT INTO \"LatestAdds\" (username, add_title, added_date, description, location, phonenumber, category) VALUES ('" + add.username + "', '" + add.add_title + "', toTimeStamp(now()), '" + add.description +"', '" + add.location +"', '"+ add.phonenumber + "', '"+ add.category  + "');");
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public static List<Advertisement> GetAllAdvertisements()
        { 
            try
            {
                ISession session = SessionManager.GetSession();
                if (session == null)
                    return null;

                var adds = session.Execute("SELECT * FROM \"LatestAdds\" ;");
                List<Advertisement> addsList = new List<Advertisement>();
                Advertisement newadd = null;

                foreach (var add in adds)
                {
                    newadd =new Advertisement();
                    newadd.added_date = DateTime.Parse(add["added_date"].ToString());
                    newadd.add_title = add["add_title"] == null ? string.Empty : add["add_title"].ToString();
                    newadd.description = add["description"] == null ? string.Empty : add["description"].ToString();
                    newadd.location = add["location"] == null ? string.Empty : add["location"].ToString();
                    newadd.phonenumber = add["phonenumber"] == null ? string.Empty : add["phonenumber"].ToString();
                    newadd.username = add["username"] == null ? string.Empty : add["username"].ToString();
                    newadd.category = add["category"] == null ? string.Empty : add["category"].ToString();
                   
                    addsList.Add(newadd);
                }
                return addsList;
            }
            catch (Exception)
            {
                return null;
            }
        }

        
        public static bool UpdateAdvertisement(Advertisement add, string table, string rest )
        {
            try
            {
                ISession session = SessionManager.GetSession();
                
                
                if (session == null)
                {
                    return false;
                }

                RowSet entry = session.Execute("UPDATE \""+ table +"\" SET description = '"+add.description + "', location = '"+add.location + "', phonenumber = '"+add.phonenumber + "'  WHERE add_title ='"+ add.add_title + "' and "+rest+";");
                
                return true;
            }
            catch (Exception )
            {
                return false;
            }
        }
        public static List<Advertisement> GetAddsFromTitles(string[] data){ 
            try
            {
                string query = "select * from \"LatestAdds\"  where add_title IN (";
                if(data.Length > 1){
                    
                    for(int i = 0; i < data.Length - 1; i++)
                    {
                        query += " '" + data[i] + "' ,";
                    }
                }
                query += "'" + data[data.Length-1] + "' ); ";
               
                ISession session = SessionManager.GetSession();
                if (session == null)
                    return null;

                var adds = session.Execute(query);
                List<Advertisement> addsList = new List<Advertisement>();
                Advertisement newadd = null;

                foreach (var add in adds)
                {
                    newadd =new Advertisement();
                    newadd.added_date = DateTime.Parse(add["added_date"].ToString());
                    newadd.add_title = add["add_title"] == null ? string.Empty : add["add_title"].ToString();
                    newadd.description = add["description"] == null ? string.Empty : add["description"].ToString();
                    newadd.location = add["location"] == null ? string.Empty : add["location"].ToString();
                    newadd.phonenumber = add["phonenumber"] == null ? string.Empty : add["phonenumber"].ToString();
                    newadd.username = add["username"] == null ? string.Empty : add["username"].ToString();
                    newadd.category = add["category"] == null ? string.Empty : add["category"].ToString();
                   
                    addsList.Add(newadd);
                }
                return addsList;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static bool DeleteAdd(string table, string add_title, string rest)
        {
            try
            {
                ISession session = SessionManager.GetSession();

                if (session == null)
                    return false;

                RowSet entry = session.Execute("DELETE FROM \""+table+"\" WHERE add_title = '" + add_title + rest + ";");
  
                return true;
            }
            catch (Exception)
            {
                return false;
            }

        }
        
        #endregion

        #region  RECENZIJE 
        public static List<Review> GetAddReviews(string add_title)
        { 
            try
            {
                ISession session = SessionManager.GetSession();
                if (session == null)
                    return null;

                var reviews = session.Execute("select * from \"Review\" where add_title = '"+ add_title +"';");
                List<Review> rList = new List<Review>();
                Review r = null;

                foreach (var review in reviews)
                {
                    r =new Review();
                    r.r_added_date = DateTime.Parse(review["added_date"].ToString());
                    r.add_title = review["add_title"] == null ? string.Empty : review["add_title"].ToString();
                    r.description = review["description"] == null ? string.Empty : review["description"].ToString();
                    r.username = review["username"] == null ? string.Empty : review["username"].ToString();
                    r.rate = review["rate"] != null ? (int) review["rate"] : 0;
                    rList.Add(r);
                }
                return rList;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static bool AddReview(Review review){
            try
            {
                ISession session = SessionManager.GetSession();
                if (session == null)
                    return false;

                RowSet entryAdd = session.Execute("INSERT INTO \"Review\" (add_title, description, added_date, rate , username) VALUES ( '" + review.add_title +"', '" + review.description +"', toTimeStamp(now()), "+ review.rate + " , '" + review.username + "');");
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public static int GetAddRate(string add_title){
            try
            {
                ISession session = SessionManager.GetSession();
                if (session == null)
                    return -1;

                var rates = session.Execute("SELECT * FROM \"Review\" where add_title = '"+ add_title +"';");
                int rate = 0;
                
                int i = 0;
                foreach (var row in rates)
                {
                    rate = rate + (int) row["rate"] ; i++;
                }
                rate = rate / i;
                return rate;
            }
            catch (Exception)
            {
                return -1;
            }
        }
        #endregion
    }
    
}
