var wordToGuess = ''
var rowPos = 0;
var cellPos = 0;
var enteredWord = []
var rows

function main() {
    rowPos = 0;
    cellPos = 0;
    enteredWord = [];

    // Select word to guess randomly from validWords array
    wordToGuess = validWords[Math.floor(Math.random() * validWords.length)];
    console.log(wordToGuess)

    // Render HTML
    const main = document.querySelector(".main")
    while (main.firstChild) 
        main.removeChild(main.firstChild);

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

function checkWord() {
    const guessArray = Array.from(wordToGuess);
    let greenCount = 0;

    // Verify that entered word is a valid word
    const word = enteredWord.join('')
    if (validWords.includes(word)) {    
        // Check each character in a word and assign colour
        for (let i = 0; i < enteredWord.length; i++) {
            let letterColor = '';
            let letterPos = guessArray.indexOf(enteredWord[i])

            if (letterPos === -1)
                letterColor = 'lightgrey';
            else {
                if (enteredWord[i] === guessArray[i]) {
                    letterColor = 'lightgreen';              
                    greenCount++;
                }  
                else {
                    letterColor = 'yellow';                
                }
            }
        
            // Set colour for the cell
            const currentCell = rows[rowPos].children[i];
            currentCell.style.backgroundColor = letterColor;        
        }

        // Check the result
        if (greenCount === 5) {
            const msg = "You Won! Play again?"
            playAgan(msg)
        }

        if (rowPos === 5) {
            const msg = "You Lost! Correct word is: " + wordToGuess + ". Play again?"
            playAgan(msg)
        }
        return true;
    }
    else {
        alert("Word not found!")    
        return false;
    }
}


function playAgan(msg) {
    setTimeout(function() {
        if (confirm(msg)) 
            main();
    }, 100);
}

document.addEventListener('keyup', function(e) {
    const key = e.key;
    if (rowPos == 6)
        return;

    if (cellPos === 5 && key === 'Enter') {
        // Check word
        if (checkWord()) {
            rows[rowPos].classList.add('blink_me')
            enteredWord = [];
            rowPos++;
            cellPos = 0;
        }
        return;
    }
    
    // Get cell (html) collection for the current row
    rows = document.getElementsByClassName('row');

    if (cellPos > 0 && cellPos < 6 && key === 'Backspace') {
        cellPos--;
        nextCell = rows[rowPos].children[cellPos];
        nextCell.textContent = '';                
        nextCell.classList.remove('blink_me')
        return;
    }
    if (cellPos < 5 && key.match(/[a-z]/i) && key.length === 1) {
        // Populate next cell
        nextCell = rows[rowPos].children[cellPos];
        nextCell.textContent = key.toUpperCase();
        enteredWord[cellPos] = key.toUpperCase();
        // Add some animation
        nextCell.classList.add('blink_me')
        cellPos++
    }
    
});

main()