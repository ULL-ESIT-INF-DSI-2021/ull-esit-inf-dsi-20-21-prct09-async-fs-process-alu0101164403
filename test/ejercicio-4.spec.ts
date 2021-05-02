import 'mocha';
import {expect} from 'chai';
import * as fs from 'fs';
import {Wraper} from '../src/ejercicio-4/wraper';


describe('Test de la clase wraper', () => {

    let wraper: Wraper = new Wraper();

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
    /*
    it('mover() funciona.', () => {
        expect(wraper).to.be.equal('Soy titulo');
    });*/
});