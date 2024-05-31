import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState("");
  const [id, setId] = useState("");
  const [gameList, setGameList] = useState([]);

  function getPlayerGames(event){
    axios.get("http://localhost:3000/historique", {params: {playerName: searchText , playerId: id}})
    .then(function(response){
      setGameList(response.data)
    }).catch(function(error){
      console.log(error);
    })
  }

  console.log(gameList)
  return (
    <div className="App">
      <h2>Bienvenu sur le tracker BY BENAT ! 🙆‍♂️</h2>
      <input type='text' placeholder='Pseudo' onChange={ e => setSearchText(e.target.value)}></input>
      <input type='text' placeholder='EUW' onChange={ e => setId(e.target.value)}></input>
      <button onClick={getPlayerGames}>Regardes tes parties </button>
      {gameList.length !== 0 ?
    <>
        <p>Nous avons les données</p>
        {
          gameList.map((gameData, index) => 
            <>
                <h2> GAME {index +1} </h2>
                <div>
                {gameData.info.participants.map((data, participantsIndex) => 
                  <p>Player {participantsIndex + 1}: {data.summonerName}, KDA: {data.kills} / {data.deaths} / {data.assists}</p>
                )
                }
                </div>
            </>
          )
        }
    </>
:
    <p>Nous n'avons rien trouvé !</p>
}
</div>
  );
}

export default App;
