
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
            codigo: 403,
            mensaje: 'la pelicula ha sido guardada exitosamente'
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