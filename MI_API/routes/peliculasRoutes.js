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
       APIconstantes.MetodoUsado("Peliculas")
    });
    app.get('/PeliculasGenero/:Genero',async(req,res) => {
      var movies = await ControladorPeliculas.filtrarGenero(req.params.Genero);
       res.send(movies);
       APIconstantes.MetodoUsado("PeliculasGenero")
    });
    app.get('/PeliculasNovedad',async(req,res) => {
      var movies = await ControladorPeliculas.Novedades();
      res.send(movies);
      APIconstantes.MetodoUsado("PeliculasNovedad")
    });
    app.get('/BuscarPelicula/:id',async(req,res)=>{
      var movies = await ControladorPeliculas.buscarPelicula(req.params.id);
      if(!movies){
        res.send(APIconstantes.PeliculaNoExiste())
      }else{
        res.send(movies);
      }
      APIconstantes.MetodoUsado("BuscarPelicula")
    })
    app.get('/PeliculasRecomendadas/:id',async(req,res)=>{
      console.log(req.params.id)
      var Recomendaciones = await ControladorPeliculas.Recomendaciones(req.params.id);
      res.send(Recomendaciones);
      APIconstantes.MetodoUsado("PeliculasRecomendadas")
    })
    app.get('/GenerosPosibles',async(req,res)=>{
      var generos = await ControladorPeliculas.Generos();
      res.send(generos)
      APIconstantes.MetodoUsado("GenerosPosibles")
    })

    ////////////////////////////////
    ///Recibe _id, <cualquier parametro perteneciente al objeto>
    ////////////////////////////////
    app.post('/ActualizarPelicula', async(req,res)=>{
      try{
        await Autenticar.ComprobarToken(req,res)
        var pelicula = await ControladorPeliculas.buscarPelicula(req.body._id);
        if(typeof pelicula == 'undefined' || pelicula == null){
          res.send(APIconstantes.PeliculaNoExiste());
        }else{
           var respuesta = await ControladorPeliculas.actualizarPelicula(req.body);
           res.send(APIconstantes.PeliculaActualizada(pelicula));
        }
      }catch (e){
        res.send(APIconstantes.TokenInvalido());
      }
    })
    app.post('/AnadirPelicula', async(req,res)=>{
      try{
        await Autenticar.ComprobarToken(req,res)
        var pelicula = await ControladorPeliculas.buscarPelicula(req.body._id);
        if(typeof pelicula !== 'undefined' && pelicula != null){
          res.send(APIconstantes.PeliculaYaExiste());
        }else{
           var respuesta = await ControladorPeliculas.anadirPelicula(req.body);
           res.send(APIconstantes.PeliculaInsertada());
        }
      }catch (e){
        res.send(APIconstantes.TokenInvalido());
      }
    })
    app.post('/Login', async (req,res)=>{
      var resultado = await Autenticar.ValidarUsuario(parseInt(req.body.dni), parseInt(req.body.Contrasena));
      res.send(resultado);
    })
    app.delete('/EliminarPelicula', async(req,res)=>{
      try{
        await Autenticar.ComprobarToken(req,res)
        var pelicula  = await ControladorPeliculas.buscarPelicula(parseInt(req.body._id))
        if(!pelicula)
        {
          res.send(APIconstantes.PeliculaNoExiste())
        }else{
          var respuesta = await ControladorPeliculas.eliminarPelicula(req.body._id);
          res.send(APIconstantes.PeliculaEliminada(pelicula.Nombre));
        }
      }catch (e){
        res.send(APIconstantes.TokenInvalido());
      }
    })
    app.get('/Usuarios', async(req,res)=>{
         var usuarios = await ControladorUsuarios.Usuarios();
         res.send(usuarios)
         APIconstantes.MetodoUsado("Usuarios")
    });
    app.get('/BuscarUsuario/:id', async(req,res)=>{
         var usuario  = await ControladorUsuarios.BuscarUsuario(req.params.id);
         res.send(usuario);
         APIconstantes.MetodoUsado("BuscarUsuario")
    })

    ////////////////////////////////
    ///Recibe _id, usuario, comentario
    ////////////////////////////////
    app.post('/AnadirComentario', async(req,res)=>{
      try{
        await Autenticar.ComprobarToken(req,res)
        var pelicula = await ControladorPeliculas.buscarPelicula(req.body._id);
        if(typeof pelicula == 'undefined' || pelicula == null){
          res.send(APIconstantes.PeliculaNoExiste());
        }else{
          
           var respuesta = await ControladorPeliculas.anadirComentario(req.body);
           res.send(APIconstantes.ComentarioInsertado(pelicula));
        }
      }catch (e){
        res.send(APIconstantes.TokenInvalido());
      }
    })
    
    ////////////////////////////////
    ///Recibe _id_pelicula, _id_usuario
    ////////////////////////////////
    app.post('/AnadirFavoritos', async(req,res)=>{
      try{
        await Autenticar.ComprobarToken(req,res)
        var pelicula = await ControladorPeliculas.buscarPelicula(req.body._id_pelicula);
        var usuario = await ControladorUsuarios.BuscarUsuario(req.body._id_usuario);
        
         
        var respuesta = await ControladorPeliculas.anadirFavoritos(pelicula, usuario);
        res.send(APIconstantes.AgregadoAFavoritos(pelicula, usuario));
     
      }catch (e){
        res.send(APIconstantes.TokenInvalido());
      }
    })

    ////////////////////////////////
    ///Recibe _id, Puntaje
    ////////////////////////////////
    app.post('/PuntuarPelicula', async(req,res)=>{
      try{
        await Autenticar.ComprobarToken(req,res)
        var pelicula = await ControladorPeliculas.buscarPelicula(req.body._id);
        if(typeof pelicula == 'undefined' || pelicula == null){
          res.send(APIconstantes.PeliculaNoExiste());
        }else{
           var respuesta = await ControladorPeliculas.actualizarPelicula(req.body);
           res.send(APIconstantes.PeliculaPuntuada(pelicula));
        }
      }catch (e){
        res.send(APIconstantes.TokenInvalido());
      }
    })
    
}