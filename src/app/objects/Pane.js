/*
 * Pane
 */
import parseDimension from '../util/parseDimension';

export default class Pane extends Phaser.Group {

  constructor (game, ... args) {
    super(game, ... args);

    this.layout = {};

    this.entries = [];
    this.items = new Map();

    // font settings
    this.style = {};

    this.events = {};
    this.events.onClick = new Phaser.Signal();

    // button styles
    this.buttonKeys = {
      image: 'GUI',
      action: {
        over: 'actionOver',
        out: 'actionOut',
        down: 'actionDown'
      },
      inventory: {
        over: 'inventoryOver',
        out: 'inventoryOut',
        down: 'inventoryDown'
      }
    };
  }

  init (config) {
    this.layout = config.layout;
    this.style = config.font;
    this.setupButtons(config.items);
  }

  createClickHandler (action) {
    //let clickEvent = this.events.onClick;
    return function () {
      console.log('clicked', action)
      this.events.onClick.dispatch(action);
    }
  }

  setupButtons (elems) {
    let container = parseDimension(this.layout.container, this.parent);
    let element   = parseDimension(this.layout.element, container);
    console.log('c and e', container, element)

    let numCols   = Math.floor(container.width / (element.width + element.padding*2));
    console.log('numcols', numCols)
    elems.forEach((item, i) => {
      let row = Math.floor(this.items.size / numCols);
      let col = this.items.size % numCols;
      let x = (col * element.width) + container.x + element.padding*2*col+element.padding;
      let y = (row * element.height) + container.y + element.padding*2*row+element.padding;
      let button  = this.createButton(x, y, this.createClickHandler(item.action), this);

      let centerX = button.x + button.width/2;
      let centerY = button.y + button.height/2;

      let data = {};
      data.button = button;
      data.text = this.createText(centerX, centerY + button.height/2 + this.style.fontSize/2, item.text);
      if (item.frame && item.key) {
        data.icon = this.createIcon(centerX, centerY, item.key, item.frame);
      }
      console.log(data)
      this.items.set(item.name, data);
    });
  }


  /**
   * Create Button
   * Creates an item in the pane along with any specified icon or text.
   */
  createButton (x, y, action, context, buttonKey='action') {
    let button = this.game.add.button(x, y, this.buttonKeys.image, action, context, this.buttonKeys[buttonKey].over, this.buttonKeys[buttonKey].out, this.buttonKeys[buttonKey].down);
    this.add(button);
    button.fixedToCamera = true;
    return button;
  }

  /**
   * Create Text
   */
  createText (x, y, text) {
    let label = this.game.add.text(x, y, text, this.style);
    label.anchor.set(0.5);
    label.fixedToCamera = true;

    return label;
  }

  /**
   * Create Icon
   */
  createIcon (x, y, key, frame) {
    let icon = this.game.add.sprite(x, y, key, frame);
    icon.anchor.set(0.5, 0.5);
    icon.fixedToCamera = true;
    this.add(icon);
    return icon;
  }

  /**
   * Add Text
   * Revives or creates a new text entry, sets it's text and positions it.
   * @param {string} text - the text to display
   * @param {number} x - the x position of the text
   * @param {number} y - the y position of the text
   */
  addText (text, x, y) {
    // get the first dead entry
    let entry;
    this.entries.some((e) => {
      if (!e.image.alive) {
        entry = e;
        return true;
      }
      return false;
    });

    if (!entry) {
      entry = this.createText(text, x, y);
    }
    else {
      entry.text = text;
      entry.x = x;
      entry.y = y;
      entry.revive();
    }
  }
}
