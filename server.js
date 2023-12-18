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

const socketio = require('socket.io');

//importar las rutas
const tasksRoutes = require('./routes/tasks_routes');
const registrationsRoutes = require('./routes/registrations_routes');
const sessionsRoutes = require('./routes/sessions_routes');
const categoriesRoutes = require('./routes/categories_routes');


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
app.use(categoriesRoutes);

app.get('/', function (req, res) {
    res.render('home', { user: req.user });
})

let server = app.listen(3000);
let io = socketio(server);
let sockets = {};

let usersCount = 0;

io.on('connection', function (socket) {
    let userId = socket.request._query.loggeduser;
    if (userId) sockets[userId] = socket;
    console.log(sockets);

    usersCount++;
    io.emit('count_updated', { count: usersCount });

    socket.on('new_task', function (data) {
        if (data.userId) {
            let userSocket = sockets[data.userId];
            if (!userSocket) return;
            userSocket.emit('new_task', data);
        }
    })

    socket.on('disconnect', function () {
        Object.keys(sockets).forEach(userId => {
            let s = sockets[userId];
            if (s.id == socket.id) sockets[userId] = null;
        });

        console.log(sockets);

        usersCount--;
        io.emit('count_updated', { count: usersCount });
    })
})
