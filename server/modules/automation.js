const cron = require('node-cron');
const { theJudge, getGamesFromNfl } = require('../modules/theJudge');



function automationFunction(){

//gets the current week games at 
// cron.schedule('* 9 * * 2', function(){
//     getGamesFromNfl();
// })
}



// cron.schedule('5 11 * * 2', function(){
//     theJudge();
// })

module.exports = automationFunction