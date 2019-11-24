const client        = require('../base_de_datos/Cliente');
const APIConstantes = require('../Modulos/APIconstantes');
const jwt           = require('jsonwebtoken');
const config        = require('../config');

module.exports = {
    CrearToken: function Crear(midni,contrasena){
        var secure = this.Random(0,999999);
        var token  = jwt.sign({dni: midni, Contrasena: contrasena, Seguridad:secure},config.secret,
                     { expiresIn: '72h' 
                     })
        return token;
    },
    ValidarUsuario: async function validar(dni,contrasena){
        var CollectionUsuarios = await client.usuarios();
        var usuario            = await CollectionUsuarios.findOne({"dni": dni});
        var resultado          = '';

        if(typeof usuario !== 'undefined' && usuario != null){
            if(usuario.Contrasena == contrasena){
            resultado = APIConstantes.ValidacionCorrecta(this.CrearToken(dni,contrasena));
            }else{
            resultado = APIConstantes.ContrasenaIncorrecta();
            }
        }else{
            resultado = APIConstantes.UsuarioNoEncontrado();
        }
        return resultado;
    },
    ComprobarToken:  async (req) => {
      try{
      var token = req.headers['token-acceso'] || req.headers['authorization'];
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
      }
      if (token) {
       resultado = await jwt.verify(token, config.secret)
       return resultado;
      }
    }catch (e){
      throw e;
    }
    },
    Random: function random(low, high) {
        return Math.random() * (high - low) + low
      }
}