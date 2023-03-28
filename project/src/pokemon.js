import axios from 'axios'

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

const Type = Object.freeze({
	LIGHTNING: Symbol("lightning"),
	FIRE: Symbol("fire"),
	PLANT: Symbol("plant"),
	WATER: Symbol("water")
})

async function battle(pokemons){
  let current = await isFirstToAttack(pokemons.at(0), pokemons.at(1));
  //console.log("current " + current)
  let logs = [];

  let atk = pokemons.at(current);
  let def = pokemons.at((current+1)%2);
  let currentAttack;

  while(atk.health > 0){
    currentAttack = attack(atk, def);
    logs.push(currentAttack)
    
    atk = currentAttack.defender;
    def = currentAttack.attacker;
  }
  
  return {
    winner: def,
    loser: atk,
    logs: logs
  }
}

async function isFirstToAttack(atk, def){
  return await atk.speed() >= await def.speed() ? 0 : 1;
}

function attack(attacker, defender){
  let power = attacker.atk*coefficientpower(attacker.type, defender.type);
  return {
    attacker: {...attacker},
    defender: {...defender, health: Math.max(0, defender.health - power)},
    power: power
  };
}

function coefficientpower(atk_type, def_type){
  if (isEffective(atk_type, def_type)) {
    return 2;
  }
  if (isIneffective(atk_type, def_type)) {
    return 0.5;
  }
  return 1;
}

function isEffective(atk_type, def_type){
  return  (atk_type === Type.FIRE && def_type === Type.PLANT) || 
          (atk_type === Type.PLANT && def_type === Type.WATER) ||
          (atk_type === Type.WATER && def_type === Type.FIRE) ||
          (atk_type === Type.LIGHTNING && def_type === Type.WATER)
}

function isIneffective(atk_type, def_type){
  return  (atk_type === Type.PLANT && def_type === Type.FIRE) || 
          (atk_type === Type.WATER && def_type === Type.PLANT) ||
          (atk_type === Type.FIRE && def_type === Type.WATER) ||
          (atk_type === Type.WATER && def_type === Type.LIGHTNING)
}

export {Pokemon, battle, Type};
