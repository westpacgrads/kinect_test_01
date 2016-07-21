var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  var Kinect2 = require('kinect2');

  var kinect = new Kinect2();

  var output = "";

  if(kinect.open()) {
      console.log("Kinect Opened");
      //listen for body frames
      kinect.on('bodyFrame', function(bodyFrame){
          output += "----NEXT SCAN----\n"
          for(var i = 0;  i < bodyFrame.bodies.length; i++) {
              if(bodyFrame.bodies[i].tracked) {
                  for(var j = 0; j < bodyFrame.bodies[i].joints.length; j++){
                        console.log(bodyFrame.bodies[i].joints[j]);
                        output += JSON.stringify(bodyFrame.bodies[i].joints[j]) + "\n";
                  }
              }
          }
      });

      //request body frames
      kinect.openBodyReader();

      //close the kinect after 5 seconds
      setTimeout(function(){
          kinect.close();
          console.log("Kinect Closed");
          res.render('index', { title: 'Express', meh: output });
      }, 5000);
  }
  //res.render('index', { title: 'Express', meh: output });
});

module.exports = router;
