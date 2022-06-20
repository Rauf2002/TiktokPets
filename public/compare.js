"use strict"
  
let like_btn = document.getElementsByClassName("like_btn");
let next_btn = document.getElementById("nextBtn");
let nickname_spans = document.getElementsByClassName("nickname");

sendGetRequest("/getTwoVideos")
.then(function (two_videos) {
  let urls = [two_videos[0].url, two_videos[1].url];

  // Fill nicknames
  for (let i = 0; i < two_videos.length; i++) {
    nickname_spans[i].textContent = two_videos[i].nickname;
  }
  
  let videoElmts = document.getElementsByClassName("tiktokDiv");
  let reloadButtons = document.getElementsByClassName("reload");
  let heartButtons = document.querySelectorAll("div.heart");
  for (let i=0; i<2; i++) {
    let reload = reloadButtons[i]; 
    reload.addEventListener("click",function() {           reloadVideo(videoElmts[i]) });
    heartButtons[i].classList.add("unloved");
  } // for loop

  for (let i=0; i<2; i++) {
      addVideo(urls[i],videoElmts[i]);
    }
    // load the videos after the names are pasted in! 
    loadTheVideos();  


  for (let i = 0; i < like_btn.length; i++) {
    like_btn[i].addEventListener("click", function () {
    likeBtnPress(i,two_videos)
    });
  }

  
});


next_btn.addEventListener("click", function() {
  sendGetRequest("/getPref")
  .then(function(data) {
    if (data.length < 15) {
      window.location.reload();
    } else {
      window.location = "/winner.html";
    }
  })
}) 
  


function likeBtnPress(i,two_videos) {
  like_btn[i].firstElementChild.removeChild(like_btn[i].firstElementChild.firstElementChild);
  let filled_heart = document.createElement("i");
  filled_heart.classList.add("fas");
  filled_heart.classList.add("fa-heart");
  filled_heart.style = "color: rgb(238, 29, 82,.9)"
  like_btn[i].firstElementChild.appendChild(filled_heart);

  let better_vid = two_videos[i].rowIdNum;
  let worse_vid;
  if (i == 1) {
    worse_vid = two_videos[0].rowIdNum;
  } else {
    worse_vid = two_videos[1].rowIdNum;
  }
  console.log(better_vid);
  console.log(worse_vid);
  let data = {
    "better": better_vid,
    "worse": worse_vid,
  }

  sendPostRequest("/insertPref", JSON.stringify(data))
  .then( function (response) {
        console.log("Response received", response);
  })
  .catch( function(err) {
        console.log("POST request error",err);
  });
}



// GET Request
async function sendGetRequest(url) {
 let params = {
    method: 'GET', 
    headers: {'Content-Type': 'text/plain'} };
  console.log("about to send get request");

 
  let response = await fetch(url,params);
  if (response.ok) {
    let data = await response.json();

    
    return data;
  } else {
    throw Error(response.status);
  }
}

// POST Request
async function sendPostRequest(url,data) {
  let params = {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: data };
  console.log("about to send post request");
  
  let response = await fetch(url,params);
  if (response.ok) {
    let data = await response.text();
    return data;
  } else {
    throw Error(response.status);
  }
}