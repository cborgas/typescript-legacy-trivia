class Questions extends Array<string> {
}
const categories = ['Pop', 'Science', 'Sports', 'Rock'] as const;
type Category = typeof categories[number];

type Categories = Map<Category, Questions>;

export class Game {

    private players: Array<string> = [];
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
        this.players.push(name);
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
        console.log(this.players[this.currentPlayer] + " is the current player");
        console.log("They have rolled a " + roll);
    
        if (this.inPenaltyBox[this.currentPlayer]) {
          if (roll % 2 != 0) {
            this.isGettingOutOfPenaltyBox = true;
    
            console.log(this.players[this.currentPlayer] + " is getting out of the penalty box");
            this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
            if (this.places[this.currentPlayer] > 11) {
              this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
            }
    
            console.log(this.players[this.currentPlayer] + "'s new location is " + this.places[this.currentPlayer]);
            console.log("The category is " + this.currentCategory());
            this.askQuestion();
          } else {
            console.log(this.players[this.currentPlayer] + " is not getting out of the penalty box");
            this.isGettingOutOfPenaltyBox = false;
          }
        } else {
    
          this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
          if (this.places[this.currentPlayer] > 11) {
            this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
          }
    
          console.log(this.players[this.currentPlayer] + "'s new location is " + this.places[this.currentPlayer]);
          console.log("The category is " + this.currentCategory());
          this.askQuestion();
        }
    }

    private askQuestion(): void {
        console.log(this.categories.get(this.currentCategory())?.shift());
    }

    private currentCategory(): Category {
        if (this.places[this.currentPlayer] == 0)
            return 'Pop';
        if (this.places[this.currentPlayer] == 4)
            return 'Pop';
        if (this.places[this.currentPlayer] == 8)
            return 'Pop';
        if (this.places[this.currentPlayer] == 1)
            return 'Science';
        if (this.places[this.currentPlayer] == 5)
            return 'Science';
        if (this.places[this.currentPlayer] == 9)
            return 'Science';
        if (this.places[this.currentPlayer] == 2)
            return 'Sports';
        if (this.places[this.currentPlayer] == 6)
            return 'Sports';
        if (this.places[this.currentPlayer] == 10)
            return 'Sports';
        return 'Rock';
    }

    private didPlayerWin(): boolean {
        return !(this.purses[this.currentPlayer] == 6)
    }

    public wrongAnswer(): boolean {
        console.log('Question was incorrectly answered');
        console.log(this.players[this.currentPlayer] + " was sent to the penalty box");
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
              console.log(this.players[this.currentPlayer] + " now has " +
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
            console.log(this.players[this.currentPlayer] + " now has " +
                this.purses[this.currentPlayer] + " Gold Coins.");
      
            var winner = this.didPlayerWin();
      
            this.currentPlayer += 1;
            if (this.currentPlayer == this.players.length)
                this.currentPlayer = 0;
      
            return winner;
          }
    }

}
