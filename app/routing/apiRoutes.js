// get friends array from friends.js
var friendData = require("../data/friends");

// export apiRoutes to use in server
module.exports = function(app) {

  // Get the api/friends route and display the JSON data for all friends
  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  // When posting new friend, add them to friends array and check to find the best matching friend
  app.post("/api/friends", function(req, res) {

    friendData.push(req.body);

    // bestScore is set to very high number
    var bestScore = 100;

    // currScore will be compared to bestScore and if currScore is less than bestScore now currScore
    var currScore = 0;

    // currFriend is used to store the current best matching friend
    var currFriend;

    //loop through friendData to compare for all current friends, -1 because that is the current person
    for(var i = 0; i < friendData.length - 1; i++){

      // loop through scores for both and subtract using absolute value to get the difference between each person
      for(var j = 0; j < req.body.scores.length; j++){
        currScore += Math.abs(parseInt(req.body.scores[j]) - parseInt(friendData[i].scores[j]));
      }
      if(currScore < bestScore){
        bestScore = currScore;
        currFriend = friendData[i];
      }
    }

    // give the best matching friend as a response
    res.json(currFriend);

  })
}
