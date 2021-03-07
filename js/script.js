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
const getInfo =
  "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&autocorrect=1&artist=";
const myKey = "&api_key=3e51c3ccbfb479b1fc253c8c0573c228&format=json";
const topAlbums =
  "https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&limit=6&autocorrect=1&artist=";
const albumInfo =
  "https://ws.audioscrobbler.com/2.0/?method=album.getinfo&autocorrect=1&api_key=3e51c3ccbfb479b1fc253c8c0573c228&artist=";
const artistExtras = "https://www.theaudiodb.com/api/v1/json/1/search.php?s=";
const similarArtist =
  "https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&autocorrect=1&limit=3&artist=";
const $input = $("#artistInput");

//global variables
let $albumName = [];
let $similarArtists = [];
//cached dom elements
const $name = $(".name");
//intro
let $bio = $(".bio");
const $listeners = $(".listeners");
const $playcount = $(".playcount");
let $artist_image = $(".main_image");
//socials
const $twitter = $(".twitter");
const $facebook = $(".facebook");
const $website = $(".website");
//Similar Artists
//Top Albums
// let $album_image0 = $(".album_image1");
// let $album_image1 = $(".album_image2");
// let $album_image2 = $(".album_image3");
// let $album_image3 = $(".album_image4");
// let $album_image4 = $(".album_image5");
// let $album_image5 = $(".album_image6");

//event listener
$("form").on("submit", handleSubmit);

//functions
function handleSubmit(evt) {
  evt.preventDefault();
  const artist = $input.val();
  let albumData = [];
  similarArtists = [];

  $.ajax(getInfo + artist + myKey).then(function (data) {
    console.log(data.artist.bio.summary);
    console.log(data.artist.name);
    console.log(data.artist.stats.listeners);
    console.log(data.artist.stats.playcount);
    artistInfo = data;
    $name.text(artistInfo.artist.name);
    $bio.empty().append(artistInfo.artist.bio.summary);
    $listeners.text(artistInfo.artist.stats.listeners);
    $playcount.text(artistInfo.artist.stats.playcount);
  });

  // artist' top ranked albums
  $.ajax(topAlbums + artist + myKey).then(function (data) {
    for (var i = 0; i < data.topalbums.album.length; i++) {
      albumData.push({ Name: data.topalbums.album[i].name });
    }
    console.log(data);
    // $album_image0.empty().attr("src", data.topalbums.album[0].image[2].#text);
    // $album_image1.empty().attr("src", data.topalbums.album[1].image[2].#text);
    // $album_image2.empty().attr("src", data.topalbums.album[2].image[2].(`[#text]`));
    // $album_image3.empty().attr("src", data.topalbums.album[3].image[2].#text);
    // $album_image4.empty().attr("src", data.topalbums.album[4].image[2].#text);
    // $album_image5.empty().attr("src", data.topalbums.album[5].image[2].#text);
  });

  console.log(albumData);

  //artist images/socials
  $.ajax(artistExtras + artist).then(function (data) {
    console.log(data.artists[0].strArtistThumb);
    console.log(data.artists[0].strTwitter);
    console.log(data.artists[0].strWebsite);
    console.log(data.artists[0].strFacebook);
    $artist_image.empty().attr("src", data.artists[0].strArtistThumb);
  });
}
