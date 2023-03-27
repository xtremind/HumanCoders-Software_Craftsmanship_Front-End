class Pokemon {
  constructor(initial_speed){
    this.initial_speed = initial_speed;
    this.level = 1;
    this.generation = 1
  }

  speed(){
    return this.initial_speed + this.level / this.generation;
  }

}

let pikachu = new Pokemon(1);
let salameche = new Pokemon(2);
let bulbizarre = new Pokemon(3);

console.log(pikachu.speed());
console.log(salameche.speed());
console.log(bulbizarre.speed());