const cron = require('node-cron');
const { theJudge, getGamesFromNfl } = require('../modules/theJudge');


function getGames() {
    cron.schedule('9 10 * * 2', function(){
        getGamesFromNfl();
    });
    
    cron.schedule('19 11 * * 2', function(){
        theJudge();
    });
};


module.exports = getGames;