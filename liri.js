//variable for requirements
var keys = require("./keys");
var fs = require("fs");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");

// needed for user input
var userInput = process.argv[2];
// var secTitle = process.argv[3];

// commands that can be entered
var commands = {
  "tweets": "my-tweets",
  "spotify": "spotify-this-song",
  "movie": "movie-this",
  "action": "do-what-it-says"
}

if (userInput === commands.tweets) {
  tweets();
} else if (userInput === commands.spotify) {
  spotifySearch();
} else if (userInput === commands.movie) {
  movieSearch();
} else if (userInput === commands.action) {
  justDoIt();
}

/********************
  twitter commands
*********************/
function tweets() {

  var client = new Twitter({
    consumer_key: 'pNDwqNif14BYHYwDeLssBPiu0',
    consumer_secret: '88LcGJMrb8OhQYOp1nekKe4rPujz9VdmJVSbQglW0cFyL7rvO1',
    access_token_key: '223348242-jTpWmPYLz85jAJwFvWEdeyT4ihxnlg29ANUMSzHk',
    access_token_secret: '6STU88aNz1lPSoNDMZ35PApseVG3qwDUFINjIIdJENofO'
  });

  var params = {
    screen_name: 'ThisIsTre3'
  };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      if (userInput === commands.tweets) {
        for (var i = 0; i < 5; i++) {
          console.log(tweets[i].text);
        }
      }

    } else {
      console.log(error);
    }
  });

}

/*****************
 spotify commands
 ****************/
function spotifySearch(songTitle){
  var songTitle = process.argv[3];
  if (!songTitle){
    songTitle = "I Want it That Way";
  } else {
    songTitle = songTitle;
  }

  var spotify = new Spotify({
    id: 'd19224dcbf4c43a9871319c46d2c3740',
    secret: '40dc646fd0aa44cf861b4f05ecd14d85'
  });
  
  spotify.search({
    type: 'track',
    query: songTitle
  }, function (err, data) {
    if (!err) {
      if (userInput === commands.spotify) {
        console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name)
        console.log("Song Title: " + data.tracks.items[0].name);
        console.log("Song Preview Link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
      } else {
        return console.log('Error occurred: ' + err);
      }
    }
  
  });

}

/********
 OMDB
 ********/
function movieSearch(){
  var movieTitle = process.argv[3];
  
  if (!movieTitle) {
    movieTitle = "mr nobody";
  }
  request('http://www.omdbapi.com/?t=' + movieTitle + '&apikey=116ac5d', function (error, response, body) {
    if (!error) {
        var movieResponse = JSON.parse(body);
        console.log("Title: " + movieResponse.Title);
        console.log("Year: " + movieResponse.Year);
        console.log("Rating: " + movieResponse.imdbRating);
        console.log("Production Location: " + movieResponse.Country)
        console.log("Language: " + movieResponse.Language);
        console.log("Plot: " + movieResponse.Plot);
        console.log("Actors: " + movieResponse.Actors);
      }
  });


}

/****************
 do what it says
 **************/
function justDoIt(){
  fs.readFile("random.txt", "utf-8",function(error, data){
    if (!error){
      var dataArr = data.split(",");
      userInput = dataArr[0];
      spotifySearch(dataArr[1]);
    }else {
      console.log(error);
    }

  })
}