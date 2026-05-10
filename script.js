const slidy = document.getElementById("slidy");
const colorPicker = document.querySelector(".cpicker");
const output = document.getElementById("output");
const gridy = document.querySelector(".grid");
const buttons = document.querySelectorAll(".btn");

let isDrawing = false;
let currentMode = "color";

window.onmousedown = () => (isDrawing = true);
window.onmouseup = () => (isDrawing = false);

function buttonactive(buttonToActivate) {
    buttons.forEach(btn => {
        if (btn === buttonToActivate) {
            btn.classList.add("active");
            console.log(currentMode)
        } else {
            btn.classList.remove("active");
        }
    });
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const text = btn.textContent.trim();

        if (text !== 'Clear') {
            buttonactive(btn);
        }

        if (text === 'Rainbow') {
            currentMode = 'rainbow';
        } else if (text === 'Erase') {
            currentMode = 'erase';
        } else if (text === 'Color') {
            currentMode = 'color';
        } else if (text === 'Clear') {
            // Instant clear logic
            const cells = document.querySelectorAll('.cell');
            cells.forEach(c => c.style.backgroundColor = 'white');
        }
    });
});

function buildGrid() {
    const size = slidy.value;
    output.textContent = `${size} x ${size}`;

    gridy.innerHTML = "";

    gridy.style.display = "grid";
    gridy.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridy.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        gridy.appendChild(cell);

        cell.addEventListener("mousedown", () => {
            isDrawing = true;
            if (currentMode === 'rainbow') {
                const randomColor = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
                cell.style.backgroundColor = randomColor;
            } else if (currentMode === 'erase') {
                cell.style.backgroundColor = "white";
            } else {
                cell.style.backgroundColor = colorPicker.value;
            }
        });

        cell.addEventListener("mouseup", () => {
            isDrawing = false;
        });

        cell.addEventListener("mouseover", () => {
            if (isDrawing) {
                if (currentMode === 'rainbow') {
                    const randomColor = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
                    cell.style.backgroundColor = randomColor;
                } else if (currentMode === 'erase') {
                    cell.style.backgroundColor = "white";
                } else {
                    cell.style.backgroundColor = colorPicker.value;
            }
            }
        });
    }f
}

slidy.oninput = buildGrid;

buildGrid();