using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CinemaAPI.Models
{
    public class TokenResponse
    {
        [JsonProperty("error")]
        public bool error { get; set; }

        [JsonProperty("codigo")]
        public Int32 codigo { get; set; }

        [JsonProperty("mensaje")]
        public String mensaje { get; set; }

        [JsonProperty("Token")]
        public String Token { get; set; }
    }
}