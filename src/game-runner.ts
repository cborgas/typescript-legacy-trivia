import {Game} from './game';

export class GameRunner {
    public static main(random: () => number): void {
        const game = new Game();
        game.addPlayer("Chet");
        game.addPlayer("Pat");
        game.addPlayer("Sue");

        let notAWinner: boolean;
        do {
            game.roll(Math.floor(random() * 6) + 1);
        
            if (Math.floor(random() * 10) == 7) {
                notAWinner = game.wrongAnswer();
            } else {
                notAWinner = game.wasCorrectlyAnswered();
            }
        
        } while (notAWinner);
    }
}

GameRunner.main(Math.random);

  