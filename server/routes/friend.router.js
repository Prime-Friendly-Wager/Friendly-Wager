const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  // route to get all of app users
router.get('/:search', rejectUnauthenticated, (req, res) => {
    if(req.params.search ==='All') {
        let queryText = `SELECT id, username, first_name, last_name FROM "user";`;
    pool.query(queryText)
    .then(result => {
        res.send(result.rows)
    })
    .catch(error => {
        res.sendStatus(500)
    })
    } else{
        let name = `%${req.params.search}%`;
        let queryText = `SELECT id, username, first_name, last_name FROM "user"
        WHERE "first_name" ILIKE $1;`;
        pool.query(queryText, [name])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            res.sendStatus(500);
        })
    }
})

router.get('/getfriends', rejectUnauthenticated, (req, res) => {
        values = [req.user.id]
        console.log(values)
        let queryText = `
        SELECT * FROM "user"
        JOIN "friends" 
        ON "friends".user1_id = "user".id
        WHERE "friends".user1_id = $1 OR "friends".user2_id = $1
        
      `;
    pool.query(queryText, values)
    .then(result => {
        console.log(result.rows)
        res.send(result.rows)
    })
    .catch(error => {
        res.sendStatus(500)
    })
})


module.exports = router;