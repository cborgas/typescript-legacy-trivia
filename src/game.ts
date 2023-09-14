class Questions extends Array<string> {
}
const categories = ['Pop', 'Science', 'Sports', 'Rock'] as const;
type Category = typeof categories[number];

type Categories = Map<Category, Questions>;

type Player = {
    name: string;
    // place: number;
    // purse: number;
    // inPenaltyBox: boolean;
};

export class Game {
    private players: Array<Player> = [];
    private places: Array<number> = [];
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

    public add(name: string): boolean {
        this.players.push({name});
        this.places[this.howManyPlayers()] = 0;
        this.purses[this.howManyPlayers()] = 0;
        this.inPenaltyBox[this.howManyPlayers()] = false;

        console.log(name + " was added");
        console.log("They are player number " + this.players.length);

        return true;
    }

    private howManyPlayers(): number {
        return this.players.length;
    }

    public roll(roll: number) {
        console.log(this.getCurrentPlayer() + " is the current player");
        console.log("They have rolled a " + roll);
    
        if (this.inPenaltyBox[this.currentPlayer]) {
          if (roll % 2 != 0) {
            this.isGettingOutOfPenaltyBox = true;
    
            console.log(this.getCurrentPlayer() + " is getting out of the penalty box");
            this.move(roll);
    
            this.askQuestion();
          } else {
            console.log(this.getCurrentPlayer() + " is not getting out of the penalty box");
            this.isGettingOutOfPenaltyBox = false;
          }
        } else {
    
          this.move(roll);
          this.askQuestion();
        }
    }

    private move(roll: number) {
        this.places[this.currentPlayer] = this.getCurrentPlace() + roll;
        if (this.getCurrentPlace() > 11) {
            this.places[this.currentPlayer] = this.getCurrentPlace() - 12;
        }
    }

    private getCurrentPlayer() {
        return this.players[this.currentPlayer].name;
    }

    private getCurrentPlace() {
        return this.places[this.currentPlayer];
    }

    private askQuestion(): void {
        console.log(this.getCurrentPlayer() + "'s new location is " + this.getCurrentPlace());
        console.log("The category is " + this.currentCategory());
        console.log(this.categories.get(this.currentCategory())?.shift());
    }

    private currentCategory(): Category {
        if (this.getCurrentPlace() == 0)
            return 'Pop';
        if (this.getCurrentPlace() == 4)
            return 'Pop';
        if (this.getCurrentPlace() == 8)
            return 'Pop';
        if (this.getCurrentPlace() == 1)
            return 'Science';
        if (this.getCurrentPlace() == 5)
            return 'Science';
        if (this.getCurrentPlace() == 9)
            return 'Science';
        if (this.getCurrentPlace() == 2)
            return 'Sports';
        if (this.getCurrentPlace() == 6)
            return 'Sports';
        if (this.getCurrentPlace() == 10)
            return 'Sports';
        return 'Rock';
    }

    private didPlayerWin(): boolean {
        return !(this.purses[this.currentPlayer] == 6)
    }

    public wrongAnswer(): boolean {
        console.log('Question was incorrectly answered');
        console.log(this.getCurrentPlayer() + " was sent to the penalty box");
        this.inPenaltyBox[this.currentPlayer] = true;
    
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length)
            this.currentPlayer = 0;
        return true;
    }

    public wasCorrectlyAnswered(): boolean {
        if (this.inPenaltyBox[this.currentPlayer]) {
            if (this.isGettingOutOfPenaltyBox) {
              console.log('Answer was correct!!!!');
              this.purses[this.currentPlayer] += 1;
              console.log(this.getCurrentPlayer() + " now has " +
              this.purses[this.currentPlayer] + " Gold Coins.");
      
              var winner = this.didPlayerWin();
              this.currentPlayer += 1;
              if (this.currentPlayer == this.players.length)
                this.currentPlayer = 0;
      
              return winner;
            } else {
              this.currentPlayer += 1;
              if (this.currentPlayer == this.players.length)
                this.currentPlayer = 0;
              return true;
            }
          } else {
            console.log("Answer was corrent!!!!");
      
            this.purses[this.currentPlayer] += 1;
            console.log(this.getCurrentPlayer() + " now has " +
                this.purses[this.currentPlayer] + " Gold Coins.");
      
            var winner = this.didPlayerWin();
      
            this.currentPlayer += 1;
            if (this.currentPlayer == this.players.length)
                this.currentPlayer = 0;
      
            return winner;
          }
    }

}
