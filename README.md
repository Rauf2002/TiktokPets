# TiktokPets
Tiktok Videos by Node.js


All files are under "master" branch.


## **Description**

This project gets two random videos from a database of 8 actual Tiktok videos, and displays it for the user. User should like one of the two videos, then press "next" button to see the next two random videos. This happens 15 times. After the choosing the favorite video for the 15th time, the user is shown the most liked video determined by an algorithm. 


## **Methods used**

AJAX requests (GET and POST requests) and APIs are used for displaying, liking, and choosing the videos. The video objects are sent through the 


## **Database**

There is already one hard coded table of 8 tiktok videos URLs. Whenever the user likes the first video, another table named "PrefTable" is created by POST request and the liked videos are added into that table afterwards. These all happen in ["compare.js"](../master/public/compare.js).
