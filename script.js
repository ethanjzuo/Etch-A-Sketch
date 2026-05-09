const slidy = document.getElementById("slidy");
const colorPicker = document.querySelector(".cpicker");
const output = document.getElementById("output");
const gridy = document.querySelector(".grid");
let isDrawing = false;

buildGrid();

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
            cell.style.backgroundColor = colorPicker.value;
        });

        cell.addEventListener("mouseup", () => {
            isDrawing = false;
        });

        cell.addEventListener("mouseover", () => {
            if (isDrawing) {
                cell.style.backgroundColor = colorPicker.value;
            }
        });
    }
}

slidy.oninput = buildGrid;