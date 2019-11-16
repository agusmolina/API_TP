var client = require('../base_de_datos/Cliente')
const NoEncontrado = "No se ha encontrado ninguna pelicula con id: ";

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
     Novedades:async function PeliculasNovedosas(){
      var CollectionPeliculas = await client.movies();
      var resultado           = await CollectionPeliculas.find({ 'Novedad': true}).toArray();
      return resultado
     },
     eliminarPelicula: async function eliminarPelicula(id) {
        var CollectionPeliculas = await client.movies(),
        pelicula                = await this.buscarPelicula(id),
        resultado; 

        console.log(pelicula)

        if(typeof pelicula[0]._id === 'undefined' || pelicula[0] == null){
            resultado = NoEncontrado + id.toString();
        }else{
            await CollectionPeliculas.deleteOne({_id: id});
            resultado = "La pelicula: "+pelicula[0].Nombre+" se ha eliminado satisfactoriamente"
        }
        return resultado;
        
  },
     actualizarPelicula: async function actualizarPelicula(id, actualizacion){
        var CollectionPeliculas = await client.movies(),
        query = {_id: id},
        nuevos_valores = {$set:actualizacion},
        pelicula  = await this.buscarPelicula(id);

        if(typeof pelicula === 'undefined' || pelicula == null){
         resultado = NoEncontrado + id.toString();
       }else{
         await CollectionPeliculas.updateOne(query,nuevos_valores);
         resultado = "La pelicula: "+pelicula.Nombre+" se ha actualizado satisfactoriamente"
       }
       return resultado;
},
     buscarPelicula: async function buscarPelicula(id){
        var movies = await client.movies()
        var mipelicula = await movies.find({"_id":id}).toArray();
        return mipelicula;
     },
     Recomendaciones: async function PeliculasRecomendadas(id){
        var usuarios = await client.usuarios();
        var usuario  = await usuarios.findOne({},{_id: id});

        var peliculas        = await client.movies();
        var peliculaFavorita = await peliculas.find({'Nombre': usuario.PeliculaFavorita}).toArray();
        var Recomendaciones  = await peliculas.find({'Genero': peliculaFavorita[0].Genero}).
        toArray().filter(item =>{
          return item.Nombre !=  usuario.PeliculaFavorita
        });

        return Recomendaciones;
     }
}
