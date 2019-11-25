using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CinemaAPI.Models
{
    public class Usuario
    {   [JsonProperty("nombre")]
        public string nombre { get; set; }
        [JsonProperty("fecha")]
        public string fecha { get; set; }
        [JsonProperty("dni")]
        public Int32 dni { get; set; }
        [JsonProperty("apellido")]
        public string apellido { get; set; }
        [JsonProperty("peliculaFavorita")]
        public string peliculaFavorita { get; set; }
        [JsonProperty("_id")]
        public Int32 _id { get; set; }

    }
}