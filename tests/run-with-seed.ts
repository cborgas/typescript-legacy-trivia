import { GameRunner } from '../src/game-runner';
import * as fs from 'fs';
import { seedRandom } from './seed';

const seedInput = process.argv[2];
if (!seedInput) {
  console.error('Please provide a seed');
  process.exit(1);
}

const seed = parseInt(seedInput);

// create new goldenmaster file
const goldenMaster = fs.createWriteStream(`tests/golden-master/seed-${seed}.txt`);

// redirect console.log to goldenmaster file
console.log = function(s: any) {
  goldenMaster.write(s + '\n');
}

// run game with seed
GameRunner.main(seedRandom(seed));
