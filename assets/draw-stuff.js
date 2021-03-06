
var arry = new Array();
var tempArry = new Array();
var length1 = 20;
var width1 = 20;
var globalX = 0;
var globalY = 0;
var closeInt;
var row = 1;
var col = 0;
var state = 0
var count = 0;


function createArray() {

    for (var i = 0; i < length1; i++) {
        arry[i] = [];
        tempArry[i] = [];
        for (var j = 0; j < width1; j++) {
            arry[i][j] = 0;
            tempArry[i][j] = 0;
        }
    }
}

function drawPreset() {
    arry[2][2] = 1;
    arry[3][3] = 1;
    arry[4][3] = 1;
    arry[4][2] = 1;
    arry[4][1] = 1;
    tempArry[2][2] = 1;
    tempArry[3][3] = 1;
    tempArry[4][3] = 1;
    tempArry[4][2] = 1;
    tempArry[4][1] = 1;
}

function turingMachineStart(ctx, ctxL, ctxM, ctxR, ctxMov, ctx4, ctxLU, ctxMU,
                                    ctxRU, ctxLD, ctxMD, ctxRD, ctxDe, ctxBi) {
    createArray();
    drawPreset();
    drawArray(ctx, arry);
    closeInt = setInterval(function () {
        runTuringMachine(ctx, ctxL, ctxM, ctxR, ctxMov, ctx4, ctxLU, ctxMU,
                                        ctxRU, ctxLD, ctxMD, ctxRD, ctxDe, ctxBi)}, 150);
}

function test(ctx) {
    //drawArray(ctx, arry); 
    createArray();

    //console.log(arry);

    setInterval(GameOfLife, 200, arry, ctx);
    //GameOfLife(arry,ctx);
}

function runTuringMachine(ctx, ctxL, ctxM, ctxR, ctxMov, ctx4, ctxLU, ctxMU,
                                    ctxRU, ctxLD, ctxMD, ctxRD, ctxDe, ctxBi) {
    clear_small_cell(ctx4, globalX, globalY);
    if (state === 0)    //move
    {
        reFillCell(ctxBi);
        reEraseCell(ctxDe);
        reNoteStateMachineReadMiddle(ctxM);
        if (col > length1 - 3) {
            row++;
            col = 0;
            // console.log("temp Array: " + tempArry[col]);
        }
        else if (row > width1 - 3) {
            //console.log("temp" + tempArry);
            refreshGrid(ctx);
            cpyArry();
            drawArray(ctx, arry);
            col = 0;
            row = 1;
            globalX = 0;
            globalY = 10;
        }
        else {
            col++;
            state = 1;
            calcXY(row, col);
            NoteStateMachineMove(ctxMov, ctx4);
        }

    }
    else if (state === 1) //read upper left
    {
        readCellTuringMachine(ctx4, row - 1, col - 1);
        state = 2;
        readUpLeft(ctxLU);
        reNoteStateMachineMove(ctxMov);
    }
    else if (state === 2) //read upper center
    {
        readCellTuringMachine(ctx4, row - 1, col);
        state = 3;
        readUpMiddle(ctxMU);
        reReadUpLeft(ctxLU);
    }
    else if (state === 3)//read upper right
    {
        readCellTuringMachine(ctx4, row - 1, col + 1);
        state = 4;
        readUpRight(ctxRU);
        reReadUpMiddle(ctxMU);
    }
    else if (state === 4)//read middle right
    {
        readCellTuringMachine(ctx4, row, col + 1);
        state = 5;
        NoteStateMachineReadRight(ctx4, ctxR);
        reReadUpRight(ctxRU);
    }
    else if (state === 5)//read down right
    {
        readCellTuringMachine(ctx4, row + 1, col + 1);
        state = 6;
        readDownRight(ctxRD);
        reNoteStateMachineReadRight(ctxR);
    }
    else if (state === 6)//read down middle
    {
        readCellTuringMachine(ctx4, row + 1, col);
        state = 7;
        readDownMiddle(ctxMD);
        reReadDownRight(ctxRD);
    }
    else if (state === 7)//read down left
    {
        readCellTuringMachine(ctx4, row + 1, col - 1);
        state = 8;
        readDownLeft(ctxLD);
        reReadDownMiddle(ctxMD);
    }
    else if (state === 8)//read middleLeft
    {
        readCellTuringMachine(ctx4, row, col - 1);
        state = 9;
        NoteStateMachineReadLeft(ctx4, ctxL);
        reReadDownLeft(ctxLD);
    }
    else if (state === 9)//check total cell
    {
        calcXY(row, col);
        NoteStateMachineMove(ctxMov, ctx4);
        NoteStateMachineReadMiddle(ctx, ctxM);
        //console.log("(" + row + "," + col + "):" + arry[row][col] + " | count->" + count + " delete? -> " + (count >= 4 || count <= 1));
        if (count === 3 && arry[row][col] === 0)
            state = 10;
        else if ((count >= 4 || count <= 1) && arry[row][col] === 1)
            state = 11;
        else {
            state = 0;
            count = 0;
        }
        reNoteStateMachineReadLeft(ctxL);
    }
    else if (state === 10)//write cell
    {
        reNoteStateMachineReadMiddle(ctxM);
        writeCell(row, col);
        //console.log("( " + row + ", " + col + ")=== " + tempArry[row][col]);
        state = 0;
        count = 0;
        fillCell(ctx, ctx4, ctxBi);
    }
    else if (state === 11)//remove cell
    {
        reNoteStateMachineReadMiddle(ctxM);
        removeCell(row, col);
        //console.log("( " + row + ", " + col + ")=== " + tempArry[row][col]);
        state = 0;
        count = 0;
        eraseCell(ctx, ctx4, ctxDe);
        
    }
    //console.log("state: " + state);
}

