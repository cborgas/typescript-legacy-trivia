import {Game} from './game';

export class GameRunner {
    public static main(random: () => number): void {
        const game = new Game();
        game.addPlayer("Chet");
        game.addPlayer("Pat");
        game.addPlayer("Sue");

        let continuePlaying: boolean;
        do {
            continuePlaying = true;
            game.roll(Math.floor(random() * 6) + 1);
        
            if (Math.floor(random() * 10) == 7) {
                game.wrongAnswer();
            } else {
                continuePlaying = game.wasCorrectlyAnswered();
            }
        
        } while (continuePlaying);
    }
}

GameRunner.main(Math.random);

  