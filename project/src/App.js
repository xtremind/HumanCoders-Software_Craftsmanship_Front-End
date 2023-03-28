import { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [value, setValue] = useState({data: undefined, loading: true, error: undefined});

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?offset=1&limit=1')
      .then(response => response.json())
      .then(data => {
        setValue({
          data:{
            pokemon: data.results[0],
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
    return (<>Loading...</>);
  }
  
  if(value.error){
    return (<>Error...</>);
  }

  return (
    <div className="App">
      <header className="App-header">
        {value?.data?.pokemon.name}
      </header>
    </div>
  );
}

export default App;
