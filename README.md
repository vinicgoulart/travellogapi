# Travel log API
This is a Travel Log API. The user can share their travel experiences and comment on other's logs! A log must contain an image, title, description and place of travel! <br />

## API endpoints
### Auth
POST to /register => register your account (username, email and password required). <br />
POST to /login => log in to your account (email and password required). <br />
PUT to /change-pass => change your password (username and password required). <br />
GET to /logout => log out of your account. <br />

### User
*All endpoints require a 'sessionId' header. <br />
GET to /user/ => to get all users. <br />
DELETE to /user/ => to delete the current user. <br />
PUT to /user/ => to update current user (description is required). <br />

### Log
*All endpoints require a 'sessionId' header. <br />
GET to /log/ => to get all logs. <br />
GET to /log/:id => to get one log. <br />
POST to /log/ => to create a log (title, description, place and imgUrl required). <br />
PUT to /log/:id => to update a log (title, description and dateOfTravel are updatable). <br />
DELETE to /log/:id => to delete a log. <br />

### Comment
*All endpoints require a 'sessionId' header. <br />
GET to /comment/:logId => to get all comments of one log. <br />
GET to /comment/one/:commentId => to get one comment. <br />
POST to /comment/:logId => to create a comment (comment required). <br />
PUT to /comment/update-comment/:commentId => to update one comment (comment required). <br />
PUT to /comment/like-comment/:commentId => to like one comment. <br />
DELETE to /comment/:commentId => to delete one comment. <br />

Feedbacks are always appreciated!
