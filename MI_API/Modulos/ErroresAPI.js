
//Errores posibles de la api
module.exports = {
    PeliculaYaExiste: function() {
        return new {
            error: true,
            codigo: 503,
            mensaje: 'La Pelicula ya existe en la base de datos'
           }
    },
    PeliculaNoExiste: function() {
        return new {
             error: true,
             codigo: 503,
             mensaje: 'La Pelicula no existe en la base de datos'
    }
}

}