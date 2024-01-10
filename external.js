const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentMode (newMode) {
    activateButton(newMode);
    currentMode = newMode;
}

function setCurrentSize (newSize) {
    currentSize = newSize;
}

const colorPicker = document.querySelector("#colorPicker");
const colorBtn = document.querySelector('#colorBtn')
const rainbowBtn = document.querySelector('#rainbowBtn')
const eraserBtn = document.querySelector('#eraserBtn')
const clearBtn = document.querySelector('#clearBtn')
const sizeValue = document.querySelector('#sizeValue')
const sizeSlider = document.querySelector('#sizeSlider')
const container = document.querySelector(".container");

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = (e) => setCurrentMode('color');
rainbowBtn.onclick = (e) => setCurrentMode('rainbow');
eraserBtn.onclick = (e) => setCurrentMode('eraser');
clearBtn.onclick = (e) => reloadGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function changeSize(value){
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`;
}

function reloadGrid() {
    clearGrid();
    setupGrid(currentSize);
}

function clearGrid () {
    container.innerHTML = '';
}

function setupGrid(size){
    for (let i = 0; i < size; i++){
        const row = document.createElement("div");
        container.appendChild(row).className = 'gridRow';
        for (let j = 0; j < size; j++){
            let newCell = document.createElement("div");
            newCell.style.minWidth = `${500/size}px`;
            newCell.addEventListener('mouseover', changeColor);
            newCell.addEventListener('mousedown', changeColor);
            row.appendChild(newCell).className = 'cell';
        }
    }
}

function changeColor (e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = "#fefefe";
    }
}

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
      rainbowBtn.classList.remove('active')
    } else if (currentMode === 'color') {
      colorBtn.classList.remove('active')
    } else if (currentMode === 'eraser') {
      eraserBtn.classList.remove('active')
    }
  
    if (newMode === 'rainbow') {
      rainbowBtn.classList.add('active')
    } else if (newMode === 'color') {
      colorBtn.classList.add('active')
    } else if (newMode === 'eraser') {
      eraserBtn.classList.add('active')
    }
}

window.onload = () => {
    setupGrid(DEFAULT_SIZE);
    activateButton(DEFAULT_MODE)
}