function readCellTuringMachine(ctx, r, c) {
    calcXY(r, c);
    if (arry[r][c] === 1)
        count++;
    read_turing_cell(ctx, globalX, globalY);
}

function writeCell(r, c) {
    tempArry[r][c] = 1;
}

function removeCell(r, c) {
    tempArry[r][c] = 0;
}

function cpyArry() {
    for (var i = 0; i < width1; i++) {
        for (var j = 0; j < length1; j++) {
            arry[i][j] = tempArry[i][j];
        }
        //console.log("arr: " + arry[i]);
    }
}

function draw_BIG_cell(ctx, x, y) {
    var stroke = 'transparent';
    var fill = 'Green';
    ctx.save();
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = 0;
    var gen = 0;
    width = canvas.width - 210;
    ctx.rect(x, y, 17, 17);
    ctx.fill();
    //ctx.restore();
}
function re_BIG_cell(ctx, x, y) {
    var stroke = 'transparent';
    var fill = 'black';
    ctx.save();
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = 0;
    var gen = 0;
    width = canvas.width - 210;
    ctx.rect(x, y, 17, 17);
    ctx.fill();
    //ctx.restore();
}

function move_turing_cell(ctx, x, y) {
    var stroke = 'transparent';
    var fill = 'yellow';
    ctx.save();
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = 0;
    var gen = 0;
    width = canvas.width - 210;
    ctx.fillRect(x, y, 8.5, 8.5);
    ctx.restore();
}

function read_turing_cell(ctx, x, y) {
    var stroke = 'transparent';
    var fill = 'blue';
    ctx.save();
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = 0;
    var gen = 0;
    width = canvas.width - 210;
    ctx.fillRect(x, y, 8.5, 8.5);
    ctx.restore();
}

function write_turing_cell(ctx, x, y) {
    var stroke = 'transparent';
    var fill = 'white';
    ctx.save();
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = 0;
    var gen = 0;
    width = canvas.width - 210;
    ctx.fillRect(x, y, 8.5, 8.5);
    ctx.restore();
}
function remove_turing_cell(ctx, x, y) {
    var stroke = 'transparent';
    var fill = 'purple';
    ctx.save();
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = 0;
    var gen = 0;
    width = canvas.width - 210;
    ctx.fillRect(x, y, 8.5, 8.5);
    ctx.restore();
}

function clear_small_cell(ctx, x, y) {
    ctx.clearRect(x, y, 8.5, 8.5);
    ctx.restore();
}
function NoteStateMachineReadRight(ctx, ctx4) {

    //globalX += 10;
    //read_turing_cell(ctx4, globalX, globalY);
    //currentState++;
    //tmpArrSet[0] = DrawArr[i - 1];
    draw_BIG_cell(ctx4, 50, 50);
}

