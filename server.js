// importar librerias 
// Express es el servidor web
const express = require('express');
//sqlite es el motor de base de datos
const sqlite3 = require('sqlite3');
// body-parser permite escuchar peticiones por el metodo post
const bodyParser = require('body-parser');
// sequelize es un ORM para trabajar con las bases de datos
const Sequelize = require('sequelize');
// importar libreria para sobreescribir verbos put, patch y delete
const methodOverride = require('method-override');
// libreria para las sesiones
const session = require('express-session');
// se crea el objeto de la aplicacion
const app = express();

//importar las rutas
const tasksRoutes = require('./routes/tasks_routes');
const registrationsRoutes = require('./routes/registrations_routes');
const sessionsRoutes = require('./routes/sessions_routes');

// importar middlewares
const findUserMiddleware = require('./middlewares/find_user');
const authUser = require('./middlewares/auth_user');

// se manda llamar a body-parser para que nos ayude a leer la peticion post
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'pug');

app.use(session({
    secret: ['ewdfhvdspdkflw1231c', 'jriekncdnvsndb2hv32'],
    saveUninitialized: false,
    resave: false
}))

app.use(findUserMiddleware);
app.use(authUser);

app.use(tasksRoutes);
app.use(registrationsRoutes);
app.use(sessionsRoutes);

app.get('/', function (req, res) {
    res.render('home', { user: req.user });
})

app.listen(3000);


/*

// Cerrar conexion a la base de datos
process.on('SIGINT', function(){
    console.log('Adios - Atte. El servidor');
    db.close();
    process.exit();
});
    Al usuar un ORM no es necesario cerrar la conexion a la base de datos
*/