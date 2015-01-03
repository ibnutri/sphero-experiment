var Cylon = require('cylon');

Cylon.robot({
  connections: {
    sphero: { adaptor: 'sphero', port: '/dev/tty.Sphero-RPO-RN-SPP' }
  },

  devices: {
    sphero: { driver: 'sphero' }
  },

  work: function(my) {
    every((1).second(), function() {
      my.sphero.roll(60, Math.floor(Math.random() * 360));
    });
  }
}).start();