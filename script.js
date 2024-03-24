const prompt = require("prompt-sync")();


const ROWS = 3;
const COLS = 3;

const  SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8

}
const  SYMBOL_VALUES = {
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2

}

const deposit = () => {
    while(true){
    const depositAmount = prompt("Enter a deposit Amount: ");
    const NumberdepositAmount = parseFloat(depositAmount);
    if(isNaN(NumberdepositAmount) || NumberdepositAmount <=0){
        console.log("invalid deposit amount, try again");
    }else
    {
        return NumberdepositAmount;
    }
}
};


const getNumberofLines = () => {
    while(true){
        const Lines = prompt("Enter number of Lines to bet on (1-3): ");
        const NumberofLines = parseFloat(Lines);
        if(isNaN(NumberofLines) || NumberofLines <=0 || NumberofLines >3){
            console.log("invalid Number of Lines, try again");
        }else
        {
            return NumberofLines;
        }
    }
};
 
const getBet = (balance , Lines) => {
    while(true){
    const Bet = prompt("Enter the bet per line: ");
    const NumberBet = parseFloat(Bet);
    if(isNaN(NumberBet) || NumberBet <=0 || NumberBet > balance / Lines){
        console.log("invalid Bet, try again");
    }
    else{
        return NumberBet;
    }
}
};

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0; i< count; i++){
            symbols.push(symbol);
        }
    }
    const reels = [];
    for(let i=0; i<COLS;i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j=0; j<ROWS;j++){
                const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                const selectedSymbols = reelSymbols[randomIndex];
                reels[i].push(selectedSymbols);
                reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};
const transpose = (reels) => {
        const rows = [];

        for(let i=0; i<ROWS; i++){
            rows.push([]);
            for(let j=0; j<COLS; j++){
                    rows[i].push(reels[j][i]);
            }
        }
        return rows;
};

const printRows = (rows) => {
    for(const row of rows){
        let rowString = "";
        for( const [i, symbol] of row.entries()){
            rowString += symbol
            if(i != row.length - 1 ) 
            {
                rowString += " | "
            }
        }
        console.log(rowString);
    }
};

const getwinning = (rows, bet, Lines) => {
    let winnings = 0;

    for(let row = 0; row<Lines; row++){
        const symbols = rows[row];
        let AllSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                AllSame = false;
                break;
            }
        }
        if(AllSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings;
};

const game = () =>{
let balance = deposit();

while(true){
    console.log("you have balance of $" +balance);
const NumberofLines = getNumberofLines();
const bet = getBet(balance , NumberofLines);

balance -= bet* NumberofLines;

let reels = spin();
const rows = transpose(reels);
// console.log(reels);
// console.log(rows);
printRows(rows);
let winnings = getwinning(rows, bet, NumberofLines);

balance += winnings; 

console.log("you won, $" + winnings.toString());

if (balance<=0)
{
    console.log("you ran out of money!");
    break;
}
    const playagain = prompt("Do you want to play again(y/n)! ")
    if (playagain != "y")
    break;
}
};

game();