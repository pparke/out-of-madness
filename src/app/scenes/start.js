/**
 * Starting Scene
 */

export default {
  background: 'start',

  exits: {
    south: {
      width: '100%',
      height: '40px',
      x: '50%',
      y: '99%',
      scene: 'alley',
      entrance: 'north'
    }
  },

  objects: {
    trash: {
      x: '45.5%',
      y: '69%',
      width: 48,
      height: 10,
      offsetX: 0,
      offsetY: 0,
      textureKey: 'objects',
      frameName: 'trashcan',
      immovable: true,
      collide: true,
      action: {
        look: {
          text: "Looks like a trashcan to me."
        }
      }
    },
    pillar: {
      x: '51.6%',
      y: '69%',
      width: 55,
      height: 10,
      offsetX: 0,
      offsetY: 0,
      textureKey: 'objects',
      frameName: 'pillar',
      immovable: true,
      collide: true,
      action: {
        look: {
          text: "I guess it holds up the tracks above."
        }
      }
    },
    edge: {
      x: '89%',
      y: '96%',
      width: 160,
      height: 100,
      offsetX: 0,
      offsetY: -80,
      textureKey: 'objects',
      frameName: 'edge',
      immovable: true,
      collide: true,
      action: {}
    }
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
