import Resources from './Resources';
import Engine from './Engine';

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
export default class Player {
  static START_POS = {
    x: 2 * 101,
    y: 5 * 80,
  };

  constructor () {
    this.sprite = 'images/char-boy.png';
    this.x = Player.START_POS.x;
    this.y = Player.START_POS.y;
  }

  resetPosition = () => {
    this.x = Player.START_POS.x;
    this.y = Player.START_POS.y;
  };

  update = (direction) => {
    switch (direction) {
    case 'left':
      if (this.x > 0) this.x -= 101;
      break;
    case 'right':
      if (this.x < 4 * 101) this.x += 101;
      break;
    case 'up':
      if (this.y > 0) this.y -= 80;
      break;
    case 'down':
      if (this.y < 5 * 80) this.y += 80;
      break;
    }
  };

  render = () => {
    Engine.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  handleInput = (direction) => {
    this.update(direction);
  };
}
