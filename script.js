var rowPos = 0;
var cellPos = 0;

function main() {
    rowPos = 0;
    cellPos = 0;
    
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

main()

document.addEventListener('keyup', function(e) {
    const key = e.key;
    if (cellPos === 5 && key === 'Enter') {
        // Check word
        rowPos++;
        cellPos = 0;
        return;
    }
    
    if (rowPos < 6) {
        rows = document.getElementsByClassName('row');
    }

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
        cellPos++
    }

});