function NoteStateMachineReadMiddle(ctx, ctx4) {
    //globalX += 10;
    //read_turing_cell(ctx4, globalX, globalY);
    //currentState++;
    //tmpArrSet[1] = DrawArr[i];
    draw_BIG_cell(ctx4, 50, 50);

}

function NoteStateMachineReadLeft(ctx, ctx4) {
    //globalX -= 10;
    //read_turing_cell(ctx4, globalX, globalY);
    //currentState++;
    //tmpArrSet[2] = DrawArr[i + 1];
    draw_BIG_cell(ctx4, 50, 50);
}

function NoteStateMachineWrite(ctx) {
    draw_BIG_cell(ctx, 300, 120);
}

function NoteStateMachineMove(ctx, ctx4) {
    //i++;
    //currentState++;
    //globalX += 10;
    move_turing_cell(ctx4, globalX, globalY);
    draw_BIG_cell(ctx, 50, 50);
}

function NoteStateMachineWriteCellR(ctx) {
    draw_BIG_cell(ctx, 300, 30);
}
function NoteStateMachineWriteCellL(ctx) {
    draw_BIG_cell(ctx, 100, 30);
}
function NoteStateMachineWriteCellM(ctx, ctxBi, ctx4) {
    //globalY += 10;
    write_turing_cell(ctx4, globalX, globalY);
    draw_cell(ctx, globalX, globalY);
   // globalY -= 10;
    //currentState = 0;
    draw_BIG_cell(ctxBi, 50, 30);
}

///Project 3 State Machine Function

function readUpLeft(ctx2){
    draw_BIG_cell(ctx2, 50, 50);
}
function readUpMiddle(ctx2) {
    draw_BIG_cell(ctx2, 50, 50);
}
function readUpRight(ctx2) {
    draw_BIG_cell(ctx2, 50, 50);
}
function readDownLeft(ctx2) {
    draw_BIG_cell(ctx2, 50, 50);
}
function readDownMiddle(ctx2) {
    draw_BIG_cell(ctx2, 50, 50);
}
function readDownRight(ctx2) {
    draw_BIG_cell(ctx2, 50, 50);
}
function fillCell(ctx, ctx2, ctxBi) {
    write_turing_cell(ctx, globalX, globalY);
    write_turing_cell(ctx2, globalX, globalY);
    draw_BIG_cell(ctxBi, 50, 50);
}
function eraseCell(ctx, ctx2, ctxBi) {
    remove_turing_cell(ctx, globalX, globalY);
    remove_turing_cell(ctx2, globalX, globalY);
    draw_BIG_cell(ctxBi, 50, 50);
}


/// reset functions  


function reNoteStateMachineReadRight(ctx) {
    re_BIG_cell(ctx, 50, 50);
}

function reNoteStateMachineReadMiddle(ctx) {

    re_BIG_cell(ctx, 50, 50);
}

function reNoteStateMachineReadLeft(ctx) {
    re_BIG_cell(ctx, 50, 50);
}

function reNoteStateMachineWrite(ctx) {
    re_BIG_cell(ctx, 50, 50);
}

function reNoteStateMachineMove(ctx) {
    re_BIG_cell(ctx, 50, 50);
}

function reNoteStateMachineWriteCellR(ctx) {
    re_BIG_cell(ctx, 300, 30);
}
function reNoteStateMachineWriteCellL(ctx) {
    re_BIG_cell(ctx, 100, 30);
}
function reNoteStateMachineWriteCellM(ctx) {
    re_BIG_cell(ctx, 50, 30);
}

//reset part of Project 3 state machine Function
function reReadUpLeft(ctx) {
    re_BIG_cell(ctx, 50, 50);
}
function reReadUpMiddle(ctx) {
    re_BIG_cell(ctx, 50, 50);
}
function reReadUpRight(ctx) {
    re_BIG_cell(ctx, 50, 50);
}
function reReadDownLeft(ctx) {
    re_BIG_cell(ctx, 50, 50);
}
function reReadDownMiddle(ctx) {
    re_BIG_cell(ctx, 50, 50);
}
function reReadDownRight(ctx) {
    re_BIG_cell(ctx, 50, 50);
}
function reFillCell(ctx){
    re_BIG_cell(ctx, 50, 50);
}
function reEraseCell(ctx) {
    re_BIG_cell(ctx, 50, 50);
}


