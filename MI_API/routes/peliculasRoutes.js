//Librerias 
const Controlador            = require('../controllers/peliculasController');


 const RespuestaInvalidad_Pelicula = {
  error: true,
  codigo: 503,
  mensaje: 'La Pelicula ya existe en la base de datos'
 }
 const Pelicula_No_Existe = {
   error:true,
   codigo:404,
   mensaje:'La pelicula que intenta eliminar no existe'
 }

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
      res.send(movies);
    });
    app.get('/PeliculasRecomendadas/:id',async(req,res)=>{
      var Recomendaciones = await Controlador.Recomendaciones(req.params.id);
      res.send(Recomendaciones);
    })
    app.post('/AnadirPelicula', async(req,res)=>{

        var pelicula = await Controlador.buscarPelicula(req.body._id);
        if(pelicula[0]._id != null && typeof pelicula[0] != 'undefined'){
          res.send(RespuestaInvalidad_Pelicula);
        }else{
           var respuesta = await Controlador.anadirPelicula(req.body);
           res.send(respuesta);
        }
    })
    app.delete('/EliminarPelicula', async(req,res)=>{
           var respuesta = await Controlador.eliminarPelicula(req.body._id); 
           res.send({message: respuesta});
    })
    
}