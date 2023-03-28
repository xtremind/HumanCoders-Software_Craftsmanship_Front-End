const { Pokemon } = require('./pokemon.js');

const Type = Object.freeze({
	LIGHTNING: Symbol("lightning"),
	FIRE: Symbol("fire"),
	PLANT: Symbol("plant"),
	WATER: Symbol("water")
})

function battle(pokemons){
  let current = pokemons.at(0).speed() >= pokemons.at(1).speed() ? 0 : 1;
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

function attack(attacker, defender){
  let power = attacker.atk*coeficientpower(attacker.type, defender.type);
  return {
    attacker: {...attacker},
    defender: {...defender, health: Math.max(0, defender.health - power)},
    power: power
  };
}

function coeficientpower(atk_type, def_type){
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

describe('pokemon battle', () => {
  
  let pikachu = new Pokemon("pikachu", 10, 5, 1, Type.LIGHTNING);
  let pikachu2 = {...pikachu, name:"pikachu2", speed: pikachu.speed};
  let bulbizzare = new Pokemon("bulbizzare", 20, 4, 2, Type.PLANT);
  let salameche = new Pokemon("salameche", 5, 3, 2, Type.FIRE);

  it.each([
    { attacker: pikachu,    defender: salameche,  health: 4, power: 1},
    { attacker: pikachu,    defender: pikachu,    health: 9, power: 1},
    { attacker: pikachu,    defender: bulbizzare, health: 19, power: 1},
    { attacker: salameche,  defender: bulbizzare, health: 16, power: 4},
    { attacker: bulbizzare, defender: salameche,  health: 4, power: 1},
    { attacker: salameche, defender: salameche,  health: 3, power: 2},
  ])('should change $health of defender given an attack from $attacker.name to $defender.name with a power of $power', ({ attacker, defender, health, power }) => {
    expect(attack({...attacker}, {...defender})).toEqual(expect.objectContaining({defender: {...defender, health: health}, power: power}));
  });

  it.each([
    { attacker: pikachu, defender: salameche, firstAttacker: pikachu },
    { attacker: pikachu, defender: bulbizzare, firstAttacker: pikachu },
    { attacker: bulbizzare, defender: pikachu, firstAttacker: pikachu },
    { attacker: pikachu, defender: pikachu2, firstAttacker: pikachu },
  ])('should declare $firstAttacker.name first attacker given a fight between $attacker.name and $defender.name', ({ attacker, defender, firstAttacker }) => {
    let currentBattle = battle([{...attacker, speed: attacker.speed}, {...defender, speed: defender.speed}]);
    expect(currentBattle.logs.at(0).attacker.name).toBe(firstAttacker.name);
  });

  it.each([
    { attacker: pikachu, defender: salameche, loser: salameche },
    { attacker: pikachu, defender: bulbizzare, loser: pikachu },
    { attacker: bulbizzare, defender: pikachu, loser: pikachu },
    { attacker: pikachu, defender: pikachu2, loser: pikachu2 },
  ])('should declare $loser.name loser with 0 health given a fight between $attacker.name and $defender.name', ({ attacker, defender, loser }) => {
    expect(battle([{...attacker, speed: attacker.speed}, {...defender, speed: defender.speed}]).loser).toEqual(expect.objectContaining({...loser, health: 0 }));
  })

  it.each([
    { attacker: pikachu, defender: salameche, winner: pikachu, health: 2},
    { attacker: pikachu, defender: bulbizzare, winner: bulbizzare, health: 15},
    { attacker: bulbizzare, defender: pikachu, winner: bulbizzare, health: 15},
    { attacker: pikachu, defender: pikachu2, winner: pikachu, health: 1},
  ])('should declare $winner.name winner with $health health given a fight between $attacker.name and $defender.name', ({ attacker, defender, winner, health }) => {
    let currentBattle = battle([{...attacker, speed: attacker.speed}, {...defender, speed: defender.speed}]);
    expect(currentBattle.winner).toEqual(expect.objectContaining({...winner, health: health }));
  });

});