function ClearNote(ctx) {
    // reset graph 
}
function draw_rect(ctx, stroke, fill) {
    stroke = stroke || 'lightgrey';
    fill = fill || 'dimgrey';
    ctx.save();
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = 5;
    ctx.rect(80, 50, canvas.width - 150, canvas.height - 100);
    ctx.stroke();
    ctx.fill();
    ctx.restore();


}

function draw_cell(ctx, x, y) {
    var stroke = 'transparent';
    var fill = 'red';
    ctx.save();
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = 0;
    var gen = 0;
    width = canvas.width - 210;
    ctx.rect(x, y, 8.5, 8.5);
    ctx.fill();
    ctx.restore();
}

function calcXY(row, col) {
    globalY = row * 10 + 100
    globalX = col * 10 + 100
}
function drawArray(ctx, arr) {

    for (var i = 0; i < length1 ; i++) {

        for (var j = 0; j < width1 ; j++) {
            //console.log("cube[" + i + "][" + j + "] = " + arr[i][j]);
            if (arr[i][j] === 1) {
                calcXY(i, j);
                draw_cell(ctx, globalX, globalY);
            }

        }

    }




}

function draw_grid(rctx, rminor, rmajor, rstroke, rfill) {
    rctx.save();
    rctx.strokeStyle = rstroke;
    rctx.fillStyle = rfill;
    let width = rctx.canvas.width;
    let height = rctx.canvas.height;
    for (var ix = 0; ix < width; ix += rminor) {
        rctx.beginPath();
        rctx.moveTo(ix, 0);
        rctx.lineTo(ix, height);
        rctx.lineWidth = (ix % rmajor == 0) ? 0.5 : 0.25;
        rctx.stroke();
        if (ix % rmajor == 0) { rctx.fillText(ix, ix, 10); }
    }
    for (var iy = 0; iy < height; iy += rminor) {
        rctx.beginPath();
        rctx.moveTo(0, iy);
        rctx.lineTo(width, iy);
        rctx.lineWidth = (iy % rmajor == 0) ? 0.5 : 0.25;
        rctx.stroke();
        if (iy % rmajor == 0) { rctx.fillText(iy, 0, iy + 10); }
    }
    rctx.restore();
}

// this function compares both arrays one number at a time.
// if one number doesn't match, return false. otherwise, return true
function compare(a, b) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }

    return true;
}

function checkNeighbors(array, x, y) {
    var neighbors = 0;

    for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
            if (x + i < 0 || y + j < 0 || x + i == width1 || y + j == length1) {
                //do nothing
            }
            else if (i == 0 && j == 0) {
                //do nothing
            }
            else if (array[x + i][y + j] === 1) {
                //console.log("from array" + [x + i] + [y + j] )
                neighbors++;
            }
            else {
                //do nothing
            }
        }
    }

    return neighbors;
}

function GameOfLife( context) {
    //console.log(array);
    drawArray(context, arry);

    var x_array = new Array();
    var y_array = new Array();
    var value_array = new Array();

    for (var i = 0; i < length1; i++) {
        for (var j = 0; j < width1; j++) {
            //console.log("cube[" + i + "][" + j + "] = " + array[i][j]);
            //console.log(checkNeighbors(array, i, j));

            if (arry[i][j] === 0) {
                if (checkNeighbors(arry, i, j) == 3) {
                    //copy_array[i][j] = 1;
                    //console.log("dead to life");

                    x_array.push(i);
                    y_array.push(j);
                    value_array.push(1);
                }
                else {
                    //console.log("dead still dead");
                }
            }
            else {
                //underpopulation || overpopulation 
                if (checkNeighbors(arry, i, j) <= 1 || checkNeighbors(arry, i, j) >= 4) {
                    x_array.push(i);
                    y_array.push(j);
                    value_array.push(0);
                    //console.log("life to death")
                }
                else {
                    //console.log("life still life")
                }
            }
        }
    }

    for (var i = 0; i < x_array.length; i++) {
        arry[x_array[i]][y_array[i]] = value_array[i];
    }

    refreshGrid(context);
    drawArray(context, arry);

}

function refreshGrid(context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw_grid(context, 10, 50, 'white', 'yellow');
}