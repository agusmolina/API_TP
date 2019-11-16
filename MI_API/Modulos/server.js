
const bodyParser = require("body-parser");

var express = require('express'),
    app = express(),
    port = 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.listen(port);

console.log('Ha iniciado el servidor de la api en '+port);
require('../api/routes/peliculasRoutes')(app);

