//Librerias 
const ControladorPeliculas   = require('../controllers/peliculasController');
const ControladorUsuarios    = require('../controllers/UsuarioController');
const APIconstantes          = require('../Modulos/APIconstantes');
const Autenticar             = require('../base_de_datos/Autenticar');

 //Rutas 
module.exports = function(app){
    app.get('/Peliculas',async (req,res) => {
       var movies = await ControladorPeliculas.Peliculas()
       res.send(movies);
    });
    app.get('/PeliculasGenero/:Genero',async(req,res) => {
      var movies = await ControladorPeliculas.filtrarGenero(req.params.Genero);
       res.send(movies);
    });
    app.get('/PeliculasNovedad',async(req,res) => {
      var movies = await ControladorPeliculas.Novedades();
      res.send(movies);
    });
    app.get('/BuscarPelicula/:id',async(req,res)=>{
      var movies = await ControladorPeliculas.buscarPelicula(req.params.id);
      if(!movies){
        res.send(APIconstantes.PeliculaNoExiste())
      }else{
        res.send(movies);
      }
    })
    app.get('/PeliculasRecomendadas/:id',async(req,res)=>{
      var Recomendaciones = await ControladorPeliculas.Recomendaciones(req.params.id);
      res.send(Recomendaciones);
    })
    app.get('/GenerosPosibles',async(req,res)=>{
      var generos = await ControladorPeliculas.Generos();
      res.send(generos)
    })

    app.post('/AnadirPelicula', async(req,res)=>{
      try{
        await Autenticar.ComprobarToken(req,res)
        var pelicula = await ControladorPeliculas.buscarPelicula(req.body._id);
        if(typeof pelicula != 'undefined' && pelicula != null){
          res.send(APIconstantes.PeliculaYaExiste());
        }else{
           var respuesta = await ControladorPeliculas.anadirPelicula(req.body);
           res.send(respuesta);
        }
      }catch (e){
        res.send(e.message);
      }
    })
    app.post('/Login', async (req,res)=>{
      var resultado = await Autenticar.ValidarUsuario(parseInt(req.body.dni), parseInt(req.body.Contrasena));
      res.send(resultado);
    })
    app.delete('/EliminarPelicula', async(req,res)=>{
         var pelicula  = await ControladorPeliculas.buscarPelicula(parseInt(req.body._id))
         if(!pelicula)
         {
          res.send(APIconstantes.PeliculaNoExiste())
         }else{
          var respuesta = await ControladorPeliculas.eliminarPelicula(req.body._id);
          res.send(APIconstantes.PeliculaEliminada(pelicula.Nombre));
         }
    })
    app.get('/Usuarios', async(req,res)=>{
         var usuarios = await ControladorUsuarios.Usuarios();
         res.send(usuarios)
    });
    app.get('/BuscarUsuario/:id', async(req,res)=>{
         var usuario  = await ControladorUsuarios.BuscarUsuario(req.params.id);
         res.send(usuario);
    })
    
}