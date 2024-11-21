const perrito = {
    nombre: 'Mechas',
    edad: 2,
    raza: 'Criollo'
}

console.log(perrito);

// //indexar un valor

//Ejemplo

const propiedad = 'edad'

console.log(perrito.nombre);
console.log(perrito[propiedad]);

// //Modificar valores

perrito.nombre = 'Manuel';
console.log(perrito);

// //for in - Enumerables

for (let value in perrito) {
    console.log(value, perrito[value]);
}

// //for of - Iterables

for (let value of Object.values(perrito)) {
    console.log(value);
}

// //Reference vs Value

// let copas = 3;
// let otrasCopas = copas;
// copas = 7;
// console.log(copas, otrasCopas);

const otroPerrito = perrito;
otroPerrito.nombre = 'Firulais';
console.log('Perrito: ', perrito);