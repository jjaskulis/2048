"use strict";
//gameboard is divided in to four rows and collumns, multi dimensional array bellow is used to represnt coordinates of gameboard ant values. All tile values are initialized as 0.
var app = new Vue({
    el: "#app-2048",
    data: {
        active:true,
        gameboard: [
            [{
                value: "",
                mergeNum : 0
            }, {
                value: "",
                mergeNum : 0
            }, {
                value: "",
                mergeNum : 0
            }, {
                value: "",
                mergeNum : 0
            }],
            [{
                value: "",
                mergeNum : 0
            }, {
                value: "",
                mergeNum : 0
            }, {
                value: "",
                mergeNum : 0
            }, {
                value: "",
                mergeNum : 0
            }],
            [{
                value: "",
                mergeNum : 0
            }, {
                value: "",
                mergeNum : 0
            }, {
                value: "",
                mergeNum : 0
            }, {
                value: "",
                mergeNum : 0
            }],
            [{
                value: "",
                mergeNum : 0
            }, {
                value: "",
                mergeNum : 0
            }, {
                value: "",
                mergeNum : 0
            }, {
                value: "",
                mergeNum : 0
            }]
        ],
        lastTurn: {
            lastMove:"",
            hasMerged:false,
            hasMoved:false
        },
        gameOver: false
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
        makeMove: function (key) {
            if (this.lastTurn.lastMove == "" || key !== this.lastTurn.lastMove) {
                switch (key) {
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
                this.lastKey = key;
                if(this.lastTurn.hasMoved || this.lastTurn.hasMerged){
                this.newTile();
            }
            }
        },
        mergeTile: function (dimension, direction) {
            let i, j, increment, loopEnd;
            this.lastTurn.hasMerged = false;
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
                        dimension == "rows" ? (app.gameboard[x][j].mergeNum++) : (app.gameboard[j][x].mergeNum++);
                        dimension == "rows" ? (app.gameboard[x][j].value = tileA * 2) : (app.gameboard[j][x].value = tileA * 2);
                        
                        dimension == "rows" ? (app.gameboard[x][i].mergeNum--) : (app.gameboard[x][i].mergeNum--);                        
                        dimension == "rows" ? (app.gameboard[x][i].value = "") : (app.gameboard[i][x].value = "");
                        this.lastTurn.hasMerged = true;
                        break;
                    } else if (tileA > 0 && tileB <= 0) {
                        i += increment;
                    }
                    else {
                        j += increment;
                        i += increment;
                    }
                }
            }
        },
        moveTile: function (dimension, direction) {
            let j,
                increment,
                loopEnd,
                i;
            this.lastTurn.hasMoved = false;    
            for (let x = 0; x <= 3; x++) {
                if (direction == "backward") {
                    j = 2;
                    increment = -1;
                    loopEnd = 4;
                } else if (direction == "forward") {
                    j = 1;
                    increment = 1;
                    loopEnd = -1;
                }
                for (let y = 0; y <= 2; y++) {
                    let tileA = dimension == "rows" ? app.gameboard[x][j].value : app.gameboard[j][x].value;
                    i = j - increment;
                    if (tileA) {
                        while (i != loopEnd) {
                            let tileB = dimension == "rows" ? app.gameboard[x][i].value : app.gameboard[i][x].value;
                            if (tileB) {
                                break;
                            }
                            i -= increment;
                        }
                        i += increment;
                        if(i!=j){
                            dimension == "rows" ? (app.gameboard[x][j].value = "") : (app.gameboard[j][x].value = "");
                            dimension == "rows" ? (app.gameboard[x][i].value = tileA) : (app.gameboard[i][x].value = tileA);
                            this.lastTurn.hasMoved = true;
                        }
                    }
                    j += increment;
                }
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