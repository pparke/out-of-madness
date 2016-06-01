/*
 * The `assets` module
 * ============================================================================
 *
 * Use this module to declare static Phaser Asset Packs, that would be loaded
 * using the `Loader#pack` API.
 *
 * Regarding how the game assets should be declared using this file, refer to
 * the sample `assetPack.json` included in the Phaser package, under
 * `node_modules/phaser/resources/` directory, for a more complete
 * reference.
 *
 */


module.exports = {

  // - Boot Assets ------------------------------------------------------------
  boot: [
    {
      key: 'splash-screen',
      url: 'img/splash-screen.png',
      type: 'image'
    },

    {
      key: 'progress-bar',
      url: 'img/progress-bar.png',
      type: 'image'
    }
  ],

  // - Game assets ------------------------------------------------------------
  game: [
    {
      key: 'phaser',
      url: 'img/phaser.png',
      type: 'image'
    },

    {
      key: 'menubar',
      url: 'img/menubar.png',
      type: 'image'
    },

    {
      type: "atlasJSONArray",
      key: 'background',
      textureURL: 'img/background.png',
      atlasURL: "json/background.json",
      atlasData: null
    },

    {
      type: "atlasJSONArray",
      key: "character",
      textureURL: "img/character.png",
      atlasURL: "json/character.json",
      atlasData: null
    },

    {
      type: "atlasJSONArray",
      key: "objects",
      textureURL: "img/testobjects.png",
      atlasURL: "json/objects.json",
      atlasData: null
    },

    {
      type: "atlasJSONArray",
      key: "cursors",
      textureURL: "img/cursors.png",
      atlasURL: "json/cursors.json",
      atlasData: null
    },

    {
      type: 'atlasJSONArray',
      key: 'GUI',
      textureURL: 'img/GUI.png',
      atlasURL: 'json/GUI.json',
      atlasData: null
    },

    // Example: adding background music.
    // {
    //   key: 'tune',
    //   type: 'audio',
    //   urls: [ 'tune.oga', 'tune.m4a' ]
    // }

    // Example: adding a audio sprite containing sound effects.
    // {
    //   key: 'sfx',
    //   type: 'audiosprite',
    //   urls: [ 'sfx.m4a' ],
    //   jsonURL: 'sfx.json'
    // }
  ]

};
