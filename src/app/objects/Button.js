/*
 * Button
 * ============================================================================
 * @extends Phaser.Button
 * Create a new button and add it to the world
 */

const styles = {
  none: {
    sheet:  undefined,
    over:   undefined,
    out:    undefined,
    down:   undefined
  }
}

class Button extends Phaser.Button {
  constructor (...args) {
    // get the button style
    const { key: sheet, overFrame: over, outFrame: out, downFrame: down } = styles[args.style];
    // create the button
    super(args.game, args.x, args.y, key, args.callback, args.callbackContext, overFrame, outFrame, downFrame, upFrame);
    // add to world
    this.game.add.existing(this);
    // center of button
    let centerX = this.x + this.width/2;
    let centerY = this.y + this.height/2;

    if (text) {
     // create the label for the button
     let label = this.game.add.retroFont(this.font.key, this.font.width, this.font.height, this.font.chars, this.font.charsPerRow, this.font.xSpacing, this.font.ySpacing, this.font.xOffset, this.font.yOffset);
     // this font supports lowercase chars
     label.autoUpperCase = this.font.upperCaseOnly;
     label.text = text;
     let image = this.game.add.image(centerX, centerY, label);
     image.anchor.set(0.5, 0.5);
     this.add(image);
    }

    return button;
  }

  over () {
    this.game.add.tween(this.startButton.scale)
      .to({
        x: 1.3,
        y: 1.3
      }, 300, Phaser.Easing.Exponential.Out, true);
    this.game.sound.play('select'); // audio file
  }

  out () {
    this.game.add.tween(this.startButton.scale)
      .to({
        x: 1,
        y: 1
      }, 300, Phaser.Easing.Exponential.Out, true);
  }
}
