"use strict";
//gameboard is divided in to four rows and collumns, multi dimensional array bellow is used to represnt coordinates of gameboard ant values. All tile values are initialized as 0.
var app = new Vue({
    el: "#app-2048",
    data: {
        gameboard: [
            [{
                value: "4",
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
                value: "2",
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
                value: "2",
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
            for (let x = 0; x <= 3; x++) {
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
                while (i != loopEnd) {

                    let tileA = dimension == "rows" ? app.gameboard[x][j].value : app.gameboard[j][x].value;
                    let tileB = dimension == "rows" ? app.gameboard[x][i].value : app.gameboard[i][x].value;

                    if ((tileA == tileB) && (tileA > 0 && tileB > 0)) {
                        dimension == "rows" ? (app.gameboard[x][j].value = tileA * 2) : (app.gameboard[j][x].value = tileA * 2);
                        dimension == "rows" ? (app.gameboard[x][i].value = "") : (app.gameboard[i][x].value = "");
                        break;
                    } else {
                        j += increment;
                        i += increment;
                    }
                }
            }
        },
        moveTile: function (dimension, direction) {
            // let j,
            //     increment,
            //     loopEnd;
            // let i = 0;
            // for (let x = 0; x <= 3; x++) {
            //     if (direction == "backward") {
            //         j = 2;
            //         increment = -1;
            //         loopEnd = 3;
            //     } else if (direction == "forward") {
            //         j = 1;
            //         increment = 1;
            //         loopEnd = 0;
            //     }
            //     for (let y = 0; y <= 2; y++) {
            //         let tileA = dimension == "rows" ? app.gameboard[x][j].value : app.gameboard[j][x].value;
            //         if (tileA) {
            //             while (j + i != loopEnd) {
            //                 let tileB = dimension == "rows" ? app.gameboard[x][j + i].value : app.gameboard[j + i][x].value;
            //                 if ((tileB == tileB) && (tileA > 0 && tileB > 0)) {
            //                     dimension == "rows" ? (app.gameboard[x][j].value = tileA * 2) : (app.gameboard[j][x].value = tileA * 2);
            //                     dimension == "rows" ? (app.gameboard[x][i].value = "") : (app.gameboard[i][x].value = "");
            //                     break;
            //                 } else {
            //                     i += increment;
            //                 }
            //             }
            //         }
            //         j += increment;
            //     }
            // }
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