/**
 * Move To System
 * Causes an entity to move to the clicked position.
 */
import BaseSystem from './BaseSystem';
import Cursor     from '../objects/Cursor';

export default class MoveToClick extends BaseSystem {
  constructor (game, ... args) {
    super(game, ... args);

    this.game = game;

    this.components = ['Move', 'Click', 'TextBox'];

    this.actor = null;
    this.cursor = new Cursor(this.game);

    this.modes = {
      look: {
        frameName: 'eye01'
      },
      take: {
        frameName: 'hand01'
      },
      move: {
        frameName: 'move01'
      },
      speak: {
        frameName: 'speak01'
      }
    };
    this.currentMode = 'look';
  }

  handler (target, pointer) {
    if (pointer.rightButton.justReleased()) {
      this.nextMode();
    }
    else if (pointer.leftButton.justReleased()) {
      if (this.currentMode === 'move') {
        this.actor.components.Move.moveTo(pointer.positionUp);
      }
      else if (this.currentMode === 'look') {
        if (target.action && target.action.look && target.action.look.text) {
          this.actor.components.TextBox.showText(target.action.look.text);
          console.log(target.action.look.text)
        }
      }
      else {
        if (target.action && target.action.any) {
          if (target.action.any.mode) {
            this.changeMode(target.action.any.mode);
          }
        }
      }
    }
  }

  addActor (target) {
    let components = this.mogrify(target, ['Move']);
    this.actor = target;
  }

  addTrigger (target) {
    let components = this.mogrify(target, ['Click']);
    components.Click.events.onClick.add(this.handler, this);
  }

  addText (target) {
    let components = this.mogrify(target, ['TextBox']);
  }

  nextMode () {
    let modes = Object.keys(this.modes);
    let i = modes.indexOf(this.currentMode);
    i = ((i+1)%modes.length);
    this.changeMode(modes[i]);
  }

  changeMode (mode) {
    this.currentMode = mode;
    this.cursor.frameName = this.modes[this.currentMode].frameName;
  }

}
