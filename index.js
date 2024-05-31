const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

const API_KEY = "RGAPI-cf2697bd-8de7-4c70-aecd-6cab41c28fa9"; //const API_KEY = process.env.API_KEY;


function getPlayerPUUID(playerName,playerId){
    return axios.get(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${playerName}/${playerId}?api_key=${API_KEY}`)
            .then(response => {
                console.log(response.data);
                return response.data.puuid
            }).catch(err => err);
}


app.get('/historique', async (req,res) => {
    const playerName = req.query.playerName;
    const playerId = req.query.playerId;
    const PUUID = await getPlayerPUUID(playerName,playerId);
    const API_CALL = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${PUUID}/ids?start=0&count=20&api_key=${API_KEY}`;

    const gameIDs = await axios.get(API_CALL)
            .then(response => response.data )
            .catch(err => err);

            console.log(gameIDs);
    let matchDataArray = [];
    for(let i = 0; i < gameIDs.length - 15; i++){
        const matchID = gameIDs[i];
        const matchData = await axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${API_KEY}`)
            .then(response => response.data)
            .catch(err => err)
            matchDataArray.push(matchData);
    }


    res.json(matchDataArray);
})


app.listen(5000, function() {
    console.log("server start 🚀");
});
