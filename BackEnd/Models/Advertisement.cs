using System;
using System.Collections.Generic;
using System.Text;
namespace OglasiSe
{
    public class Advertisement
    {
        public string username { get; set; } // c
        public string add_title  { get; set; }  //k
        public DateTime added_date{ get; set; } //c
        public string description { get; set; }
        public string location { get; set; }
        public string phonenumber { get; set; }
        public string category {get; set;}
        public int rate {get; set;}
    }
}