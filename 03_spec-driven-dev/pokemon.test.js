const { Pokemon } = require('./pokemon.js');

function battle(pokemons) {

  let current = pokemons.at(0).speed >= pokemons.at(1).speed ? 0 : 1;
  let logs = [];
  
  while (pokemons.at(current).health > 0) {
    let attacker = pokemons.at(current);
    let defender = pokemons.at((current+1)%2);
    defender.health--;
    logs.push({attacker: attacker, defender: defender, attack: "death", force: 1})
    current = (current+1)%2;
  }

  return {
    winner: {...pokemons.at((current+1)%2)},
    pokemons: pokemons,
    logs: logs
  };
}

describe('pokemon battle', () => {

  let pikachu = new Pokemon("pikachu", 10, 5);
  let pikachu2 = {...pikachu};
  let bulbizzare = new Pokemon("bulbizzare", 20, 4);
  let salameche = new Pokemon("salameche", 5, 3);

  it.each([
    { attacker: pikachu, defender: salameche, winner: pikachu },
    { attacker: pikachu, defender: bulbizzare, winner: bulbizzare },
    { attacker: pikachu, defender: pikachu2, winner: pikachu },
  ])('should declare $winner.name is winner given a fight between $attacker.name and $defender.name', ({ attacker, defender, winner }) => {
    expect(battle([attacker, defender]).winner.name).toEqual(winner.name);
  });

  it.each([
    { attacker: pikachu, defender: salameche, firstAttacker: pikachu },
    { attacker: pikachu, defender: bulbizzare, firstAttacker: pikachu },
    { attacker: pikachu, defender: pikachu2, firstAttacker: pikachu },
  ])('should declare $firstAttacker.name first attacker given a fight between $attacker.name and $defender.name', ({ attacker, defender, firstAttacker }) => {
    let currentBattle = battle([attacker, defender]);
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