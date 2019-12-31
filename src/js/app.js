import Resources from './Resources';
import Engine from './Engine';
import EnemiesList from './Enemy';
import Player from './Player';

window.document.addEventListener('DOMContentLoaded', () => {
  /* Go ahead and load all of the images we know we're going to need to
   * draw our game level. Then set init as the callback method, so that when
   * all of these images are properly loaded our game will start.
   */
  Resources.load([
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    'images/enemy-bug-ltr.png',
    'images/enemy-bug-rtl.png',
    'images/char-boy.png',
  ]);
  const NUMS_OF_BUGS = Math.floor(Math.random() * 4) || 1;
  const allEnemies = new EnemiesList(NUMS_OF_BUGS);
  const player = new Player();
  const engine = new Engine([allEnemies, player]);

  Resources.onReady(() => engine.init(allEnemies, player));
});
