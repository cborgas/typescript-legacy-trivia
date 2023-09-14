class Questions extends Array<string> {
}
const categories = ['Pop', 'Science', 'Sports', 'Rock'] as const;
type Category = typeof categories[number];

type Categories = Map<Category, Questions>;

type Player = {
    name: string;
    place: number;
    // purse: number;
    // inPenaltyBox: boolean;
};

export class Game {
    private players: Array<Player> = [];
    private purses: Array<number> = [];
    private inPenaltyBox: Array<boolean> = [];
    private currentPlayer: number = 0;
    private isGettingOutOfPenaltyBox: boolean = false;

    private categories: Categories = new Map<Category, Questions>();

    constructor() {
        categories.forEach((category) => {
            this.categories.set(category, []);
        });

        for (let i = 0; i < 50; i++) {
            this.categories.forEach((questions, category) => {
                questions.push(`${category} Question ${i}`);
            });
          }
    }

    public addPlayer(name: string): void {
        this.players.push({name, place: 0});
        this.purses[this.players.length] = 0;
        this.inPenaltyBox[this.players.length] = false;

        console.log(name + " was added");
        console.log("They are player number " + this.players.length);
    }

    public roll(roll: number) {
        console.log(this.getCurrentPlayer().name + " is the current player");
        console.log("They have rolled a " + roll);
    
        if (this.inPenaltyBox[this.currentPlayer]) {
          if (roll % 2 != 0) {
            this.isGettingOutOfPenaltyBox = true;
    
            console.log(this.getCurrentPlayer().name + " is getting out of the penalty box");
            this.move(roll);
    
            this.askQuestion();
          } else {
            console.log(this.getCurrentPlayer().name + " is not getting out of the penalty box");
            this.isGettingOutOfPenaltyBox = false;
          }
        } else {
    
          this.move(roll);
          this.askQuestion();
        }
    }

    private move(roll: number) {
        this.getCurrentPlayer().place += roll;
        if (this.getCurrentPlace() > 11) {
            this.getCurrentPlayer().place -= 12;
        }
    }

    private getCurrentPlayer(): Player {
        return this.players[this.currentPlayer];
    }

    private getCurrentPlace(): number {
        return this.getCurrentPlayer().place;
    }

    private askQuestion(): void {
        console.log(this.getCurrentPlayer().name + "'s new location is " + this.getCurrentPlace());
        console.log("The category is " + this.getCurrentCategory());
        console.log(this.categories.get(this.getCurrentCategory())?.shift());
    }

    private getCurrentCategory(): Category {
        const index = this.getCurrentPlace() % categories.length;
        if (categories[index] == undefined) {
            return 'Rock';
        } 

        return categories[index];
    }

    private checkIfPlayerHasWon(): boolean {
        return !(this.purses[this.currentPlayer] == 6)
    }

    public wrongAnswer(): boolean {
        console.log('Question was incorrectly answered');
        console.log(this.getCurrentPlayer().name + " was sent to the penalty box");
        this.inPenaltyBox[this.currentPlayer] = true;
    
        this.nextPlayer();
        return true;
    }

    public wasCorrectlyAnswered(): boolean {
        if (this.inPenaltyBox[this.currentPlayer]) {
            if (this.isGettingOutOfPenaltyBox) {
              console.log('Answer was correct!!!!');

              this.addCoin();
              var winner = this.checkIfPlayerHasWon();
              this.nextPlayer();
      
              return winner;
            } else {
              this.nextPlayer();
              return true;
            }
          } else {
            console.log("Answer was correct!!!!");
      
            this.addCoin();
            var winner = this.checkIfPlayerHasWon();
            this.nextPlayer();

            return winner;
          }
    }

    private addCoin(coins: number = 1): void {
        this.purses[this.currentPlayer] += coins;
        console.log(this.getCurrentPlayer().name + " now has " +
            this.purses[this.currentPlayer] + " Gold Coins.");
    }

    private nextPlayer(): void {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length)
            this.currentPlayer = 0;
    }
}
