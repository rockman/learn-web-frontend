window.onload = function() {

    const ROWS = 40;
    const COLS = 40;

    let container = document.getElementById("container");
    let cells = [];

    for (let i = 0; i < ROWS; ++i) {

        let row = document.createElement("div");
        row.className = "row"
        container.appendChild(row);

        for (let j = 0; j < COLS; ++j) {
            let cell = document.createElement("div");
            cell.className = "cell";
            cell.gameOfLife = {
                value: randomBoolean() ? 1 : 0,
                next: 0
            };
            row.appendChild(cell);
            cells.push(cell);
        }
    }

    function randomBoolean() {
        return Math.random() > 0.5;
    }

    function neighbours(index, row, col) {
        let above = row == 0        ? COLS * (ROWS - 1) : -COLS;
        let below = row == ROWS - 1 ? COLS * (1 - ROWS) : COLS;
        let left  = col == 0        ? COLS - 1          : -1;
        let right = col == COLS - 1 ? 1 - COLS          : 1;

        return cells[index + above + left ].gameOfLife.value
             + cells[index + above        ].gameOfLife.value
             + cells[index + above + right].gameOfLife.value
             + cells[index + left         ].gameOfLife.value
             + cells[index + right        ].gameOfLife.value
             + cells[index + below + left ].gameOfLife.value
             + cells[index + below        ].gameOfLife.value
             + cells[index + below + right].gameOfLife.value;
    }

    function update() {

        let index = 0;

        for (let i = 0; i < ROWS; ++i) {
            for (let j = 0; j < COLS; ++j) {
                let cell = cells[index];
                let n = neighbours(index++, i, j);
                if (n == 3) {
                    cell.gameOfLife.next = 1;
                } else if (n == 2) {
                    cell.gameOfLife.next = cell.gameOfLife.value;
                } else {
                    cell.gameOfLife.next = 0;
                }
            }
        }

        cells.forEach(cell => {
            cell.gameOfLife.value = cell.gameOfLife.next;

            if (cell.gameOfLife.value == 1) {
                cell.classList.add("alive");
            } else {
                cell.classList.remove("alive");
            }
        });

        requestAnimationFrame(update);
    }

    requestAnimationFrame(update);

};
