/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make
 * writing app.js a little simpler to work with.
 */
import Resources from './Resources';

/* Predefine the variables we'll be using within this scope,
 * create the canvas element, grab the 2D context for that canvas
 * set the canvas element's height/width and add it to the DOM.
 */
const doc = window.document;
const canvas = doc.createElement('canvas');
const ctx = canvas.getContext('2d');
const scoreText = doc.querySelector('.score-point');
const addMoreBtn = doc.querySelector('.add-more-bugs');
const newGameBtn = doc.querySelector('.new-game');

canvas.width = 505;
canvas.height = 606;
doc.body.appendChild(canvas);

/* This function serves as the kickoff point for the game loop itself
 * and handles properly calling the update and render methods.
 */
class Engine {
  constructor ([allEnemies, player] = []) {
    this.allEnemies = allEnemies;
    this.player = player;
    this.entities = [this.allEnemies, this.player];
    this.lastTime = Date.now();
    this.score = 0;
  }

  static get ctx () {
    return ctx;
  }

  main () {
    /* Get our time delta information which is required if your game
     * requires smooth animation. Because everyone's computer processes
     * instructions at different speeds we need a constant value that
     * would be the same for everyone (regardless of how fast their
     * computer is) - hurray time!
     */
    var now = Date.now();
    var dt = (now - this.lastTime) / 1000.0;

    /* Call our update/render functions, pass along the time delta to
     * our update function since it may be used for smooth animation.
     */
    this.update(dt);
    this.render();

    this.checkCollisions();

    /* Set our lastTime variable which is used to determine the time delta
     * for the next time this function is called.
     */
    this.lastTime = now;

    /* Use the browser's requestAnimationFrame function to call this
     * function again as soon as the browser is able to draw another frame.
     */
    if (!this.isStop) {
      this.animationFrameRequestId = window.requestAnimationFrame(() => {
        this.main();
      });
    }
  }

  checkCollisions () {
    if (this.player.y === 0) {
      this.userWon();
    }

    const realisticWidthAdjustment = 25;
    const player = this.player;
    this.allEnemies.forEach((enemy) => {
      if (enemy.y === player.y) {
        if (
          (enemy.x < player.x + 101 - realisticWidthAdjustment && enemy.x > player.x) ||
          (enemy.x + 101 - realisticWidthAdjustment > player.x && enemy.x < player.x)
        ) {
          this.userLost();
        }
      }
    });
  }

  userScore (points = 1) {
    this.score += points;
    this.player.resetPosition();
    this.renderScore();
  }

  renderScore () {
    scoreText.textContent = this.score;
  }

  userWon () {
    this.userScore();
    // if (window.confirm('You won!! Do you want to continue playing?')) {
    //   this.userScore();
    // } else {
    //   this.stop();
    // }
  }

  userLost () {
    if (window.confirm('You lost! Do you want to play again?')) this.reset();
    else this.stop();
  }

  /* This function does some initial setup that should only occur once,
   * particularly setting the lastTime variable that is required for the
   * game loop.
   */
  init = () => {
    this.reset();
    this.lastTime = Date.now();
    this.main();
  };

  /* This function is called by main (our game loop) and itself calls all
   * of the functions which may need to update entity's data. Based on how
   * you implement your collision detection (when two entities occupy the
   * same space, for instance when your character should die), you may find
   * the need to add an additional function call here. For now, we've left
   * it commented out - you may or may not want to implement this
   * functionality this way (you could just implement collision detection
   * on the entities themselves within your app.js file).
   */
  update = (dt) => {
    this.updateEntities(dt);
    // this.checkCollisions();
  };

  /* This is called by the update function and loops through all of the
   * objects within your allEnemies array as defined in app.js and calls
   * their update() methods. It will then call the update function for your
   * player object. These update methods should focus purely on updating
   * the data/properties related to the object. Do your drawing in your
   * render methods.
   */
  updateEntities = (dt) => {
    this.allEnemies.forEach(function (enemy) {
      enemy.update(dt);
    });
    this.player.update();
  };

  /* This function initially draws the "game level", it will then call
   * the renderEntities function. Remember, this function is called every
   * game tick (or loop of the game engine) because that's how games work -
   * they are flipbooks creating the illusion of animation but in reality
   * they are just drawing the entire screen over and over.
   */
  render = () => {
    /* This array holds the relative URL to the image used
     * for that particular row of the game level.
     */
    // debugger;
    var rowImages = [
      'images/water-block.png', // Top row is water
      'images/stone-block.png', // Row 1 of 3 of stone
      'images/stone-block.png', // Row 2 of 3 of stone
      'images/stone-block.png', // Row 3 of 3 of stone
      'images/grass-block.png', // Row 1 of 2 of grass
      'images/grass-block.png', // Row 2 of 2 of grass
    ];
    var numRows = 6;
    var numCols = 5;
    var row;
    var col;

    // Before drawing, clear existing canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* Loop through the number of rows and columns we've defined above
     * and, using the rowImages array, draw the correct image for that
     * portion of the "grid"
     */
    for (row = 0; row < numRows; row++) {
      for (col = 0; col < numCols; col++) {
        /* The drawImage function of the canvas' context element
         * requires 3 parameters: the image to draw, the x coordinate
         * to start drawing and the y coordinate to start drawing.
         * We're using our Resources helpers to refer to our images
         * so that we get the benefits of caching these images, since
         * we're using them over and over.
         */
        ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
      }
    }

    this.renderEntities();
    this.renderScore();
  };

  /* This function is called by the render function and is called on each game
   * tick. Its purpose is to then call the render functions you have defined
   * on your enemy and player entities within app.js
   */
  renderEntities = () => {
    /* Loop through all of the objects within the allEnemies array and call
     * the render function you have defined.
     */
    this.allEnemies.forEach(function (enemy) {
      enemy.render();
    });
    this.player.render();
  };

  /* This function does nothing but it could have been a good place to
   * handle game reset states - maybe a new game menu or a game over screen
   * those sorts of things. It's only called once by the init() method.
   */
  reset = () => {
    this.score = 0;
    if (this.player) this.player.resetPosition();

    canvas.style.opacity = 1;
    doc.addEventListener('keydown', this.handleKeyInput);
    addMoreBtn.addEventListener('click', this.handleAddingBugs);
    newGameBtn.removeEventListener('click', this.init);
    newGameBtn.style.display = 'none';
    this.isStop = false;
  };

  stop () {
    // write user's score to HTML
    // doc.body.removeChild(canvas);
    canvas.style.opacity = 0.5;
    window.cancelAnimationFrame(this.animationFrameRequestId);
    doc.removeEventListener('keydown', this.handleKeyInput);
    addMoreBtn.removeEventListener('click', this.handleAddingBugs);
    addMoreBtn.style.display = 'none';
    newGameBtn.style.display = 'inline-block';
    newGameBtn.addEventListener('click', this.init);
    this.isStop = true;
  }

  handleKeyInput = (e) => {
    var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
    };

    this.player.handleInput(allowedKeys[e.keyCode]);
  };

  handleAddingBugs = () => {
    this.allEnemies.newEnemy();
  };
}

export default Engine;
