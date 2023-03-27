class Pokemon {
  constructor(name, health, initial_speed){
    if(isNaN(initial_speed))
      throw new Error('Parameter is not a number!');

    this.name = name;
    this.health = health;
    this.initial_speed = initial_speed;
    this.level = 1;
    this.generation = 1;
  }

  speed(){
    return (this.initial_speed + this.level) / this.generation;
  }

}

exports.Pokemon = Pokemon ;
