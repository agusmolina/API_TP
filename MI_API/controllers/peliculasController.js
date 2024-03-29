var client = require('../base_de_datos/Cliente')

module.exports = {
      Peliculas:  async function  peliculas () {
        var CollectionPeliculas = await client.movies();
        var resultado           = await CollectionPeliculas.find({}).toArray();
        return resultado
},
     filtrarGenero: async function filtrarGenero(Genero) {
        var CollectionPeliculas = await client.movies();
        var resultado           = await CollectionPeliculas.find({ 'Genero': Genero}).toArray()
        return resultado
},
      anadirPelicula: async function anadir(pelicula){
         var CollectionPeliculas = await client.movies();
         var resultado           = await CollectionPeliculas.insertOne(pelicula);
         return resultado;
      },
      anadirComentario: async function anadir(pelicula){
         var CollectionPeliculas = await client.movies();
         var resultado           = await CollectionPeliculas.update(
            { _id: pelicula._id },
            { $push: { Comentarios: {usuario: pelicula.usuario, comentario: pelicula.comentario} } },
        )
         
         return resultado;
      },
      anadirFavoritos: async function anadirFavoritos(pelicula, usuario){
         var CollectionUsuarios = await client.usuarios();
         var resultado           = await CollectionUsuarios.update(
            { _id: usuario._id },
            { $push: { Favoritos: pelicula.Nombre } },
        )
         
         return resultado;
      },
      Generos: async function generos(){
         var CollectionPeliculas = await client.movies();
         var resultado           = await CollectionPeliculas.distinct('Genero')
         return resultado
      },
     Novedades:async function PeliculasNovedosas(){
      var CollectionPeliculas = await client.movies();
      var resultado           = await CollectionPeliculas.find({ 'Novedad': true}).toArray();
      return resultado
     },
     eliminarPelicula: async function eliminarPelicula(id) {
        var CollectionPeliculas = await client.movies();
        var EliminarPelicula    = await CollectionPeliculas.deleteOne({_id: id});
        return EliminarPelicula;
        
  },
     actualizarPelicula: async function actualizarPelicula(pelicula){
      var CollectionPeliculas = await client.movies();
      var resultado           = await CollectionPeliculas.update(
         { _id: pelicula._id },
         { $set: pelicula },
     )
       return resultado;
      },
     buscarPelicula: async function buscarPelicula(id){
        var movies = await client.movies()
        var mipelicula = await movies.findOne({"_id":parseInt(id)});
        return mipelicula;
     },
     Recomendaciones: async function PeliculasRecomendadas(id){
        var usuarios = await client.usuarios();
        var usuario  = await usuarios.findOne({_id: parseInt(id)});

        var peliculas        = await client.movies();
        var peliculaFavorita = await peliculas.findOne({'Nombre': usuario.PeliculaFavorita});
        var Recomendaciones  = await peliculas.find({'Genero': peliculaFavorita.Genero}).toArray();

        return Recomendaciones;
     }
}
