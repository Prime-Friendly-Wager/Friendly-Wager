const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//the querytext in this route will need to be changed
//as of now it's not getting the team names or logos, just displaying team id
//need to change date column data type to time, time currently not displaying correctly
router.get('/', (req, res) => {
    const queryText = `SELECT games.*, home_team."name" as home_team, away_team."name" as away_team
                    FROM "games"
                    LEFT JOIN "teams" as home_team ON "games".home_team_id = "home_team".id
                    LEFT JOIN "teams" as away_team ON "games".away_team_id = "away_team".id
                    WHERE "games".week = 3;`
    pool.query(queryText)
        .then((result) => {
            console.log('ROUTER GAMES', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('ERROR GETTING GAMES', error);
            res.sendStatus(500); //internal server error
        })
});

module.exports = router;
