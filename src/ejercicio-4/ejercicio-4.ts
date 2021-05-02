import * as yargs from 'yargs';
import {Wraper} from './wraper'

// handler es quien lee lo que se escribe por la consola
let wraper: Wraper = new Wraper();

yargs.command({
    command: 'tipo',
    describe: 'Comprueba si la ruta dada es de un fichero o directorio',
    builder: {
        ruta: {
            describe: 'Ruta a comprobar.',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        // si no hago esta comprobacion da un error de argumento desconocido, **no entiendo el motivo**
        if (argv.ruta === 'string')
            wraper.comprobarRuta(argv.ruta);
    },
}),


yargs.command({
    command: 'crearDirectorio',
    describe: 'Crea un directorio en la ruta que se le pasa.',
    builder: {
        ruta: {
            describe: 'Ruta donde crear el directorio',
            demandOption: true,
            type: 'string',
        },
        nombre: {
            describe: 'Nombre del directorio',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (argv.ruta === 'string' && argv.nombre === 'string')
            wraper.crearDirectorio(argv.ruta, argv.nombre);
    },
});


yargs.command({
    command: 'listarFicheros',
    describe: 'Se lista los ficheros que hay en la ruta dada',
    builder: {
        ruta: {
            describe: 'Ruta donde se quiere listar los ficheros',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (argv.ruta === 'string')
            wraper.listarFicheros(argv.ruta);
    },
});


yargs.command({
    command: 'mostrarFichero',
    describe: 'Se muestra el contenido de un fichero',
    builder: {
        ruta: {
            describe: 'Ruta del fichero que se quiere ver.',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (argv.ruta === 'string')
            wraper.mostrarFichero(argv.ruta);
    },
});


yargs.command({
    command: 'borrar',
    describe: 'Borra un fichero o directorio',
    builder: {
        ruta: {
            describe: 'Ruta del fichero/directorio que se quiere borrar',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        // si no hago esta comprobacion da un error de argumento desconocido, **no entiendo el motivo**
        if (argv.ruta === 'string')
           wraper.borrar(argv.ruta);
    },
});

/*
yargs.command({
    command: 'mover',
    describe: 'Mueve el fichero/directorio a la nueva ruta',
    builder: {
        rutaOrigen: {
            describe: 'Ruta donde esta el fichero/directorio',
            demandOption: true,
            type: 'string',
        },
        rutaDestino: {
            describe: 'Ruta donde semovera el fichero/directorio',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        // si no hago esta comprobacion da un error de argumento desconocido, **no entiendo el motivo**
        if (argv.rutaOrigen === 'string', argv.rutaDestino === 'string')
            wraper.mover(argv.rutaOrigen, argv.rutaDestino);
    },
});*/


// analiza los datos introducidos en la consola
yargs.parse();