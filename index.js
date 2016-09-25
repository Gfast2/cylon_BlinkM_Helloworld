var Cylon = require('cylon');

Cylon.robot({
  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/serial/by-path/platform-musb-hdrc.1.auto-usb-0:1:1.0' }
  },

  devices: {
    led: { driver: 'led', pin: 13 },
    blinkm: { driver: "blinkm" }
  },

  work: function(my) {
    every((1).second(), my.led.toggle);

    my.blinkm.stopScript();
    
    my.blinkm.getFirmware(function(err, version) {
      console.log(err || "Starting Color: ", version);
    });

    my.blinkm.goToRGB(0,0,0);

    my.blinkm.getRGBColor(function(err, data){
      console.log(err || "Starting Color: ", data);
    });

    every((2).seconds(), function(){
      my.blinkm.getRGBColor(function(err, data) {
        console.log(err || "Current Color: ", data);
      });    
      my.blinkm.fadeToRandomRGB(128, 128, 128);
    });    
 }
}).start();

// Description: https://github.com/hybridgroup/cylon-api-socketio
Cylon.api('http',
{
    host: '192.168.0.144',
    port: '3001'
});
