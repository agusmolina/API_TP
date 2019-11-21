//Librerias 
const Controlador            = require('../controllers/peliculasController');
const APIconstantes          = require('../Modulos/APIconstantes');



 //Rutas 
module.exports = function(app){
    app.get('/Peliculas',async (req,res) => {
       var movies = await Controlador.Peliculas()
       res.send(movies);
    });
    app.get('/PeliculasGenero/:Genero',async(req,res) => {
      var movies = await Controlador.filtrarGenero(req.params.Genero);
       res.send(movies);
    });
    app.get('/PeliculasNovedad',async(req,res) => {
      var movies = await Controlador.Novedades();
      res.send(movies);
    });
    app.get('/BuscarPelicula/:id',async(req,res)=>{
      var movies = await Controlador.buscarPelicula(req.params.id);
      if(!movies){
        res.send(APIconstantes.PeliculaNoExiste())
      }else{
        res.send(movies);
      }
    });
    app.get('/PeliculasRecomendadas/:id',async(req,res)=>{
      var Recomendaciones = await Controlador.Recomendaciones(req.params.id);
      res.send(Recomendaciones);
    })
    app.get('/GenerosPosibles',async(req,res)=>{
      var generos = await Controlador.Generos();
      res.send(generos)
    })

    app.post('/AnadirPelicula', async(req,res)=>{
        var pelicula = await Controlador.buscarPelicula(parseInt(req.body._id));
        if(pelicula._id != null && typeof pelicula != 'undefined'){
          res.send(APIconstantes.PeliculaYaExiste());
        }else{
           var respuesta = await Controlador.anadirPelicula(req.body);
           res.send(respuesta);
        }
    })
    app.delete('/EliminarPelicula', async(req,res)=>{
         var pelicula  = await Controlador.buscarPelicula(parseInt(req.body._id))
         if(!pelicula)
         {
          res.send(APIconstantes.PeliculaNoExiste())
         }else{
          var respuesta = await Controlador.eliminarPelicula(req.body._id);
          res.send(APIconstantes.PeliculaEliminada(pelicula.Nombre));
         }
    })
    
}