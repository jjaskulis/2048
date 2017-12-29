"use strict";
//gameboard is divided in to four rows and collumns, multi dimensional array bellow is used to represnt coordinates of gameboard ant values. All tile values are initialized as 0.
var app = new Vue({
    el: "#app-2048",
    data:{
        gameboard:[
            [{value:"",merged:false},{value:"",merged:false},{value:"",merged:false},{value:"",merged:false}],
            [{value:"",merged:false},{value:"",merged:false},{value:"",merged:false},{value:"",merged:false}],
            [{value:"",merged:false},{value:"",merged:false},{value:"",merged:false},{value:"",merged:false}],
            [{value:"",merged:false},{value:"",merged:false},{value:"",merged:false},{value:"",merged:false}]
        ]
    },
    methods:{
        newTile : function(amount){
                let rowNum = Math.floor((Math.random() * 4));
                let colNum = Math.floor((Math.random() * 4));
                if (this.gameboard[rowNum][colNum] > 0) {
                    this.newTile();
                } else {
                    Vue.set(this.gameboard[colNum],rowNum,2);
                }
                if (amount > 1) {
                    this.newTile(amount - 1);
                }
            },
        moveTile : function(direction){
            this.gameboard.forEach(function(row){
                let rowLength = 3;
                row.forEach(function(tile,tileIndex,array){
                    if(tile == ""){
                        return;
                    }else{
                        console.log(tile);
                    }
                })
            })
            console.log(direction);
            //     var full_tile = document.getElementsByClassName("tile full-tile"),
//         vectors = {
//             left: [-1, 0],
//             right: [1, 0],
//             up: [0, -1],
//             down: [0, 1]
//         },
//         tile_size = full_tile[0].scrollHeight + 20,
//         i,
//         coords,
//         tile_x,
//         tile_y;
//     //loop through the game tiles and move according to xy coordinates
//     for (i = 0; i < full_tile.length; i++) {
//         {
//             coords = tileCoordinates(full_tile[i]);
//             tile_x = parseFloat(coords[0]);
//             tile_y = parseFloat(coords[1]);
//             console.log(full_tile[i]);
//             full_tile[i].style.transform = "translate(" + (tile_x + (tile_size * vectors[direction][0])) + "px," + (tile_y + (tile_size * vectors[direction][1])) + "px)";
//         }
//     }
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
    default:
    }
});









