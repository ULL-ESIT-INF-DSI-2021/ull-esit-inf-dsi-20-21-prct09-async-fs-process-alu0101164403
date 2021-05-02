import * as fs from 'fs';
import * as chalk from 'chalk';

export class Wraper {
    constructor(){}

    comprobarRuta(ruta:string) {
        //comprueba si existe la ruta
        if (fs.existsSync(ruta)) {
            if (fs.lstatSync(ruta).isDirectory()) {
                return console.log('Es un directorio.')
            } else {
                if (fs.lstatSync(ruta).isFile()) {
                    return console.log('Es un fichero.')
                }
            }
        } else {
            return console.log(chalk.red('ERROR.La ruta dada no existe.'));
        }
    }


    crearDirectorio(ruta:string, nombre:string) : void {
        if (fs.existsSync(ruta)) {
            // comprueba si el directorio esta vacio o no
            fs.mkdirSync(ruta+nombre);
            return console.log('Se creó el directorio correctamente.');
        } else {
            return console.log(chalk.red('ERROR.La ruta dada no existe.'));
        }
    }


    listarFicheros(ruta:string) : void {
        let contenidoDirectorio : string[] = [];
        contenidoDirectorio = fs.readdirSync(ruta); 
        if (fs.existsSync(ruta)) {
            // comprueba si el directorio esta vacio o no
            if (contenidoDirectorio.length > 0) {
                console.log('Los ficheros en la ruta ${ruta} son: ');
                contenidoDirectorio.forEach(element => {
                    console.log(element);
                });
            } else {
                return console.log(chalk.red('El directorio está vacío.'));
            }
        } else {
            return console.log(chalk.red('ERROR.La ruta dada no existe.'));
        }
    }

    mostrarFichero(ruta:string) : void {
        if (fs.existsSync(ruta)) {
            // comprueba si el directorio esta vacio o no
            fs.readFileSync(ruta);
        } else {
            return console.log(chalk.red('ERROR.La ruta dada no existe.'));
        }
    }

    borrar(ruta:string) : void {
        if (fs.existsSync(ruta)) {
            // comprueba si el directorio esta vacio o no
            fs.rmSync(ruta);
            return console.log('Se borró correctamente.');
        } else {
            return console.log(chalk.red('ERROR.La ruta dada no existe.'));
        }
    }

/*
    mover(rutaOrigen:string, rutaDestino:string) : void {

    }*/
}