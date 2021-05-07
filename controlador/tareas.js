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
    let tarea = {
        descripcion,
        completado: false
    }
    tareasHacer.push(tarea);
    guardarDatos();
    return tarea
}

const listar = () => {
    leerDatos();
    // var obj = JSON.parse(valores);
    /* console.log(valores);
    console.log(valores.length); */
    i = 1
    for (let tareas of tareasHacer) {
        if (tareas.completado == false) {
            console.log(`Tarea: ${i} Descripcion: ${tareas.descripcion},  Completado: ${tareas.completado}`.red);
        } else {
            console.log(`Tarea: ${i} Descripcion: ${tareas.descripcion},  Completado: ${tareas.completado}`.green);
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
        return console.log(`La Tarea: "${descripcion}" no se pudo encontrar`.bgMagenta);
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
        return console.log(`La Tarea: "${descripcion}" no se encuentra en la lista`.bgMagenta);
    }

}

module.exports = { crear, listar, actualizar, eliminar }