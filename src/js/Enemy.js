import Resources from './Resources';
import Engine from './Engine';

// Enemies our player must avoid
export class Enemy {
  spriteLTR = 'images/enemy-bug-ltr.png';
  spriteRTL = 'images/enemy-bug-rtl.png';

  constructor (pos) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = pos.col * 101;
    this.y = pos.row * 80;
    this.isLeftToRight = true;
    this.speed = Enemy.getRandomSpeed();
  }

  static getRandomSpeed = () => {
    const currentClass = this;
    const randomSpeed = Math.random();
    return randomSpeed < 0.5 ? currentClass.getRandomSpeed() : randomSpeed;
  };

  get sprite () {
    return this.isLeftToRight ? this.spriteLTR : this.spriteRTL;
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update = (dt) => {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.isLeftToRight) {
      if (this.x < 5 * 101) this.x += 101 * dt * this.speed;
      else {
        // this.x = -101;
        this.isLeftToRight = false;
      }
    } else {
      if (this.x > -1 * 101) this.x -= 101 * dt * this.speed;
      else {
        // this.x = -101;
        this.isLeftToRight = true;
      }
    }
  };

  // Draw the enemy on the screen, required method for game
  render = () => {
    const imgElem = Resources.get(this.sprite);
    Engine.ctx.drawImage(imgElem, this.x, this.y);
  };
}

export default class EnemiesList extends Array {
  constructor (NUMS_OF_BUGS = 1) {
    super();
    for (let i = 0; i < NUMS_OF_BUGS; i++) {
      this.push(
        new Enemy({
          col: -1,
          row: i + 1,
        })
      );
    }
  }

  newEnemy = () => {
    this.push(
      new Enemy({
        col: -1,
        row: Math.round(Math.random() * 3) + 1,
      })
    );
  };
}
