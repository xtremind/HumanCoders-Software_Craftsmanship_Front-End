const { Pokemon } = require('./pokemon.js');


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
  let power = attacker.atk;
  return {
    attacker: {...attacker},
    defender: {...defender, health: Math.max(0, defender.health - power)},
    power: power
  };
}

describe('pokemon battle', () => {

  let pikachu = new Pokemon("pikachu", 10, 5);
  let pikachu2 = {...pikachu, name:"pikachu2", speed: pikachu.speed};
  let bulbizzare = new Pokemon("bulbizzare", 20, 4);
  let salameche = new Pokemon("salameche", 5, 3);

  it.each([
    { attacker: pikachu, defender: salameche, winner: pikachu },
    { attacker: pikachu, defender: bulbizzare, winner: bulbizzare },
    { attacker: pikachu, defender: pikachu2, winner: pikachu },
  ])('should declare $winner.name is winner given a fight between $attacker.name and $defender.name', ({ attacker, defender, winner }) => {
    let currentBattle = battle([{...attacker, speed: attacker.speed}, {...defender, speed: defender.speed}]);
    expect(currentBattle.winner.name).toEqual(winner.name);
  });

  it.each([
    { attacker: pikachu, defender: salameche, firstAttacker: pikachu },
    { attacker: pikachu, defender: bulbizzare, firstAttacker: pikachu },
    { attacker: pikachu, defender: pikachu2, firstAttacker: pikachu },
  ])('should declare $firstAttacker.name first attacker given a fight between $attacker.name and $defender.name', ({ attacker, defender, firstAttacker }) => {
    let currentBattle = battle([{...attacker, speed: attacker.speed}, {...defender, speed: defender.speed}]);
    expect(currentBattle.logs.at(0).attacker.name).toBe(firstAttacker.name);
  });

  it.todo('should show 0 health for loser given a fight between pokemons')
  it.todo('should show 9 health for winner given a fight between pokemons')
  it.todo('should show positive attack given a fight between pokemons')
  it.todo('should show reduced health for slower pokemon given a fight between pokemons')

  /*it.each([
    { attacker: { name: "pikachu", speed: 2 }, defender: { name: "salameche", speed: 1 }, firstAttacker: "pikachu" },
    { attacker: { name: "pikachu", speed: 2 }, defender: { name: "bulbizzare", speed: 1 }, firstAttacker: "pikachu" },
  ])('when $attacker.name attack $defender.name then $winnerName attack first', ({ attacker, defender, firstAttacker }) => {
    expect(battle(attacker, defender).log.at(0)).toBe(firstAttacker);
  });*/

});