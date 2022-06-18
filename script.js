var wordToGuess = '';
var rowPos = 0;
var cellPos = 0;
var enteredWord = [];
var rows;
var gamesPlayed = 0;
var gamesWon = 0;
const timeInput = document.getElementById("time")
const timerStart = document.getElementById('timerStart')
const timerStop = document.getElementById('timerStop')
const timeDisplay = document.getElementById('timeDisplay')
var intervalID

function main() {
    rowPos = 0;
    cellPos = 0;
    enteredWord = [];

    // Select word to guess randomly from validWords array
    wordToGuess = validWords[Math.floor(Math.random() * validWords.length)];
    console.log(wordToGuess)

    // Set background colour to default on keyboard buttons
    for (const key of document.getElementsByClassName("key")) {
            key.style.backgroundColor = '#F5F5F5';        
    }

    // Render Wordle Grid HTML
    const main = document.querySelector(".main");
    while (main.firstChild) 
        main.removeChild(main.firstChild);

    for (let i = 0; i < 6; i++) {
        let row = document.createElement("div");
        row.className = "row";
        
        for (let j = 0; j < 5; j++) {
            let cell = document.createElement("div");
            cell.className = "cell";
            row.appendChild(cell);
        }
        main.appendChild(row);
    }

    // Initialise timer fields
    timeInput.value = "0";
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

            // Set colour on the keyboard
            for (const key of document.getElementsByClassName("key")) {
                if (key.textContent === enteredWord[i]) {
                    key.style.backgroundColor = letterColor;        
                }
            }
        }

        // Check the result
        if (greenCount === 5) {
            const msg = "You Won! Play again?";
            gamesWon++
            playAgan(msg);
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
    // Delay message display
    setTimeout(function() {
        if (confirm(msg)) 
            main();
    }, 100);
    gamesPlayed++;
    // Display stats
    document.getElementById('played').textContent = gamesPlayed;
    document.getElementById('won').textContent = gamesWon;
}

document.addEventListener('keyup', function(e) {
    keyPress(e.key);
});

document.getElementById('keyboard').addEventListener('click', function(e) {
    if (e.target.classList.contains("key")) {
        keyPress(e.target.textContent);
    }
});

// Stop automated zoom on mobile devices with double tap on keyboard
document.getElementById('keyboard').addEventListener('dblclick', function(e) {
    e.preventDefault();    
});

timerStart.addEventListener('click', function() {
    startTime()
});

timerStop.addEventListener('click', function() {
    clearInterval(intervalID) // Stop timer
    timeDisplay.textContent = 0
});

function startTime() {
    if (timeInput.value == 0) {
        return;
    }
    
    // Get time in seconds
    var timeLeft = timeInput.value * 60

    // Start interval and display remaining time every second
    intervalID = setInterval(function() { 
        timeLeft--
        timeDisplay.textContent = timeLeft
        if (timeLeft === 0) {
            clearInterval(intervalID) // Stop timer
            // Time is up
            const msg = "Time is up! Correct word is: " + wordToGuess + ". Play again?"
            playAgan(msg)
        }
    }, 1000);
}

function keyPress(key) {
    if (rowPos == 6)
        return;

    // Check for Enter key    
    if (cellPos === 5 && key === 'Enter') {
        // Check word
        if (checkWord()) {
            // Add some animation
            rows[rowPos].classList.add('blink_me')
            enteredWord = [];
            rowPos++;
            cellPos = 0;
        }
        return;
    }
    
    // Get cell (html) collection for the current row
    rows = document.getElementsByClassName('row');

    // Chekc for backspace/Delete button
    if (cellPos > 0 && cellPos < 6 && (key === 'Backspace' || key === 'Del')) {
        cellPos--;
        nextCell = rows[rowPos].children[cellPos];
        nextCell.textContent = '';                
        nextCell.classList.remove('blink_me')
        return;
    }

    // Only a-z characters accepted
    if (cellPos < 5 && key.match(/[a-z]/i) && key.length === 1) {
        // Populate next cell
        nextCell = rows[rowPos].children[cellPos];
        nextCell.textContent = key.toUpperCase();
        enteredWord[cellPos] = key.toUpperCase();
        // Add some animation
        nextCell.classList.add('blink_me')
        cellPos++
    }    
}

main()