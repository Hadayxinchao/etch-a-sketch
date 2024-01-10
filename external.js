const container = document.querySelector(".container");

const settings = document.querySelector(".settings");
const settingsDoc = document.createElement("p");
settings.appendChild(settingsDoc);

const buttonChangeSizeGrid = document.createElement("button");
settings.appendChild(buttonChangeSizeGrid);
buttonChangeSizeGrid.textContent = "Change";

function makeGrid(sizeGrid = 16){
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    for (let i = 0; i < sizeGrid; i++){
        const row = document.createElement("div");
        container.appendChild(row).className = 'gridRow';
        for (let j = 0; j < sizeGrid; j++){
            let newCell = document.createElement("div");
            newCell.style.minWidth = `${500/sizeGrid}px`;
            row.appendChild(newCell).className = 'cell';
        }
    }
    let cells = document.querySelectorAll(".cell")
    for (const cell of cells){
        cell.addEventListener("mouseover", function (){
            let x = Math.floor(Math.random() * 256);
            let y = Math.floor(Math.random() * 256);
            let z = Math.floor(Math.random() * 256);
            cell.style.backgroundColor = `rgb(${x}, ${y}, ${z})`;
        });
    }

}
makeGrid();

buttonChangeSizeGrid.addEventListener("click", function () {
    let inputSize = parseInt(document.querySelector("#sizeOfGrid").value);
    if (Number.isInteger(inputSize)){
        if (inputSize < 0 || inputSize > 100){
            settingsDoc.textContent = "Please input a size from 1 -> 100";
        }
        else {
            makeGrid(inputSize);
        }
    }
    else {
        settingsDoc.textContent = "Please input a size from 1 -> 100";
    }
        
});



