
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
    }
}