const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  // route to get all of app users
router.get('/:search', rejectUnauthenticated, async (req, res) => {
    let nonFriendMembersList = [];
    const client = await pool.connect();
    if(req.params.search ==='All') { // gets all of the members of the app
        try{
            await client.query('BEGIN');
            const firstQuery = `SELECT "user".id, "user".username, "user".first_name, "user".last_name FROM "user"
            JOIN "friends" ON "friends".user2_id = "user".id
            WHERE "friends".user1_id = $1
            UNION
            SELECT "user".id, "user".username, "user".first_name, "user".last_name FROM "user"
            JOIN "friends" ON "friends".user1_id = "user".id
            WHERE "friends".user2_id = $1;`;
            let friends =  await client.query(firstQuery, [req.user.id]);
            let secondQuery = `SELECT id, username, first_name, last_name FROM "user";`;
            let members = await client.query(secondQuery);
            await client.query('COMMIT');
            for(let i = 0; i < members.rows.length; i++){
                for(let j = 0; j < friends.rows.length; j++){
                    if(members.rows[i].id === friends.rows[j].id){
                        members.rows.splice(i, 1);
                        i++;
                    }
                }
            }
            res.send(members.rows)
        }catch(error){
            await client.query('ROLLBACK');
            throw error;
        }finally{
            client.release()
        }
    }
})

// route to get the current logged in user's friends
router.get('/', rejectUnauthenticated, (req, res) => {
        let queryText = `
        SELECT "user".id, "user".username, "user".first_name, "user".last_name FROM "user"
        JOIN "friends" ON "friends".user2_id = "user".id
        WHERE "friends".user1_id = $1
        UNION
        SELECT "user".id, "user".username, "user".first_name, "user".last_name FROM "user"
        JOIN "friends" ON "friends".user1_id = "user".id
        WHERE "friends".user2_id = $1;
      `;
    pool.query(queryText, [req.user.id])
    .then(result => {
        res.send(result.rows) 
    })
    .catch(error => {
        res.sendStatus(500)
    })
})


module.exports = router;