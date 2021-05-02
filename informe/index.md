# PRÁCTICA 8. APLICACIÓN DE PROCESAMIENTO DE NOTAS DE TEXTO.

## OBJETIVO

Se espera aprender sobre el uso de API de Node.js usandolos en varios ejercicios.

## PASOS SEGUIDOS



### EJERCICIO 4

Se pide hacer una aplicación que funciones como los comandos de linux, para crear un directorio, borrar ficheros/directorios, mover/copiar ficheros/directorios, listar el contenido de una carpeta y decir si es un fichero o carpeta.

Para ello, usé yargs para crear los comandos de la aplicacion y el módulo fs para el manejo de ficheros y directorios. Para todos los métodos primero comprobé si la ruta dada existe y si no manda un mensaje de error, con fs.existsSync(ruta) que comprueba la existencia de la ruta devolviendo true o false.

```ts
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
```

Este comando (tipo --ruta=ruta) se encarga de comprobar si la ruta dada pertenece a un fichero o directorio. Para ello llama a un metodo de la clase wraper que usa una función del módulo fs lstatSync() usandolo con isDirectory() y isFile(), y devuelve true o un error.

```ts
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
```
El siguiente comando (crearDirectorio --ruta=ruta --nombre=nombre) crea un directorio en la ruta dada con el nombre del parametro. 

```ts
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
```

Para ello llama a un método de la clase wraper que usa una función del módulo fs mkdirSync() que crea un directorios en la ruta dada. En este caso la ruta se la paso como la concatenación de la ruta mas el nombre del directorio nuevo.

```ts 
crearDirectorio(ruta:string, nombre:string) : void {
        if (fs.existsSync(ruta)) {
            // comprueba si el directorio esta vacio o no
            fs.mkdirSync(ruta+nombre);
            return console.log('Se creó el directorio correctamente.');
        } else {
            return console.log(chalk.red('ERROR.La ruta dada no existe.'));
        }
    }
```

El siguiente comando (listarFicheros --ruta=ruta) muestra una lista con el contenido del directorio de la ruta dada. 

```ts
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
```

Para ello llama a un método de la clase wraper que usa una función del módulo fs readdirSync() que lee el contenido de un directorio y los paso a una lista de strings para luego imprimir cada elemento por consola.

```ts
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
```

El siguiente comando (mostrarFicheros --ruta=ruta) muestra el contenido de un fichero dado con su ruta. 

```ts
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
```

Para ello llama a un método de la clase wraper que usa una función del módulo fs readFileSync() que lee el contenido de un fichero y lo muestra.

```ts
mostrarFichero(ruta:string) : void {
    if (fs.existsSync(ruta)) {
        // comprueba si el directorio esta vacio o no
        let contenido = fs.readFileSync(ruta);
        return console.log(contenido);
    } else {
        return console.log(chalk.red('ERROR.La ruta dada no existe.'));
    }
}
```

El siguiente comando (borrar --ruta=ruta) borrar el fichero o directorio dado con su ruta. 

```ts
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
```
Para ello llama a un método de la clase wraper que usa una función del módulo fs rmSync() que borra todo ya sea fichero o directorio (vacio o no).

```ts
borrar(ruta:string) : void {
    if (fs.existsSync(ruta)) {
        // comprueba si el directorio esta vacio o no
        fs.rmSync(ruta);
        return console.log('Se borró correctamente.');
    } else {
    return console.log(chalk.red('ERROR.La ruta dada no existe.'));
    }
}
```

Esta última línea se encarga de analizar los parametros que se pasan para yargs.

```ts
yargs.parse();
```

## TEST

### TEST EJERCICIO-4

```ts
it('comprobarRuta() funciona.', () => {
        expect(wraper.comprobarRuta('../src/ejercicio-4/dirPrueba/fich2.txt')).to.be.a('Es un fichero.');
        expect(wraper.comprobarRuta('../src/ejercicio-4/dirPrueba')).to.be.an('Es un directorio.');
        expect(wraper.comprobarRuta('../src/ejercicio-4/dirPruebass')).to.be.an('ERROR.La ruta dada no existe.');
    });
    it('crearDirectorio() funciona.', () => {
        expect(wraper.crearDirectorio('../src/ejercicio-4/dirPrueba', 'creadoTest')).to.be.a('Se creó el directorio correctamente.');
        expect(fs.existsSync('../src/ejercicio-4/dirPrueba/creadoTest')).to.be.true;
    });
    it('listarFichero() funciona.', () => {
        expect(wraper.listarFicheros('../src/ejercicio-4/dirPrueba')).to.be.equal(['fich2.txt', 'fichPrueba.txt']);
    });
    it('mostrarFochero() funciona.', () => {
        expect(wraper.mostrarFichero('../src/ejercicio-4/dirPrueba/fichPrueba.txt')).to.be.a('hola soy el fichero de prueba');
    });
    it('borrar() funciona.', () => {
        wraper.borrar('../src/ejercicio-4/dirPrueba/fich2.txt');
        expect(fs.existsSync('../src/ejercicio-4/dirPrueba/fich2.txt')).to.be.false;
    });
```

## CONCLUSIÓN

La API de Node.js me parece muy útil y facil de usar, ahorra mucho trabajo. Intenté que funcionase las actions de github y el cubrimiento con coverals y sonar-cloud. Sin embargo creo que coveralls no me está funcionando.

## BIBLIOGRAFÍA
