"use strict";
//gameboard is divided in to four rows and collumns, multi dimensional array bellow is used to represnt coordinates of gameboard ant values. All tile values are initialized as 0.


var gameboard_array = [[[0], [0], [0], [0]], [[0], [0], [0], [0]], [[0], [0], [0], [0]], [[0], [0], [0], [0]]];
var game_tiles = document.getElementById("game-tiles");
var arrayXY = [];

//self invoking functions scans all gameboard tile element nodes, and fills a global array arrayXY with coordinates of all gameboard tiles
(function () {
    var boardNode = document.getElementById("bg-tiles"),
        elementCoordinates,
        a,
        b,
        x = [];
    for (a = 0; a < 4; a++) {
        for (b = 0; b < 4; b++) {
            elementCoordinates = boardNode.children[a].children[b];
            x.push([elementCoordinates.offsetLeft + elementCoordinates.parentNode.offsetLeft,
                elementCoordinates.offsetTop + elementCoordinates.parentNode.offsetTop]);
        }
        arrayXY.push(x);
        x = [];
    }
}());

function newTile(amount) {
    var row_num = Math.floor((Math.random() * 4)),
        collumn_num = Math.floor((Math.random() * 4)),
        new_tile = document.createElement("div");
    new_tile.className = "tile full-tile";
    new_tile.style.left = arrayXY[row_num][collumn_num][0] - 18 + "px";
    new_tile.style.top = arrayXY[row_num][collumn_num][1] - 18 + "px";
    if (gameboard_array[row_num][collumn_num][0] > 0) {
        newTile();
    } else {
        gameboard_array[row_num][collumn_num][0] = 2;
        new_tile.textContent = gameboard_array[row_num][collumn_num][0];
        game_tiles.appendChild(new_tile);
    }
    if (amount > 1) {
        newTile(amount - 1);
    }
}

function moveTile(direction) {
    var full_tile = document.getElementsByClassName("tile full-tile"),
        vectors = {
            left: [-1, 0],
            right: [1, 0],
            up: [0, -1],
            down: [0, 1]
        },
        tile_size = full_tile[0].scrollHeight + 20,
        i,
        coords,
        tile_x,
        tile_y;
    //loop through the game tiles and move according to xy coordinates
    for (i = 0; i < full_tile.length; i++) {
        {
            coords = tileCoordinates(full_tile[i]);
            tile_x = parseFloat(coords[0]);
            tile_y = parseFloat(coords[1]);
            console.log(full_tile[i]);
            full_tile[i].style.transform = "translate(" + (tile_x + (tile_size * vectors[direction][0])) + "px," + (tile_y + (tile_size * vectors[direction][1])) + "px)";
        }
    }
}

//receives
function tileCoordinates(tile) {
    var style = null,
        transform_property = null,
        tile_matrix = [],
        reg = /(-?\d+\.?\d*)/g;
    style = window.getComputedStyle(tile);
    transform_property = (style.getPropertyValue("-webkit-transform") ||
        style.getPropertyValue("-moz-transform") ||
        style.getPropertyValue("-ms-transform") ||
        style.getPropertyValue("-o-transform") ||
        style.getPropertyValue("transform"));
    tile_matrix = transform_property.match(reg);
    return tile_matrix.slice(4,6);
}

addEventListener("keydown", function (pressedKey) {
    switch (pressedKey.keyCode) {
    case 37:
        gameMove("left");
        pressedKey.preventDefault();
        break;
    case 38:
        gameMove("up");
        pressedKey.preventDefault();
        break;
    case 39:
        gameMove("right");
        pressedKey.preventDefault();
        break;
    case 40:
        gameMove("down");
        pressedKey.preventDefault();
        break;
    default:
    }
});

newTile(1);


function gameMove(direction){
    moveTile(direction); 
    newTile();
}


