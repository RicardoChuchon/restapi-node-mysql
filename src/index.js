//// Primero instalar express para crear el servidor y mysql para conectarnos a la base de datos
// npm i express mysql o  npm install express mysql o 
const express =  require('express');
const app = express(); 
////Instalar nodemon que se encarga de reiniciar constantemente el servidro
///npm install --save-dev nodemon 


///setting
app.set('port', process.env.PORT || 4000);


///middlewares son funciones que se ejecutan antes que proceses algo es decir si estas esperando a que el servidor
///reciba algun archivo , pues antes de eso puedes ejecutar una funcion para procesar esos archivos , son funciones antes de 
/// que se ejecuten de las funcionalidades de las rutas
app.use(express.json());

///routes
app.use(require('./routes/employees'));


///starting server

app.get('/', (req, res) => {
    res.json({
        message: "Bienvenido a nodeJs Express"
    })
});

app.listen(app.get('port'), () => {
    console.log('Server on port',  app.get('port'));
});
