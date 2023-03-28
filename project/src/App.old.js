import logo from './logo.svg';
import { useState, useEffect } from 'react';

import './App.css';
import {Pokemon, battle, Type} from  './pokemon'

function App() {
  const [value, setValue] = useState({data: undefined, loading: true, error: undefined});

  useEffect(() => {
    const attacker = new Pokemon("pikachu", 10, 5, 1, Type.LIGHTNING);
    const defender = new Pokemon("bulbasaur", 20, 4, 2, Type.PLANT);
    
    battle([attacker, defender]).then((result) => {
      setValue({
        data:{
          atk: attacker,
          def: defender,
          battle: result,
        },
        loading: false
      });
    }).catch((error)=> {
      console.error(error);
      setValue({
        loading: false,
        error: error
      });
    });

  }, []);

  if(value.loading){
    return "loading...";
  }
  
  if(value.error){
    return "Error...";
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>{value?.data?.atk?.name} vs {value?.data?.def?.name}</h2>
        <br/>
        {value?.data?.battle?.logs.map((lg, index) => {
          return (
            <p>{lg.attacker.name} has hit {lg.defender.name} with a force of {lg.power}</p>
          )
        })}
        <p>{value?.data?.battle.winner.name} has killed {value?.data?.battle.loser.name}</p>
      </header>
    </div>
  );
}

export default App;
