const { Pokemon } = require('./pokemon.js');

describe('pokemon', () => {
  it('should return 2 given pokemn with initial speed equals to 2', () => {
    let pokemon = new Pokemon(1);

    expect(pokemon.speed()).toBe(2);
  })

  it('should thrown exception given pokemn with bad initial speed', () => {
    expect(() => new Pokemon()).toThrow();
  })
});