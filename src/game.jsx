import React from 'react';
import '../global.css';
import { GAME_WON, GAME_ESCAPED, GAME_FAIL, IS_DEV_ENVIRONMENT } from './constants';

function GamePlay({ onButtonClick, username }) {
  
  const combatOptions = ['attack', 'run', 'heal'];
  const tileOptions = [['forward'], ['left', 'right'], ['forward', 'left', 'right'], ['forward', 'left'], ['forward', 'right'], ['left'], ['right']];
  const approachBossOptions = ['fight the boss', 'continue exploring'];

  const enemy = {
    health: 70,
    attack: 7,
    defense: 4
  };

  const playerTotalStats = {
    health: 100,
    attack: 10,
    defense: 5,
    coins: 3
  };

  const boss = {  
    health: 200,
    attack: 10,
    defense: 5
  };

  let player = playerTotalStats;
  let currentEnemy = enemy;
  let isBoss = false;
  let roomsVisited = 0;
  let isOKToFaceBoss = true;

  const bossRewards = 10 + Math.floor(Math.random() * 10);
  const [playerHealth, setPlayerHealth] = React.useState(player.health);
  const [enemyHealth, setEnemyHealth] = React.useState(enemy.health);
  const [playerCoins, setPlayerCoins] = React.useState(player.coins);
  const [currentRoomType, setCurrentRoomType] = React.useState(0);
  const [currentOptions, setCurrentOptions] = React.useState(tileOptions[0]);

  function attackEnemy() {
    const damage = player.attack - currentEnemy.defense / 2;
    const enemyHealthAfterAttack = enemyHealth - damage;
    setEnemyHealth(enemyHealthAfterAttack);
  }

  function attackPlayer() {
    const damage = currentEnemy.attack - player.defense / 2;
    const playerHealthAfterAttack = playerHealth - damage;
    setEnemyHealth(playerHealthAfterAttack);
  }

  function heal() { 
    const healedHealth = playerHealth + 10;
    setPlayerHealth(healedHealth);
    setPlayerCoins(playerCoins - 1);
  }

  function checkDefeatEnemy() {
    if (currentEnemy.health <= 0) {
      if (isBoss) {
        exitDungeon(true);
      } else {
        setPlayerHealth(player.health);
        setEnemyHealth(enemy.health);
        player.coins += Math.floor(Math.random() * 2) + 1;
      }
    }
  }

  function createNextRoom() {
    roomsVisited++;
    if (roomsVisited >= 10 && isOKToFaceBoss) {
      setCurrentOptions(approachBossOptions);
    } else {
      setCurrentRoomType(Math.floor(Math.random() * 7));
      currentEnemy = enemy;
    }
  }

  function combat(isplayerAttacking){
    if (isplayerAttacking) {
      attackEnemy();
      setEnemyHealth(currentEnemy.health);
    } else {
      heal();
      setPlayerHealth(player.health);
    }
    checkDefeatEnemy();
    attackPlayer();
    checkPlayerDefeat();
  }

  function checkPlayerDefeat() {
    if (player.health <= 0) {
      onButtonClick(GAME_FAIL);
    }
  }

  function startBossFight() {
    currentEnemy = boss;
    isBoss = true;
    setCurrentOptions(combatOptions);
  }

  async function updateScore(score) {
    const newScore = { name: username, score: score };
    let fullEndpoint = '/api/score'
    if (IS_DEV_ENVIRONMENT){
      fullEndpoint = `http://localhost:3000/api/score`
    }

    await fetch(fullEndpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newScore),
    });
  }


  function exitDungeon(defeatedBoss = false) {
    // set player coins off as score player.coins ;
    // send score to server
    if (defeatedBoss) {
      player.coins += bossRewards;
      updateScore(player.coins);
      onButtonClick(GAME_WON);
    } else {
      updateScore(player.coins);
      onButtonClick(GAME_ESCAPED);
    }
  }

  function doAction(action) {
    switch (action) {
      case 'attack':
        combat(true);
        break;
      case 'heal':
        combat(false);
        break;
      case 'continue exploring':
        isOKToFaceBoss = false;
        createNextRoom();
        isOKToFaceBoss = true;
        break;
      case 'run':
      case 'forward':
      case 'left':
      case 'right':
        createNextRoom();
        break;
      case 'fight the boss':
        startBossFight();
        break;
      default:
        break;
    }
  }

  return (
    <div className='centered content'>
      <div>coins: {playerCoins}</div>
      <div>{playerHealth} hp</div>
      <div>
        <div>
          <div>enemy</div>
          <div>player</div>
        </div>
        <div>
          {tileOptions.map((option, index) => {
            <button key={index} onClick={() => doAction(option)}>{option}</button>
          })}
          <button onClick={() => exitDungeon() }> exit dungeon with current coins </button>
        </div>
      </div>

      <button onClick={() => exitDungeon(true)}>finish game</button>
    </div>
  );
}

export default GamePlay;