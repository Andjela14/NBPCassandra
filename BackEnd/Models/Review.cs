using System;
using System.Collections.Generic;
using System.Text;
namespace OglasiSe.Models
{
    public class Review
    {
        public string username { get; set; }
        public string add_title { get; set; }
        public DateTimeOffset r_added_date{ get; set; } //c
        public int rate { get; set;}
        public string description { get; set; }
    }
}
