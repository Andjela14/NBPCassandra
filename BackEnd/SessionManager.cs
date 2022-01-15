using Cassandra;
using System;
using System.Collections.Generic;
using System.Text;

namespace OglasiSe
{
        public static class SessionManager
        {
            public static ISession session;

            public static ISession GetSession()
            {
                if (session == null)
                {
                    Cluster cluster = Cluster.Builder().AddContactPoint("127.0.0.1").Build();
                    //Keyspace
                    session = cluster.Connect("oglasavanje");
                }

                return session;
            }
        }
}
