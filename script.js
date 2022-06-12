var rowPos = 0;
var cellPos = 0;
var wordToGuess = 'HORSE'
var enteredWord = []
var rows

function main() {
    rowPos = 0;
    cellPos = 0;
    enteredWord = [];

    // Render HTML
    const main = document.querySelector(".main")

    for (let i = 0; i < 6; i++) {
        let row = document.createElement("div")
        row.className = "row"
        
        for (let j = 0; j < 5; j++) {
            let cell = document.createElement("div")
            cell.className = "cell"
            row.appendChild(cell)
        }

        main.appendChild(row)
    }
}

function checkWord(enteredArray) {
    const guessArray = Array.from(wordToGuess);
    let greenCount = 0;
    for (let i = 0; i < enteredArray.length; i++) {
        let letterColor = '';
        let letterPos = guessArray.indexOf(enteredArray[i])
        if (letterPos === -1)
            letterColor = 'grey';
        else {
            if (enteredArray[i] === guessArray[i]) {
                letterColor = 'green';              
                greenCount++;
            }  
            else {
                letterColor = 'yellow';                
            }
        }
        // Set correct colour on the cell

        const currentCell = rows[rowPos].children[i];
        currentCell.style.backgroundColor = letterColor;        
    }

    if (greenCount === 5) {
        setTimeout(function() {
            if (confirm("You Won!\nSelect OK to play again?")) {
                main();
            }
            else {
                return;
            }
        }, 100);
    }

    if (rowPos === 5)
    {
        setTimeout(function() {alert("You Lost!")}, 100);
        return;
    }
}

document.addEventListener('keyup', function(e) {
    const key = e.key;
    if (rowPos == 6)
        return;

    if (cellPos === 5 && key === 'Enter') {
        // Check word
        checkWord(enteredWord);
        enteredWord = [];
        rowPos++;
        cellPos = 0;
        return;
    }
    
    // Get cell (html) collection for the current row
    rows = document.getElementsByClassName('row');

    if (cellPos > 0 && cellPos < 6 && key === 'Backspace') {
        cellPos--;
        nextCell = rows[rowPos].children[cellPos];
        nextCell.textContent = '';                
        return;
    }
    if (cellPos < 5 && key.match(/[a-z]/i) && key.length === 1) {
        // Populate next cell
        nextCell = rows[rowPos].children[cellPos];
        nextCell.textContent = key.toUpperCase();
        enteredWord[cellPos] = key.toUpperCase();
        cellPos++
    }
    
});

main()