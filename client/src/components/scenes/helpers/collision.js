import Phaser from "phaser";

export function collisionDestroy(collisionObject, asteroid) {
  const explosion = this.add
    .sprite(asteroid.x, asteroid.y, "explosion")
    .setScale(5);
  explosion.play("explode");
  asteroid.disableBody(true, true);
  if (Phaser.Math.Between(1,90) === 1) {
    this.healthIcon = this.physics.add.sprite(asteroid.x, asteroid.y, "healthIcon").setScale(1)
    }
    if (Phaser.Math.Between(101,190) === 101) {
     
    this.invincibilityIcon = this.physics.add.sprite(asteroid.x, asteroid.y, "invincibilityIcon").setScale(5)
    }
  this.explosionSound = this.sound.add("explosionSound", { volume: 0.1 });
  this.explosionSound.play();
  const checkPlayerInvinc =
    collisionObject === this.player && this.invincibility;
  if (!checkPlayerInvinc || collisionObject === this.laser) {
    collisionObject.disableBody(true, true);
    collisionObject.enableBody(true, 800 / 2, 1000, true, true);
  }
  let x = Phaser.Math.Between(0, 580);
  asteroid.enableBody(true, x, 0, true, true);
  let xVel = Phaser.Math.Between(-100, 100);
  let yVel = Phaser.Math.Between(100, 150);
  asteroid.setVelocity(xVel, yVel);
}

//Function which dictates asteroid velocity after creation/re-enablement
export function setAsteroidCollision(asteroids) {
  asteroids.children.iterate(function (asteroid) {
    let xVel = Phaser.Math.Between(-100, 100);
    let yVel = Phaser.Math.Between(100, 150);
    asteroids.setVelocity(xVel, yVel);
  });
}

//Function which dictates enemy spaceship velocity after creation
export function setEnemyCollision(enemies) {
  enemies.children.iterate(function (enemy) {
    let xVel = Phaser.Math.Between(-100, 100);
    let yVel = Phaser.Math.Between(100, 150);
    enemies.setVelocity(xVel, yVel);
  });
}

//Function which handles game logic surrounding collision and destructions
export function collisionObtain(player, powerUp) {
  const sparkle = this.add
  .sprite(player.x, player.y, "sparkle")
  .setScale(1);
sparkle.play("sparks");
  this.coinSound = this.sound.add("coinSound", { volume: 0.1 });
  this.coinSound.play();
  let x = Phaser.Math.Between(0, 580);
  powerUp.enableBody(true, x, 0, true, true);
  let xVel = Phaser.Math.Between(100, 300);
  let yVel = Phaser.Math.Between(150, 400);
  powerUp.setVelocity(xVel, yVel);
}

export function playerCollisionAction() {
  if (!this.invincibility) {
    this.playerLives--;
    this.playerLifeLabel.text = this.playerLives;
  }
  if (this.invincibility) {
    this.playerScore += 50;
    this.playerScoreLabel.text = this.playerScore;
  }
}
