const clc = require('cli-color');
//Constantes de la api
module.exports = {
    PeliculaYaExiste: function() {
        var mensaje = 
        {
            error: true,
            codigo: 503,
            mensaje: 'La Pelicula ya existe en la base de datos'
           }
        return mensaje; 
    },
    MetodoUsado: function(nombre){
        console.log(clc.bold(clc.green("Se ha usado el metodo: "+ nombre)));
    },
    TokenInvalido: function(){
        var mensaje = 
        {
            error: true,
            codigo: 403,
            mensaje: 'El Token es invalido'
           }
        return mensaje; 
    },
    PeliculaInsertada: function(pelicula){
        var mensaje = 
        {
            error: true,
            codigo: 100,
            mensaje: 'la pelicula ha sido guardada exitosamente'
           }
        return mensaje; 
    },
    PeliculaActualizada: function(pelicula){
        var mensaje = 
        {
            error: true,
            codigo: 100,
            mensaje: 'la pelicula ha sido actualizada exitosamente'
           }
        return mensaje; 
    },
    PeliculaAnadida: function(pelicula){
        var mensaje = 
        {
            error: true,
            codigo: 100,
            mensaje: 'la pelicula ha sido añadida a favoritos'
           }
        return mensaje; 
    },
    PeliculaNoExiste: function() {
        var mensaje =  {

            error: true,
            codigo: 503,
            mensaje: 'La Pelicula no existe en la base de datos'
       }
        return mensaje
    },
    PeliculaEliminada: function(NombrePelicula){
        var message = 
        { 
            error: false,
            status: "success",
            message: "La pelicula: "+NombrePelicula+" se ha eliminado satisfactoriamente"
            }
        return message 
    },
    ComentarioInsertado: function(pelicula){
        var mensaje = 
        {
            error: true,
            codigo: 100,
            mensaje: "Comentario insertado exitosamente en la pelicula " + pelicula.Nombre
           }
        return mensaje; 
    },
    AgregadoAFavoritos: function(pelicula, usuario){
        var mensaje = 
        {
            error: true,
            codigo: 100,
            mensaje: "El usuario " + usuario.nombre + " ha agregado la pelicula " + pelicula.Nombre + "a favoritos"
           }
        return mensaje; 
    },
    PuntajeInvalido: function() {
        var mensaje =  {
            error: true,
            codigo: 503,
            mensaje: 'El puntaje debe estar entre 0 y 10'
       }
        return mensaje
    },
    PeliculaPuntuada: function() {
        var mensaje =  {
            error: true,
            codigo: 100,
            mensaje: 'Pelicula puntuada correctamente'
       }
        return mensaje
    },
    UsuarioNoEncontrado: function(){
        var mensaje =  {

            error: true,
            codigo: 404,
            mensaje: 'El usuario no se encuentra resgistrado en la base'
       }
       return mensaje;
    },
    ContrasenaIncorrecta: function(){
        var mensaje =  {
            error: true,
            codigo: 503,
            mensaje: 'La contrasena es incorrecta'
       }
       return mensaje
    },
    ValidacionCorrecta: function(token){
        var mensaje ={
            error:false,
            condigo:200,
            mensaje: 'La validacion ha sido Exitosa ',
            token: token
        }
        return mensaje
    },
}