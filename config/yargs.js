const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'descripcion de la tarea'
}

const completado = {
    default: true,
    alias: 'c',
    desc: 'Marca como completada o pendiente una tarea',
    typeof: 'boolean'
}


const argv = require('yargs')
    // Establece la descripcion del comando que se tendrá que ejecutar a nivel de linea de consola
    .command('crear', 'crea una nueva tarea', { descripcion })
    .command('listar', 'Lista las tareas registradas')
    .command('actualizar', 'Actualiza la lista de tareas', { descripcion, completado })
    .command('eliminar', 'elimina una tarea de la lista', { descripcion })
    .help()
    .argv;

module.exports = {
    argv
}