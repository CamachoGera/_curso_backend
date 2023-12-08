const express = require('express');
let TasksController = require('../controllers/tasks');

let router = express.Router();


// Se definen las rutas mediante los verbos http
router.route('/tasks').get(TasksController.index).post(TasksController.create);

// Se define la ruta al formulario
/* es importante que las rutas se definan en orden logico ya que si pusieramos esta ruta debajo del wildcard, podria accederse a esta generando un problema ya que la ruta presenta una segmentacion dentro de la carpeta tasks, y el wildcard trabajador con los valores, parametros o identificadores que se envian mediante la ruta tasks/identificador */
router.get('/tasks/new',TasksController.new);

router.get('/tasks/:id/edit', TasksController.edit);

router.route('/tasks/:id')
    .get(TasksController.show)
    .put(TasksController.update)
    .delete(TasksController.destroy); // wildcard

// se exportan el objeto router para trabajar con las vistas
module.exports = router;