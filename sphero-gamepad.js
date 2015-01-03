var Cylon = require('cylon');
var gamepad = require('gamepad');
gamepad.init();
// List the state of all currently attached devices
for (var i = 0, l = gamepad.numDevices(); i < l; i++) {
  console.log(i, gamepad.deviceAtIndex());
}
var spheroDirection = 0;
// Create a game loop and poll for events
setInterval(gamepad.processEvents, 16);
// Scan for new gamepads as a slower rate
setInterval(gamepad.detectDevices, 500);
Cylon.robot({
  connections: {
    sphero: { adaptor: 'sphero', port: '/dev/tty.Sphero-RPO-RN-SPP' }
  },

  devices: {
    sphero: { driver: 'sphero' }
  },

  work: function(my) {
    gamepad.on("down", function(id, num){
      console.log(num);
      if(num == 3){
        my.sphero.startCalibration();
      }
      if(num == 4){ // left shoulder
        my.sphero.roll(10, 90);
      }
      if(num == 5){ // left shoulder
        my.sphero.roll(10, 180);
      }
      if(num == 0){
        my.sphero.setColor(0x0000FF);
      }
      if(num == 1){
        my.sphero.setColor(0x00FF00);
      }
      if(num == 2){
        my.sphero.setColor(0xFF0000);
      }
      if(num == 7){
        my.sphero.roll(60, 0);
      }
    });
    gamepad.on("up", function(id, num){
      if(num == 3){
        my.sphero.finishCalibration();
      }
      if(num == 4 || num == 5){
        my.sphero.stop();
      }
    });


    // every((1).second(), function() {
    //   my.sphero.roll(60, Math.floor(Math.random() * 360));
    // });
  }
}).start();