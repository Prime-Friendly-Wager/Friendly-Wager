const express = require('express');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//3.1 open bets on individual game
router.get('/details/:id', rejectUnauthenticated, async (req, res) => {
    const client = await pool.connect();

    try {
        //gets all of the logged in users friends
        const friendQuery = `SELECT "user".id FROM "user"
        JOIN "friends" ON "friends".user2_id = "user".id
        WHERE "friends".user1_id = $1
        UNION
        SELECT "user".id FROM "user"
        JOIN "friends" ON "friends".user1_id = "user".id
        WHERE "friends".user2_id = $1;`

        const friendResults = await pool.query(friendQuery, [req.user.id])
        const friendsIds = friendResults.rows;

        //gets all of their friends open bets for this particular game
        const bets = await Promise.all(friendsIds.map(friendsId => {
            const betQuery = `SELECT * FROM "bets"
                WHERE "proposers_id" = $1
                AND "accepted" = false
                AND "game_id" = $2;`

            return client.query(betQuery, [friendsId, req.params.id])
        }))
        
        await client.query('COMMIT');
        res.send(bets)

    } catch (error) {
        await client.query('ROLLBACK');
        console.log('ERROR GETTING 3.1 BETS', error);
        res.sendStatus(500)
    } finally {
        client.release();
    }
})

module.exports = router;