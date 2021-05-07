const fs = require('fs');
require('colors');

let tareasHacer = [];

const guardarDatos = () => {
    let data = JSON.stringify(tareasHacer);
    fs.writeFile('./data/datos.json', data, (err) => {
        if (err) throw new Error('No se pudo guardar la data', err);
    });
}

const leerDatos = () => {
    try {
        tareasHacer = require('../data/datos.json');
    } catch (error) {
        tareasHacer = []
    }
    return tareasHacer
}

const crear = (descripcion) => {
    leerDatos();
    let index = tareasHacer.findIndex(task => task.descripcion == descripcion);
    if (index >= 0) {
        return console.log(`La Tarea: "${descripcion}" ya existe en la lista`.bgRed);
    } else {
        let tarea = {
            descripcion,
            completado: false
        }
        tareasHacer.push(tarea);
        guardarDatos();
        return console.log(`La Tarea: "${tarea.descripcion}- Estado: ${tarea.completado}" ha sido agregada correctamente`.green);
    }
}

const listar = () => {
    leerDatos();

    i = 1
    for (let tareas of tareasHacer) {
        if (tareas.completado == false) {
            console.log(`Tarea: ${i} Descripcion: ${tareas.descripcion},  Completado: ${tareas.completado}`.bgRed);
        } else {
            console.log(`Tarea: ${i} Descripcion: ${tareas.descripcion},  Completado: ${tareas.completado}`.bgGreen);
        }

        i += 1
    }

}

const actualizar = (descripcion, completado = true) => {
    leerDatos();
    let index = tareasHacer.findIndex(tarea => tarea.descripcion == descripcion);
    if (index >= 0) {
        //completado = (completado == "true");
        if (completado != true) {
            completado = false
        }
        tareasHacer[index].completado = (completado);
        guardarDatos();
        return console.log(`La Tarea: "${descripcion}" ha sido actualizada correctamente`.yellow);
    } else {
        return console.log(`La Tarea: "${descripcion}" no se pudo encontrar dentro de tu lista`.bgMagenta);
    }

}

const eliminar = (descripcion) => {
    leerDatos();
    let index = tareasHacer.findIndex(tarea => tarea.descripcion == descripcion);
    if (index >= 0) {
        tareasHacer.splice(index, 1);
        guardarDatos();
        return console.log(`La Tarea: "${descripcion}" ha sido eliminada correctamente`.bgGreen);
    } else {
        return console.log(`La Tarea: "${descripcion}" no se encuentra en tu lista de tareas`.bgMagenta);
    }

}

module.exports = { crear, listar, actualizar, eliminar }