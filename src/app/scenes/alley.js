/**
 * Starting Scene
 */

export default {
  background: 'alley',
  exits: {
    north: {
      width: '30%',
      height: '40px',
      x: '50%',
      y: '60%',
      scene: 'start',
      entrance: 'south'
    }
  },

  objects: {
    /*
    key: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      frame: '',
      fixed: false,
      action: {}
    }
     */
  },

  npcs: {

  },

  distance: function (target) {
    // prevent target from moving any higher up
    if (target.y <= 384) target.y = 384;
    let scale = (target.y - 468)/1000;
    target.scale.x = 1 + scale;
    target.scale.y = 1 + scale;
  }
}
