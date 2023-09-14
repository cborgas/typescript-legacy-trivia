import { GameRunner } from '../src/game-runner';
import * as fs from 'fs';
import { seedRandom } from './seed';

let output: any[] = [];
console.log = function(s: any) {
    output.push(s);
}

describe('The game runner', () => {
  beforeEach(() => {
    output = [];
  });

  const seeds = [1234, 12345, 123456, 5075965965];

  it.each(seeds)('Golden Master seed %i matches the game output with the same seed', (seed) => {
    const goldenMaster = fs.readFileSync(`tests/golden-master/seed-${seed}.txt`, 'utf8');

    runGameWithSeed(seed);

    const expectedLines = goldenMaster.trim().split('\n');
    expectedLines.forEach((expectedLine, index) => {
      expect(output[index]).toBe(expectedLine);
    });
  });
});

function runGameWithSeed(seed: number) {
  GameRunner.main(seedRandom(seed));
}
