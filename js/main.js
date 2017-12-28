"use strict";
//gameboard is divided in to four rows and collumns, multi dimensional array bellow is used to represnt coordinates of gameboard ant values. All tile values are initialized as 0.
var app = new Vue({
    el: "#app-2048",
    data:{
        gameboard:[,,,,,,,,,,,e,,,,,]
    },
    methods:{
        newTile : function(amount){
                let tileNum = Math.floor((Math.random() * 15));
                if (this.gameboard[tileNum] > 0) {
                    this.newTile();
                } else {
                    Vue.set(this.gameboard,tileNum,2);
                }
                if (amount > 1) {
                    this.newTile(amount - 1);
                }
            }
    }
})
app.newTile(2);
// function moveTile(direction) {
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
// }

// //receives
// function tileCoordinates(tile) {
//     var style = null,
//         transform_property = null,
//         tile_matrix = [],
//         reg = /(-?\d+\.?\d*)/g;
//     style = window.getComputedStyle(tile);
//     transform_property = (style.getPropertyValue("-webkit-transform") ||
//         style.getPropertyValue("-moz-transform") ||
//         style.getPropertyValue("-ms-transform") ||
//         style.getPropertyValue("-o-transform") ||
//         style.getPropertyValue("transform"));
//     tile_matrix = transform_property.match(reg);
//     return tile_matrix.slice(4,6);
// }

// addEventListener("keydown", function (pressedKey) {
//     switch (pressedKey.keyCode) {
//     case 37:
//         gameMove("left");
//         pressedKey.preventDefault();
//         break;
//     case 38:
//         gameMove("up");
//         pressedKey.preventDefault();
//         break;
//     case 39:
//         gameMove("right");
//         pressedKey.preventDefault();
//         break;
//     case 40:
//         gameMove("down");
//         pressedKey.preventDefault();
//         break;
//     default:
//     }
// });

// newTile(1);


// function gameMove(direction){
//     moveTile(direction); 
//     newTile();
// }


