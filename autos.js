// Importamos el módulo fs para trabajar con archivos
const fs = require('fs');
 
// Obtenemos los argumentos pasados por línea de comandos, a partir del segundo (saltándonos 'node' y el nombre del archivo)
const args = process.argv.slice(2);
 
// Definimos el nombre del archivo JSON donde almacenaremos los datos
const fileName = 'autos.json';
 
// Función para leer el archivo JSON y devolverlo como un objeto JavaScript
function leerArchivoJSON() {
    try {
        // Leemos el contenido del archivo en modo texto (utf8) y lo parseamos como JSON
        const data = fs.readFileSync(fileName, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        // Si ocurre un error al leer el archivo, mostramos un mensaje de error y retornamos un objeto vacío
        console.error('Error al leer el archivo:', err);
        return {}; // Retornamos un objeto vacío para evitar errores posteriores
    }
}
 
// Función para escribir el objeto JSON modificado en el archivo
function escribirArchivoJSON(data) {
    try {
        // Escribimos el objeto JSON en el archivo, con formato bonito (indentado 2 espacios)
        fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
        console.log('Archivo actualizado correctamente.');
    } catch (err) {
        // Si ocurre un error al escribir el archivo, mostramos un mensaje de error
        console.error('Error al escribir el archivo:', err);
    }
}
 
// Función principal para manejar las diferentes opciones
function main() {
    const auto = args[0]; // Obtenemos el nombre del auto a modificar
    const propiedad = args[1]; // Obtenemos la propiedad a modificar
    const valor = args[2]; // Obtenemos el nuevo valor para la propiedad
 
    const autos = leerArchivoJSON(); // Leemos el archivo JSON y lo almacenamos en la variable 'autos'
 
    if (auto === 'leer') {
        // Si el primer argumento es 'leer', se desea leer datos
        if (propiedad) {
            // Si se proporcionó una propiedad, se muestran las características de un auto en particular
            console.log(autos[propiedad]);
        } else {
            // Si no se proporcionó una propiedad, se muestra todo el contenido del archivo
            console.log(autos);
        }
    } else {
        // Si el primer argumento no es 'leer', se desea modificar un auto
        if (auto !== 'leer' && auto in autos && propiedad && valor) {
            // Si el auto y la propiedad existen, se modifica el valor de la propiedad
            autos[auto][propiedad] = valor;
            escribirArchivoJSON(autos);
        } else {
            // Si los argumentos no son válidos, se muestra un mensaje de error con un ejemplo de uso correcto
            console.error('Uso incorrecto. Ejemplo: node autos.js ferrari puertas 3');
        }
    }
}
 
main(); // Llamamos a la función principal para ejecutar el programa
//tiene menú contextual