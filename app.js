const argv = require('./config/yargs').argv;
require('colors');
const { crear, listar, actualizar, eliminar } = require('./controlador/tareas')

let comando = argv._[0]; // trae del objeto el comando alias

switch (comando) {
    case 'crear':
        console.log("creando tarea...".bgCyan);
        crear(argv.descripcion)
            //console.log(tarea);
        break;
    case 'listar':
        console.log("Mostrando la lista de tareas...".bgCyan);
        listar();
        break;
    case 'actualizar':
        console.log("Actualizando una tarea...".bgCyan)
        actualizar(argv.descripcion, argv.completado)
        console.log("--------Lista-------".blue);
        listar();
        break;

    case 'eliminar':
        console.log("Eliminado tarea....".bgCyan);
        eliminar(argv.descripcion);
        break;

    default:
        console.log("comando no válido");
}