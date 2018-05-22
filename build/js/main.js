"use strict";
const game = new Vue({
    el: "#game-2048",
    data: {
        board: [
            [{value:0,mergeNum:0,row:'',col:'',movementClass:"",new:false}, {value:0,mergeNum:0,row:'',col:'',movementClass:"",new:false}, {value:0,mergeNum:0,row:'',col:'',movementClass:"",new:false}, {value:0,mergeNum:0,row:'',col:'',movementClass:"",new:false}],
            [{value:0,mergeNum:0,row:'',col:'',movementClass:"",new:false}, {value:0,mergeNum:0,row:'',col:'',movementClass:"",new:false}, {value:0,mergeNum:0,row:'',col:'',movementClass:"",new:false}, {value:0,mergeNum:0,row:'',col:'',movementClass:"",new:false}],
            [{value:0,mergeNum:0,row:'',col:'',movementClass:"",new:false}, {value:0,mergeNum:0,row:'',col:'',movementClass:"",new:false}, {value:0,mergeNum:0,row:'',col:'',movementClass:"",new:false}, {value:0,mergeNum:0,row:'',col:'',movementClass:"",new:false}],
            [{value:0,mergeNum:0,row:'',col:'',movementClass:"",new:false}, {value:0,mergeNum:0,row:'',col:'',movementClass:"",new:false}, {value:0,mergeNum:0,row:'',col:'',movementClass:"",new:false}, {value:0,mergeNum:0,row:'',col:'',movementClass:"",new:false}],
            ],
            lastTurn: {
            lastMove: "",
            hasMerged: false,
            hasMoved: false
        },
        game: {
            score: 0,
            gameOver: false
        }
    },
    mounted() {
        //init starting tiles
        this.newTile(2);
    },
    computed: {
        //calculate the number of occupied tiles
        fullTiles: function () {
            let tileCount = 0;
            this.board.forEach(row => row.forEach(tile => {
                if (tile.value) { tileCount++ }
            }))
            return tileCount;
        },
        gameStatus: function () {
            if (this.fullTiles === 16 && !this.lastTurn.hasMoved && !this.lastTurn.hasMerged) {
                this.game.gameOver = true;
            }
        },
    },
    methods: {
        newTile: function (amount) {
            const defaultValue = 2;
            const rowNum = Math.floor((Math.random() * 4));
            const colNum = Math.floor((Math.random() * 4));

            if (this.board[rowNum][colNum].value > 0) {
                this.newTile();
            } else {
                this.board[rowNum][colNum].value = defaultValue;
                this.board[rowNum][colNum].mergeNum = 0;
                this.board[rowNum][colNum].row = rowNum;
                this.board[rowNum][colNum].col = colNum;
                this.board[rowNum][colNum].new = true;
                this.board[rowNum][colNum].movementClass = "";
                console.log("new!"+colNum+rowNum);
                setTimeout(function(){
                    game.board[rowNum][colNum].new = false;
                },300);
            }
            if (amount > 1) {
                this.newTile(amount - 1);
            }
        },
        makeMove: function (key) {
            if (this.lastTurn.lastMove === "" || key !== this.lastTurn.lastMove || this.fullTiles === 16) {
                switch (key) {
                    case "right":
                        this.mergeTile("row", "backward");
                        this.moveTile("row", "backward");
                        break;
                    case "left":
                        this.mergeTile("row", "forward");
                        this.moveTile("row", "forward");
                        break;
                    case "down":
                        this.mergeTile("col", "backward");
                        this.moveTile("col", "backward");
                        break;
                    case "up":
                        this.mergeTile("col", "forward");
                        this.moveTile("col", "forward");
                        break;
                }
                this.lastKey = key;
                if (this.lastTurn.hasMoved || this.lastTurn.hasMerged) {
                    game.newTile(1);
                }
            }
        },
        mergeTile: function (dimension, direction) {
            this.lastTurn.hasMerged = false;
            let i, j, increment, loopEnd;
            for (let x = 0; x <= 3; x++) {
                if (direction === "backward") {
                    increment = -1;
                    j = 3;
                    i = j + increment;
                    loopEnd = -1;
                } else if (direction === "forward") {
                    increment = 1;
                    j = 0;
                    i = j + increment;
                    loopEnd = 4;
                }
                while (i != loopEnd) {
                    const tileA = dimension === "row" ? game.board[x][j].value : game.board[j][x].value;
                    const tileB = dimension === "row" ? game.board[x][i].value : game.board[i][x].value;

                    if ((tileA === tileB) && (tileA > 0 && tileB > 0)) {
                        const newValue = tileA * 2;
                        const mergeNum = dimension === "row" ? game.board[x][j].mergeNum+1 : game.board[j][x].mergeNum+1;
                        const movementClass = dimension === "row" ? "col_from_"+i+"_to_"+j:"row_from_"+i+"_to_"+j;

                        //tileA
                        dimension === "row" ? (game.board[x][j].value = newValue) : (game.board[j][x].value = newValue);
                        dimension === "row" ? (game.board[x][j].mergeNum = mergeNum) : (game.board[j][x].mergeNum = mergeNum);
                        
                        dimension === "row" ? (game.board[x][j].movementClass = movementClass) : (game.board[j][x].movementClass = movementClass);
                        
                      
                        //tileB->destroy
                        dimension === "row" ? (game.board[x][i].value = 0) : (game.board[i][x].value = 0);
                        dimension === "row" ? (game.board[x][i].mergeNum = 0) : (game.board[i][x].mergeNum = 0);

                        this.lastTurn.hasMerged = true;
                        this.game.score += newValue;
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
            this.lastTurn.hasMoved = false;
            let j, i, increment, loopEnd;
            //loop over each row or column
            for (let x = 0; x <= 3; x++) {
                if (direction === "backward") {
                    j = 2;
                    increment = -1;
                    loopEnd = 4;
                } else if (direction === "forward") {
                    j = 1;
                    increment = 1;
                    loopEnd = -1;
                }
                for (let y = 0; y <= 2; y++) {
                    const tileA = dimension === "row" ? game.board[x][j].value : game.board[j][x].value;
                    const mergeNum = dimension === "row" ? game.board[x][j].mergeNum : game.board[j][x].mergeNum;

                    i = j - increment;
                    //if tileA is not empty, continue
                    if (tileA) {

                        while (i != loopEnd) {
                            const tileB = dimension === "row" ? game.board[x][i].value : game.board[i][x].value;
                            if (tileB) {
                                break;
                            }
                            i -= increment;
                        }
                        i += increment;

                        //i will be the position of last empty element
                        if (i !== j) {
                            const movementClass = dimension === "row" ? "col_from_"+j+"_to_"+i:"row_from_"+j+"_to_"+i;                            //tileA -> destroy
                            dimension === "row" ? (game.board[x][j].value = 0) : (game.board[j][x].value = 0);
                            dimension === "row" ? (game.board[x][j].mergeNum = 0) : (game.board[j][x].mergeNum = 0);
                            //tileB -> new data
                                     
                            dimension === "row" ? (game.board[x][i].value = tileA) : (game.board[i][x].value = tileA);
                            dimension === "row" ? (game.board[x][i].mergeNum = mergeNum) : (game.board[i][x].mergeNum = mergeNum);
                            dimension === "row" ? (game.board[x][i].col = i) : (game.board[i][x].col = x);
                            dimension === "row" ? (game.board[x][i].row = x) : (game.board[i][x].row = i);
                            dimension === "row" ? (game.board[x][i].movementClass = movementClass) : (game.board[i][x].movementClass = movementClass);
                            
                            this.lastTurn.hasMoved = true;
                        }
                    }
                    j += increment;
                }
            }
        }
    }
})


addEventListener("keydown", function (pressedKey) {
    switch (pressedKey.keyCode) {
        case 37:
            game.makeMove("left");
            pressedKey.preventDefault();
            break;
        case 38:
            game.makeMove("up");
            pressedKey.preventDefault();
            break;
        case 39:
            game.makeMove("right");
            pressedKey.preventDefault();
            break;
        case 40:
            game.makeMove("down");
            pressedKey.preventDefault();
            break;
    }
});

