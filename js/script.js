//LASTFM API LINKS
// artist info url
// http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&autocorrect=1&artist=kanye&api_key=3e51c3ccbfb479b1fc253c8c0573c228&format=json

//artist top albums
//http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&autocorrect=1&artist=cher&api_key=3e51c3ccbfb479b1fc253c8c0573c228&format=json

//album info
//http://ws.audioscrobbler.com/2.0/?method=album.getinfo&autocorrect=1&api_key=3e51c3ccbfb479b1fc253c8c0573c228&artist=Cher&album=Believe&format=json

//AudioDB API LINKS
//https://www.theaudiodb.com/api/v1/json/1/search.php?s=kanye%20west

//constant variables
const getInfo="http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&autocorrect=1&artist=";
const myKey="&api_key=3e51c3ccbfb479b1fc253c8c0573c228&format=json";
const topAlbums="http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&limit=6&autocorrect=1&artist=";
const albumInfo="http://ws.audioscrobbler.com/2.0/?method=album.getinfo&autocorrect=1&api_key=3e51c3ccbfb479b1fc253c8c0573c228&artist=";
const artistExtras="https://www.theaudiodb.com/api/v1/json/1/search.php?s=";
const similarArtist="http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&autocorrect=1&limit=3&artist=";
const $input=$("#artistInput");

//global variables
let $albumName = [];
let $similarArtists = [];
let $published = [];
let $summary = [];
let $albumImg = [];

//cached dom elements
const $name = $('.name');
const $bio = $('.bio'); 

//event listener
$("form").on("submit", handleSubmit);

//functions
function handleSubmit(evt) {
  evt.preventDefault();
  const artist = $input.val();
  $albumName = [];
  $similarArtists = [];
  $published = [];
  $summary = [];
  $albumImg = [];

    //artist info
  $.ajax(getInfo + artist + myKey).then(function (data) {
    console.log(data.artist.bio.summary);
    console.log(data.artist.name);
    console.log(data.artist.stats.listeners);
    console.log(data.artist.stats.playcount);
  });

    // artist' top ranked albums
  $.ajax(topAlbums + artist + myKey).then(function (data) {
    for (var i = 0; i < data.topalbums.album.length; i++) {
      $albumName.push(data.topalbums.album[i].name);
    }
    console.log($albumName);

    // details for artist top ranked albums
    for (var j = 0; j < $albumName.length; j++)
      $.ajax(
        albumInfo + artist + "&album=" + $albumName[j] + "&format=json").then(function (data) {
        $published.push(data.album.wiki.published);
        $summary.push(data.album.wiki.summary);
        $albumImg.push(data.album.image[2])
      });
    console.log($published);
    console.log($summary);
    console.log($albumImg); 
  });

    //similar artists
  $.ajax(similarArtist + artist + myKey).then(function (data) {
    for (var u = 0; u < data.similarartists.artist.length; u++) {
      $similarArtists.push(data.similarartists.artist[u].name);
    }
    console.log($similarArtists);
  });

    //artist images/socials
  $.ajax(artistExtras + artist).then(function (data) {
    console.log(data.artists[0].strArtistThumb);
    console.log(data.artists[0].strTwitter);
    console.log(data.artists[0].strWebsite);
    console.log(data.artists[0].strFacebook);
  });
}



