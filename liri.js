//variable for requirements
var keys = require("./keys");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

// needed for user input
var userInput = process.argv[2];

// commands that can be entered
var commands = {
    "tweets" : "my-tweets",
    "spotify" : "spotify-this-song",
    "movie" : "movie-this",
    "action" : "do-what-it-says"
}

/********************
  twitter commands
*********************/
var client = new Twitter({
    consumer_key: 'pNDwqNif14BYHYwDeLssBPiu0',
    consumer_secret: '88LcGJMrb8OhQYOp1nekKe4rPujz9VdmJVSbQglW0cFyL7rvO1',
    access_token_key: '223348242-jTpWmPYLz85jAJwFvWEdeyT4ihxnlg29ANUMSzHk',
    access_token_secret: '6STU88aNz1lPSoNDMZ35PApseVG3qwDUFINjIIdJENofO'
  });

var params = {screen_name: 'ThisIsTre3'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    if (userInput === commands.tweets){
        for(var i = 0; i < 5; i++){
            console.log(tweets[i].text);
        }
      }
    
  } else {
      console.log(error);
  }
});

/*****************
 spotify commands
 ****************/

var spotify = new Spotify({
    id: 'd19224dcbf4c43a9871319c46d2c3740',
    secret: '40dc646fd0aa44cf861b4f05ecd14d85'
  });

  spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (!err) {
      if(userInput === commands.spotify){
          console.log(data)
      } else {
        return console.log('Error occurred: ' + err);
      }
    }
   
  });