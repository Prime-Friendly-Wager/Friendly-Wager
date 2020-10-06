const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  // route to get all of app users i
router.get('/:search', rejectUnauthenticated, (req, res) => {
    if(req.body.payload = 'All') {
        let queryText = `SELECT id, username, first_name, last_name FROM "user";`;
    pool.query(queryText)
    .then(result => {
        res.send(result.rows)
    })
    .catch(error => {
        res.sendStatus(500)
    })
    } else{

    }
})


module.exports = router;