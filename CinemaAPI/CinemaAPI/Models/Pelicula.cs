using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CinemaAPI.Models
{
    public class Pelicula
    {
        [JsonProperty("_id")]
        public Int32 _id { get; set; }

        [JsonProperty("Nombre")]
        public String Nombre { get; set; }

        [JsonProperty("Genero")]
        public String Genero { get; set; }

        [JsonProperty("Descripcion")]
        public String Descripcion { get; set; }

        [JsonProperty("Reparto")]
        public String[] Reparto { get; set; }

        [JsonProperty("Fecha")]
        public String Fecha { get; set; }

        [JsonProperty("Puntaje")]
        public String Puntaje { get; set; }

        [JsonProperty("Novedad")]
        public bool Novedad { get; set; }

        [JsonProperty("Imagen")]
        public String Imagen { get; set; }

        [JsonProperty("Duracion")]
        public String Duracion { get; set; }

        [JsonProperty("Trailer")]
        public String Trailer { get; set; }

        public String TrailerEmbed()
        {
            if (Trailer != null) { 
            if (Trailer.Contains("youtube"))
            {
                 return Trailer.Replace("watch?v=", "embed/");
            }
            else
            {
                return "NO DISPONIBLE";
            }
            }
            else
            {
                return "NO DISPONIBLE";
            }
        }
    }
}