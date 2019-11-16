const MongoClient  = require('mongodb').MongoClient;
const url          = "mongodb+srv://EleazarTracana:5q7f7EFKpyz1GuqC@cluster0-mvhqd.mongodb.net/test?retryWrites=true&w=majority";

module.exports = {
    conexion: async function Conectar() {   
        client = await MongoClient.connect(url);
        return client;
    },
    movies:   async function Peliculas() {
        var base   =  await this.conexion();
        return base.db('TP2').collection('peliculas');
    },
    usuarios: async function Usuarios(){
        var base   =  await this.conexion();
        return base.db('TP2').collection('usuarios');
    }

    
    
}


