var rowNumner = 0;
var cellNumber = 0;

function main() {
    rowNumner = 0;
    cellNumber = 0;
    
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
    // Populate next cell
    if (e.key === 'Enter') {
        // Check word
        rowNumner++;
        cellNumber = 0;
        return;
    }
    
    if (rowNumner < 6)
        rows = document.getElementsByClassName('row');

    if (cellNumber < 5) {
        if (e.key === 'Backspace') {
            if (cellNumber !== 0) {
                cellNumber--;
                nextCell = rows[rowNumner].children[cellNumber];
                nextCell.textContent = '';                
            }
        }

        nextCell = rows[rowNumner].children[cellNumber];
        nextCell.textContent = e.key;
        cellNumber++
    }


});