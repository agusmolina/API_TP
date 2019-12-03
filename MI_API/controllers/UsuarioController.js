var client = require('../base_de_datos/Cliente')

module.exports = {
    BuscarUsuario: async function buscarUsuario(id){
        var CollectionUsuarios = await client.usuarios();
        var usuario            = await CollectionUsuarios.findOne({"_id":parseInt(id)});
        return  usuario;
    },
    Usuarios: async function Usuarios(){
        var CollectionUsuarios = client.usuarios();
        var usuarios           = CollectionUsuarios.find({}).toArray();
        return usuarios;
    },
    AnadirUsuario: async function Anadir(usuario){
        var CollectionUsuarios = client.usuarios();
        var resultado          = CollectionUsuarios.insertOne(usuario);
        return resultado;
    }
}