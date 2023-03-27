const { Pokemon } = require('./pokemon.js');

let pikachu = new Pokemon(1);
let salameche = new Pokemon(2);
let bulbizarre = new Pokemon(3);

console.log(pikachu.speed());
console.log(salameche.speed());
console.log(bulbizarre.speed());