import { GameRunner } from '../src/game-runner';
import * as fs from 'fs';
import { seedRandom } from './seed';
import { Game } from '../src/game';

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

describe('The game', () => {
    beforeEach(() => {
        output = [];
      });

    it('should be able to add players', () => {
        const game = new Game();
        game.addPlayer("Sue");

        expect(output).toEqual([
            "Sue was added",
            "They are player number 1"
        ]);
    });

    it('should be able to roll and move', () => {
        const game = new Game();
        game.addPlayer("Pat");

        game.roll(1);

        expect(output).toEqual([
            "Pat was added",
            "They are player number 1",
            "Pat is the current player",
            "They have rolled a 1",
            "Pat's new location is NaN",
            "The category is Rock",
            "Rock Question 0"
        ]);
    });

    it('should be sent to penalty box on wrong answer', () => {
        const game = new Game();
        game.addPlayer("Chet");

        game.wrongAnswer();

        expect(output).toEqual([
            "Chet was added",
            "They are player number 1",
            "Question was incorrectly answered",
            "Chet was sent to the penalty box"
        ]);
    });

    it('should add coin on correct answer', () => {
        const game = new Game();
        game.addPlayer("Pat");

        game.roll(1);
        game.wasCorrectlyAnswered();

        expect(output).toEqual([
            "Pat was added",
            "They are player number 1",
            "Pat is the current player",
            "They have rolled a 1",
            "Pat's new location is NaN",
            "The category is Rock",
            "Rock Question 0",
            "Answer was correct!!!!",
            "Pat now has NaN Gold Coins.",
        ]);
    });
});
