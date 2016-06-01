/**
 * TextBox Component
 */
import Base from'./Base';

export default class TextBox extends Base {
  constructor (... args) {
    super(... args);

    this.name = 'TextBox';
    this.target = null;


    this.events = {
    };

    this.style = {
      font: '16px RainfallBlack',
      fontSize: `16px`,
      fontFamily: 'RainfallBlack',
      fill: '#FFFFFF',
      stroke: '#000000',
      strokeThickness: 2,
      wordWrap: true,
      wordWrapWidth: 150,
      align: 'center'
    };

    this.chars = [];
    this.delay = 60;
  }

  afterTarget () {
    this.text = this.target.game.add.text(0, 0, '', this.style);
    this.text.anchor.set(0.5);
  }

  update () {
    // keep the text centered above the target
    this.text.x = this.target.x;
    this.text.y = (this.target.y - this.target.height - 20);
  }

  showText (content) {
    this.chars = content.split('');
    this.cindex = 0;
    // call the next char method for each character
    this.target.game.time.events.repeat(this.delay, this.chars.length, this.nextChar, this);
  }

  nextChar () {
    this.text.text = this.text.text.concat(this.chars[this.cindex] + ' ');
    this.cindex += 1;
    if (this.cindex === this.chars.length) {
      this.target.game.time.events.add(500, this.clearText, this);
    }
  }

  clearText () {
    this.text.text = '';
  }

}
