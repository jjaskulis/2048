"use strict";
//gameboard is divided in to four rows and collumns, multi dimensional array bellow is used to represnt coordinates of gameboard ant values. All tile values are initialized as 0.
var app = new Vue({
    el: "#app-2048",
    data: {
        gameboard: [
            [{ value: "", merged: false }, { value: "", merged: false }, { value: "", merged: false }, { value: "", merged: false }],
            [{ value: "", merged: false }, { value: "", merged: false }, { value: "", merged: false }, { value: "", merged: false }],
            [{ value: "", merged: false }, { value: "", merged: false }, { value: "", merged: false }, { value: "", merged: false }],
            [{ value: "", merged: false }, { value: "", merged: false }, { value: "", merged: false }, { value: "", merged: false }]
        ]
    },
    methods: {
        newTile: function (amount) {
            let rowNum = Math.floor((Math.random() * 4));
            let colNum = Math.floor((Math.random() * 4));
            if (this.gameboard[rowNum][colNum].value > 0) {
                this.newTile();
            } else {
                this.gameboard[rowNum][colNum].value = 2;
            }
            if (amount > 1) {
                this.newTile(amount - 1);
            }
        },
        moveTile: function (direction) {
            switch (direction) {
                case "right":
                    this.mergeTile("rows", "backward");
                    break;
                case "left":
                    this.mergeTile("rows", "forward");
                    break;
                case "down":
                    this.mergeTile("collumns", "backward");
                    break;
                case "up":
                    this.mergeTile("rows", "forward");
                    break;
            }
            this.newTile()
        },
        mergeTile: function (dimension, direction) {
            let i, j, increment, loopEnd;
            let x = 0;
            switch (dimension) {
                case "rows":
                    for (let row = 0; row <= 3; row++) {
                        if (direction == "backward") {
                            j = 3;
                            i = 2;
                            increment = -1;
                            loopEnd = 0;
                        } else if (direction == "forward") {
                            j = 0;
                            i = 1;
                            increment = 1;
                            loopEnd = 3;
                        }
                        while (true) {
                            let tileA = app.gameboard[row][j].value;
                            let tileB = app.gameboard[row][i].value;
                            if (tileA > 0 && tileB > 0 && tileA == tileB) {
                                app.gameboard[row][j].value = tileA * tileB;
                                app.gameboard[row][i].value = "";
                                break;
                            }
                            else if (i == loopEnd) {
                                break;
                            }
                            else if (tileA <= 0 && tileB <=0) {
                                j += increment;
                                i += increment;
                            } else if (tileA > 0 && tileB <= 0) {
                                i += increment;
                            }
                        }
                    }

                case "collumns":
                    for (let col = 0; col <= 3; col++) {
                        if (direction == "backward") {
                            j = 3;
                            i = 2;
                            increment = -1;
                            loopEnd = 0;
                        } else if (direction == "forward") {
                            j = 0;
                            i = 1;
                            increment = 1;
                            loopEnd = 3;
                        }
                        while (true) {
                            let tileA = app.gameboard[j][col].value;
                            let tileB = app.gameboard[i][col].value;
                            if (tileA > 0 && tileB > 0 && tileA == tileB) {
                                app.gameboard[j][col].value = tileA * tileB;
                                app.gameboard[i][col].value = "";
                                break;
                            }
                            else if (i == loopEnd) {
                                break;
                            }
                            else if (tileA <= 0 && tileB <=0) {
                                j += increment;
                                i += increment;
                            } else if (tileA > 0 && tileB <= 0) {
                                i += increment;
                            }
                        }
                    }
            }
        }
    }

})
app.newTile(2);


addEventListener("keydown", function (pressedKey) {
    switch (pressedKey.keyCode) {
        case 37:
            app.moveTile("left");
            pressedKey.preventDefault();
            break;
        case 38:
            app.moveTile("up");
            pressedKey.preventDefault();
            break;
        case 39:
            app.moveTile("right");
            pressedKey.preventDefault();
            break;
        case 40:
            app.moveTile("down");
            pressedKey.preventDefault();
            break;
    }
});









