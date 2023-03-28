const axios = require('axios')

class Pokemon {
  constructor(name, health, initial_speed, atk, type){
    if(isNaN(initial_speed))
      throw new Error('Parameter is not a number!');

    this.name = name;
    this.health = health;
    this.initial_speed = initial_speed;
    this.type = type;
    this.atk = atk;
    this.level = 1;
    this.generation = 1;
  }

  async speed () {
    try {
      const response = await axios.get(
        'https://pokeapi.co/api/v2/pokemon/'+this.name
      )
      //console.log(this.name + " : " + response.data.stats[4].base_stat)
      return response.data.stats[4].base_stat
    } catch (err) {
      console.log(err)
      return (this.initial_speed + this.level) / this.generation; //cas par défault
    }
  }

}

exports.Pokemon = Pokemon ;
