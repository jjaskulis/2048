"use strict";
//gameboard is divided in to four rows and collumns, multi dimensional array bellow is used to represnt coordinates of gameboard ant values. All tile values are initialized as 0.
var app = new Vue({
    el: "#app-2048",
    data: {
        gameboard: [
            [{
                value: "",
                merged: false
            }, {
                value: "",
                merged: false
            }, {
                value: "",
                merged: false
            }, {
                value: "",
                merged: false
            }],
            [{
                value: "",
                merged: false
            }, {
                value: "",
                merged: false
            }, {
                value: "",
                merged: false
            }, {
                value: "",
                merged: false
            }],
            [{
                value: "",
                merged: false
            }, {
                value: "",
                merged: false
            }, {
                value: "",
                merged: false
            }, {
                value: "",
                merged: false
            }],
            [{
                value: "",
                merged: false
            }, {
                value: "",
                merged: false
            }, {
                value: "",
                merged: false
            }, {
                value: "",
                merged: false
            }]
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
        makeMove: function (direction) {
            switch (direction) {
                case "right":
                    this.mergeTile("rows", "backward");
                    this.moveTile("rows", "backward");
                    break;
                case "left":
                    this.mergeTile("rows", "forward");
                    this.moveTile("rows", "forward");
                    break;
                case "down":
                    this.mergeTile("collumns", "backward");
                    this.moveTile("collumns", "backward");
                    break;
                case "up":
                    this.mergeTile("collumns", "forward");
                    this.moveTile("collumns", "forward");
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
                            loopEnd = -1;
                        } else if (direction == "forward") {
                            j = 0;
                            i = 1;
                            increment = 1;
                            loopEnd = 4;
                        }
                        while (true) {
                            if (i == loopEnd) {
                                break;
                            }
                            let tileA = app.gameboard[row][j].value;
                            let tileB = app.gameboard[row][i].value;
                            if (tileA > 0 && tileB > 0) {
                                if (tileA == tileB) {
                                    app.gameboard[row][j].value = tileA * 2;
                                    app.gameboard[row][i].value = "";
                                    break;
                                } else {
                                    j += increment;
                                    i += increment;
                                }
                            } else if ((tileA <= 0 && tileB <= 0) || (tileA <= 0 && tileB > 0)) {
                                j += increment;
                                i += increment;
                            } else if (tileA > 0 && tileB <= 0) {
                                i += increment;
                            }
                        }
                    }
                    break;
                case "collumns":
                    for (let col = 0; col <= 3; col++) {
                        if (direction == "backward") {
                            j = 3;
                            i = 2;
                            increment = -1;
                            loopEnd = -1;
                        } else if (direction == "forward") {
                            j = 0;
                            i = 1;
                            increment = 1;
                            loopEnd = 4;
                        }
                        while (true) {
                            if (i == loopEnd) {
                                break;
                            }
                            let tileA = app.gameboard[j][col].value;
                            let tileB = app.gameboard[i][col].value;
                            if (tileA > 0 && tileB > 0) {
                                if (tileA == tileB) {
                                    app.gameboard[j][col].value = tileA * 2;
                                    app.gameboard[i][col].value = "";
                                    break;
                                } else {
                                    j += increment;
                                    i += increment;
                                }
                            } else if (i == loopEnd) {
                                break;
                            } else if ((tileA <= 0 && tileB <= 0) || (tileA <= 0 && tileB > 0)) {
                                j += increment;
                                i += increment;
                            } else if (tileA > 0 && tileB <= 0) {
                                i += increment;
                            }

                        }
                    }
                    break;
            }
        },
        moveTile: function (dimension, direction) {
            let j,
                i,
                increment,
                loopEnd;
            switch (dimension) {
                case "rows":
                    if (direction == "backward") {
                        j = 2;
                        increment = -1;
                        loopEnd = 3;
                    } else if (direction == "forward") {
                        j = 0;
                        increment = 1;
                        loopEnd = 0;
                    }
                    for (let row = 0; row <= 3; row++) {
                        if (app.gameboard[row][j].value <= 0) {
                            j += increment;
                        } else {
                            while (j + i != loopEnd) {
                                if (app.gameboard[row][i] <= 0) {}
                            }
                        }
                    }
                    break;
                case "collumns":
                    break;
            }
        }
    }
})

app.newTile(2);


addEventListener("keydown", function (pressedKey) {
    switch (pressedKey.keyCode) {
        case 37:
            app.makeMove("left");
            pressedKey.preventDefault();
            break;
        case 38:
            app.makeMove("up");
            pressedKey.preventDefault();
            break;
        case 39:
            app.makeMove("right");
            pressedKey.preventDefault();
            break;
        case 40:
            app.makeMove("down");
            pressedKey.preventDefault();
            break;
    }
});