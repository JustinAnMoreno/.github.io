//LASTFM API LINKS
// artist info url
// http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&autocorrect=1&artist=kanye&api_key=3e51c3ccbfb479b1fc253c8c0573c228&format=json

//artist top albums
//http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&autocorrect=1&artist=cher&api_key=3e51c3ccbfb479b1fc253c8c0573c228&format=json

//album info
//http://ws.audioscrobbler.com/2.0/?method=album.getinfo&autocorrect=1&api_key=3e51c3ccbfb479b1fc253c8c0573c228&artist=Cher&album=Believe&format=json

//constant variables
const getInfo =
  "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&autocorrect=1&artist=";
const myKey = "&api_key=3e51c3ccbfb479b1fc253c8c0573c228&format=json";
const topAlbums =
  "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&autocorrect=1&artist=";
const albumInfo =
  "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&autocorrect=1&api_key=3e51c3ccbfb479b1fc253c8c0573c228&artist=";
const $input = $("#artistInput");


//event listener
$("form").on("submit", handleSubmit);

//functions
function handleSubmit(evt) {
  evt.preventDefault();
  const artist = $input.val();
  $.ajax(getInfo + artist + myKey).then(function (data) {
    console.log(data);
  });
  $.ajax(topAlbums + artist + myKey).then(function (data) {
      console.log(data);
  });
  $.ajax(albumInfo + artist + '&album=' + 'the black album' + '&format=json').then(function (data) {
      console.log(data);
  })
}
