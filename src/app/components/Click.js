/**
 * Click Component
 */
import Base from'./Base';

export default class Click extends Base {
  constructor (... args) {
    super(... args);

    this.name = 'Click';
    this.target = null;


    this.events = {
      onClick: new Phaser.Signal()
    };

  }

  afterTarget () {
    this.target.inputEnabled = true;
    this.target.events.onInputUp.add(this.clicked, this);
  }

  clicked (target, pointer) {
    this.publish('onClick', target, pointer);
  }

}
