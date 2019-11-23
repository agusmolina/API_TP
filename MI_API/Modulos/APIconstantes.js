
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
    UsuarioNoEncontrado: function(Usuario){
        var mensaje =  {

            error: true,
            codigo: 404,
            mensaje: 'El usuario: '+Usuario+ ' No se encuentra resgistrado en la base'
       }
       return mensaje;
    },
    ContrasenaIncorrecta: function(){
        var mensaje =  {

            error: true,
            codigo: 503,
            mensaje: 'La contrasena es incorrecta'
       }
    },
    ValidacionCorrecta: function(token){
        var mensaje ={
            error:false,
            condigo:200,
            mensaje: 'La validacion ha sido Exitosa ',
            token: token
        }
        return mensaj
    },
}