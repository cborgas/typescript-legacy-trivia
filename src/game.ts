class Questions extends Array<string> {
}
const categories = ['Pop', 'Science', 'Sports', 'Rock'] as const;
type Category = typeof categories[number];

type Categories = Map<Category, Questions>;

class Player {
    constructor(
        public name: string,
        public place: number = 0,
        public purse: number = 0,
        public inPenaltyBox: boolean = false
    ) {}

    public move(roll: number) {
        this.place = (this.place + roll) % 12;
    }

    public isWinner(): boolean {
        return !(this.purse == 6)
    }
};

export class Game {
    private players: Array<Player> = [];
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
        this.players.push(new Player(name));

        console.log(name + " was added");
        console.log("They are player number " + this.players.length);
    }

    public roll(roll: number) {
        const player = this.getCurrentPlayer();
        console.log(player.name + " is the current player");
        console.log("They have rolled a " + roll);
    
        if (player.inPenaltyBox) {
          if (roll % 2 != 0) {
            this.isGettingOutOfPenaltyBox = true;
    
            console.log(player.name + " is getting out of the penalty box");
            player.move(roll);
    
            this.askQuestion();
          } else {
            console.log(player.name + " is not getting out of the penalty box");
            this.isGettingOutOfPenaltyBox = false;
          }
        } else {
    
          player.move(roll);
          this.askQuestion();
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

    public wrongAnswer(): void {
        console.log('Question was incorrectly answered');
        console.log(this.getCurrentPlayer().name + " was sent to the penalty box");
        this.getCurrentPlayer().inPenaltyBox = true;
    
        this.nextPlayer();
    }

    public wasCorrectlyAnswered(): boolean {
        const player = this.getCurrentPlayer();

        if (player.inPenaltyBox && !this.isGettingOutOfPenaltyBox) {
            this.nextPlayer();
            return true;
        }

        console.log("Answer was correct!!!!");
      
        this.addCoin(player);
        this.nextPlayer();

        return player.isWinner();
    }

    private addCoin(player: Player, coins: number = 1): void {
        player.purse += coins;
        console.log(player.name + " now has " +
            player.purse + " Gold Coins.");
    }

    private nextPlayer(): void {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length)
            this.currentPlayer = 0;
    }
}
