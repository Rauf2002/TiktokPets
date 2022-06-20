// when this page is opened, get the most recently added video and show it.



// always shows the same hard-coded video.  You'll need to get the server to 
// compute the winner, by sending a 
// GET request to /getWinner,
// and send the result back in the HTTP response.

sendGetRequest("/getWinner")
.then(function(winner_video) {
  // function is defined in video.js
let divElmt = document.getElementById("tiktokDiv");

let reloadButton = document.getElementById("reload");

  

  
    showWinningVideo(winner_video.url);
    document.getElementById("winnerTitle").textContent = "The winner is " + winner_video.nickname;

  // set up button to reload video in "tiktokDiv"
  reloadButton.addEventListener("click",function () {
    reloadVideo(tiktokDiv);
  });

  function showWinningVideo(url) {
  
  let winningUrl = url;
  addVideo(winningUrl, divElmt);
  loadTheVideos();
}
})





async function sendGetRequest(url) {
  let params = {
    method: 'GET', 
     };
  
  let response = await fetch(url,params);
  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    throw Error(response.status);
  }
}