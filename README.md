# TiktokPets

**All files are under "master" branch.**


## **Description**

This project gets two random videos from a database of 8 actual Tiktok videos, and displays it for the user. User should like one of the two videos, then press "next" button to see the next two random videos. This happens 15 times. After the choosing the favorite video for the 15th time, the user is shown the most liked video determined by an algorithm. 


## **Methods Used**

AJAX requests (GET and POST requests) and APIs are used for displaying, liking, and choosing the videos. The video objects are sent through the requests as API strings.


## **Use of Database**

There is already one hard coded table of 8 tiktok videos URLs. Whenever the user likes the first video, another table named "PrefTable" is created by POST request and the liked videos are added into that table afterwards. These all happen in ["compare.js"](../master/public/compare.js). In the end, ["pickWinner.js"](../master/pickWinner.js) will go through the the table of liked videos and determine the winner (["winner.js"](../master/public/winner.js)). ["index.js"](../master/index.js) is handling all backend requests.


## **Frontend**

No external libraries have been used for this project, except _FontAwesome_ for icons and _Google Fonts_ for fonts. Frontend is typical CSS and HTML. Additionally, media queries are taking care of the responsiveness. 
