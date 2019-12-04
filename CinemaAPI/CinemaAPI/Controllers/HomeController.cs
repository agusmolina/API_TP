using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net;
using System.IO;
using Newtonsoft.Json;
using CinemaAPI.Models;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace FrontAPI.Controllers
{
    public class HomeController : Controller
    {
        private const string baseuri = "http://localhost:8000/";
        public ActionResult Index()
        {
            try
            {
                return View(Peliculas());
            }
            catch (ArgumentException e)
            {
                return View("Error", e);
            }
        }

        public Pelicula BuscarPelicula(int Id)
        {
            string BuscarPelicula = baseuri+ "BuscarPelicula" + Id.ToString();
            return GET_PELICULA(BuscarPelicula);
        }
        public int UltimoId()
        {
            return Peliculas().Max(item => item._id);
        }
        public List<Usuario> GETUsuarios()
        {
            try
            {
                var url = baseuri + "Usuarios";
                var webRequest = WebRequest.Create(url) as HttpWebRequest;
                webRequest.ContentType = "application/json";
                webRequest.UserAgent = "Nothing";

                using (var s = webRequest.GetResponse().GetResponseStream())
                {
                    using (var sr = new StreamReader(s))
                    {
                        var UsuariosResponse = sr.ReadToEnd();
                        var usuarios = JsonConvert.DeserializeObject<List<Usuario>>(UsuariosResponse);

                        return usuarios;
                    }
                }
            }
            catch (WebException)
            {
                throw new ArgumentException("La API no esta corriendo...");
            }

        }
        public List<Pelicula> PeliculaNovedad()
        {
            string PeliculasNovedad = baseuri+"PeliculasNovedad";
            return GET(PeliculasNovedad);
        }
        public List<Pelicula> PeliculaGenero(string genero)
        {
            string PeliculasGenero = baseuri + "PeliculasGenero/" + genero;
            return GET(PeliculasGenero);
        }
        public List<Pelicula> Peliculas()
        {
            try
            {
                string Peliculas = baseuri + "Peliculas/";
                return GET(Peliculas);

            }
            catch (ArgumentException e)
            {
                throw e;
            }

        }
        public String[] GetGeneros()
        {
            var url = baseuri+"GenerosPosibles";
            var webRequest = WebRequest.Create(url) as HttpWebRequest;
            webRequest.ContentType = "application/json";
            webRequest.UserAgent = "Nothing";

            using (var s = webRequest.GetResponse().GetResponseStream())
            {
                using (var sr = new StreamReader(s))
                {
                    var GenerosResponse = sr.ReadToEnd();
                    var generos = JsonConvert.DeserializeObject<String[]>(GenerosResponse);

                    return generos;
                }
            }
        }
        public List<Pelicula> GET(string url)
        {
            try
            {
                var webRequest = WebRequest.Create(url) as HttpWebRequest;
                webRequest.ContentType = "application/json";
                webRequest.UserAgent = "Nothing";

                using (var s = webRequest.GetResponse().GetResponseStream())
                {
                    using (var sr = new StreamReader(s))
                    {
                        var peliculasResponse = sr.ReadToEnd();
                        var peliculas = JsonConvert.DeserializeObject<List<Pelicula>>(peliculasResponse);

                        return peliculas;
                    }
                }
            }
            catch (WebException)
            {
                throw new ArgumentException("La API no esta corriendo...");
            }

        }
        public Pelicula GET_PELICULA(string url)
        {
            try
            {
                var webRequest = WebRequest.Create(url) as HttpWebRequest;
                webRequest.ContentType = "application/json";
                webRequest.UserAgent = "Nothing";

                using (var s = webRequest.GetResponse().GetResponseStream())
                {
                    using (var sr = new StreamReader(s))
                    {
                        var peliculasResponse = sr.ReadToEnd();
                        var pelicula = JsonConvert.DeserializeObject<Pelicula>(peliculasResponse);

                        return pelicula;
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

        }
        public HttpClient miClienteSinAutorizacion()
        {
            try
            {
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(baseuri);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

                return client;
            }
            catch (Exception e)
            {
                throw e;
            }

        }
        public HttpClient miClienteAutorizado(string token)
        {
            try
            {
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri("http://localhost:8000/");
                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                return client;
            }catch (Exception e)
            {
                throw e;
            }

        }
        public async Task<TokenResponse> TokenPost(TokenParameters parametros)
        {
            try
            {
                var client = miClienteSinAutorizacion();
                var json = JsonConvert.SerializeObject(parametros);
                var stringContent = new StringContent(json, UnicodeEncoding.UTF8, "application/json");
                HttpResponseMessage response = await client.PostAsync("Login", stringContent);

                var respuesta = JsonConvert.DeserializeObject<TokenResponse>(await response.Content.ReadAsStringAsync());

                return respuesta;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        [HttpPost]
        public async Task<ActionResult> ResultadoToken(TokenParameters parametros)
        {
            try
            {
                TokenResponse TokenGenerado = await TokenPost(parametros);
                return View(TokenGenerado);
            }catch (Exception e)
            {
                return View("Error", e);
            }
        }
        public ActionResult GenerarToken()
        {
            return View();
        }
        [HttpPost]
        public async Task<ActionResult> ResultadoPelicula(Pelicula pelicula, string Token)
        {
            try
            {
                pelicula._id = UltimoId() + 1;
                var client = miClienteAutorizado(Token);
                var json = JsonConvert.SerializeObject(pelicula);
                var stringContent = new StringContent(json, UnicodeEncoding.UTF8, "application/json");
                HttpResponseMessage response = await client.PostAsync("AnadirPelicula", stringContent);
                var respuesta = JsonConvert.DeserializeObject<AnadirPeliculaResponse>(await response.Content.ReadAsStringAsync());

                ViewBag.GenerosPosibles = GetGeneros();

                return View(respuesta);
            }catch (Exception e)
            {
                return View("Error", e);
            }
        }
        public ActionResult AnadirPelicula()
        {
            try
            {
                ViewBag.GenerosPosibles = GetGeneros();
                return View();
            }catch (Exception e)
            {
                return View("Error", e);
            }
        }
        public ActionResult Novedades()
        {
            try
            {
                var peliculas = PeliculaNovedad();
                return View(peliculas);
            }catch (Exception e)
            {
                return View("Error", e);
            }
        }
        public ActionResult Recomendaciones()
        {
            var usuarios = GETUsuarios();
            return View(usuarios);
        }
        public ActionResult DetallePelicula(Int32 id)
        {
            try
            {
                var url      = baseuri + "BuscarPelicula/" + id;
                var Pelicula = GET_PELICULA(url);
                return View(Pelicula);
            }
            catch (Exception e)
            {
                return View("Error", e);
            }
        }
        

    }
}