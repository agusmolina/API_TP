using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CinemaAPI.Models
{
    public class TokenParameters
    {
        public Int32 dni { get; set; }
        public Int32 Contrasena { get; set; }
    }
}