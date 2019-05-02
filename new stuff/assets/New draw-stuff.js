
var arry = [];
var length1 = 20; 
var width1 = 20;
var globalX = 0; 
var globalY = 0; 

function createArray ()
{

for(var i = 0; i < length1; i++)
{
    arry[i] = [];
    for(var j = 0; j < width1; j++)
    {
        arry[i][j] = 0;
    }
}



}
function test(ctx)
{
	createArray(); 
	drawArray(ctx, arry); 
}
function draw_BIG_cell (ctx, x, y)
{
	var stroke = 'transparent';
	var  fill = 'Green';
	ctx.save();
	ctx.strokeStyle = stroke;
	ctx.fillStyle = fill;
	ctx.lineWidth = 0;
	var gen = 0;
	width = canvas.width - 210;
	ctx.rect(x,y,17,17);
	ctx.fill();
	//ctx.restore();
}
function re_BIG_cell (ctx, x, y)
{
	var stroke = 'transparent';
	var  fill = 'black';
	ctx.save();
	ctx.strokeStyle = stroke;
	ctx.fillStyle = fill;
	ctx.lineWidth = 0;
	var gen = 0;
	width = canvas.width - 210;
	ctx.rect(x,y,17,17);
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
    var fill = 'green';
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
// uper signals 
function NoteStateMachineReadRight_up(ctx, ctx4)
{
        
        globalX += 10;
        read_turing_cell(ctx4, globalX, globalY);
        currentState++;
        tmpArrSet[0] = DrawArr[i - 1];
	    draw_BIG_cell(ctx, 50,50); 
}

function NoteStateMachineReadMiddle_up(ctx, ctx4)
{
        globalX += 10;
        read_turing_cell(ctx4, globalX, globalY);
        currentState++;
        tmpArrSet[1] = DrawArr[i];
        draw_BIG_cell(ctx, 50,50);
	
}

function NoteStateMachineReadLeft_up(ctx, ctx4)
{
        globalX -= 10;
        read_turing_cell(ctx4, globalX, globalY);
        currentState++;
        tmpArrSet[2] = DrawArr[i + 1];
		draw_BIG_cell(ctx, 50,50); 
}


// middle signels 

function NoteStateMachineReadRight(ctx, ctx4)
{
        
        globalX += 10;
        read_turing_cell(ctx4, globalX, globalY);
        currentState++;
        tmpArrSet[0] = DrawArr[i - 1];
	    draw_BIG_cell(ctx, 50,50); 
}

function NoteStateMachineReadMiddle(ctx, ctx4)
{
        globalX += 10;
        read_turing_cell(ctx4, globalX, globalY);
        currentState++;
        tmpArrSet[1] = DrawArr[i];
        draw_BIG_cell(ctx, 50,50);
	
}

function NoteStateMachineReadLeft(ctx, ctx4)
{
        globalX -= 10;
        read_turing_cell(ctx4, globalX, globalY);
        currentState++;
        tmpArrSet[2] = DrawArr[i + 1];
		draw_BIG_cell(ctx, 50,50); 
}

// bottom signals 

function NoteStateMachineReadRight_down(ctx, ctx4)
{
        
        globalX += 10;
        read_turing_cell(ctx4, globalX, globalY);
        currentState++;
        tmpArrSet[0] = DrawArr[i - 1];
	    draw_BIG_cell(ctx, 50,50); 
}

function NoteStateMachineReadMiddle_down(ctx, ctx4)
{
        globalX += 10;
        read_turing_cell(ctx4, globalX, globalY);
        currentState++;
        tmpArrSet[1] = DrawArr[i];
        draw_BIG_cell(ctx, 50,50);
	
}

function NoteStateMachineReadLeft_down(ctx, ctx4)
{
        globalX -= 10;
        read_turing_cell(ctx4, globalX, globalY);
        currentState++;
        tmpArrSet[2] = DrawArr[i + 1];
		draw_BIG_cell(ctx, 50,50); 
}


function NoteStateMachineWrite(ctx)
{
		draw_BIG_cell(ctx, 300,120); 
}

function NoteStateMachineMove(ctx, ctx4)
{
        i++;
        currentState++;
        globalX += 10;
        move_turing_cell(ctx4, globalX, globalY);
		draw_BIG_cell(ctx,50,50); 
}
 // writ move remove death signals 
function NoteStateMachineWriteCellR(ctx)
{
		draw_BIG_cell(ctx, 300,30); 
}
function NoteStateMachineWriteCellL(ctx)
{
		draw_BIG_cell(ctx, 100,30); 


function NoteStateMachineBirth(ctx, ctx4)
{
        
        globalX += 10;
        read_turing_cell(ctx4, globalX, globalY);
        currentState++;
        tmpArrSet[0] = DrawArr[i - 1];
	    draw_BIG_cell(ctx, 50,50); 
}

function NoteStateMachineRemove(ctx, ctx4)
{
        globalX += 10;
        read_turing_cell(ctx4, globalX, globalY);
        currentState++;
        tmpArrSet[1] = DrawArr[i];
        draw_BIG_cell(ctx, 50,50);
	
}

function NoteStateMachineDeath(ctx, ctx4)
{
        globalX -= 10;
        read_turing_cell(ctx4, globalX, globalY);
        currentState++;
        tmpArrSet[2] = DrawArr[i + 1];
		draw_BIG_cell(ctx, 50,50); 
}

function NoteStateMachineWriteCellM(ctx,ctx3,ctx4)
{
        globalY += 10;
        write_turing_cell(ctx4, globalX, globalY);
        draw_cell(ctx,globalX, globalY );
        globalY -= 10;
        currentState = 0;
		draw_BIG_cell(ctx3, 50,30); 
}


/// reset functions  


function reNoteStateMachineReadRight(ctx)
{
	re_BIG_cell(ctx, 50,50); 
}

function reNoteStateMachineReadMiddle(ctx)
{
 
	re_BIG_cell(ctx, 50,50);
}

function reNoteStateMachineReadLeft(ctx)
{
		re_BIG_cell(ctx, 50,50); 
}

function reNoteStateMachineWrite(ctx)
{
		re_BIG_cell(ctx, 50,50); 
}

function reNoteStateMachineMove(ctx)
{
		re_BIG_cell(ctx, 50,50); 
}

function reNoteStateMachineWriteCellR(ctx)
{
		re_BIG_cell(ctx, 300,30); 
}
function reNoteStateMachineWriteCellL(ctx)
{
		re_BIG_cell(ctx, 100,30); 
}
function reNoteStateMachineWriteCellM(ctx)
{
		re_BIG_cell(ctx, 50,30); 
}
function ClearNote(ctx )
{
	// reset graph 
}
function draw_rect( ctx, stroke, fill ) 
{
    stroke = stroke || 'lightgrey';
    fill = fill || 'dimgrey';
    ctx.save( );
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = 5;
    ctx.rect(80, 50, canvas.width - 150, canvas.height - 100);
    ctx.stroke();
    ctx.fill();
    ctx.restore( );
	

}

function draw_cell (ctx, x, y)
{
	var stroke = 'transparent';
	var  fill = 'red';
	ctx.save();
	ctx.strokeStyle = stroke;
	ctx.fillStyle = fill;
	ctx.lineWidth = 0;
	var gen = 0;
	width = canvas.width - 210;
	ctx.rect(x,y,8.5,8.5);
	ctx.fill();
	ctx.restore();
}

function calcXY(row,col)
{
	globalY = row * 10 + 100
	globalX = col * 10 + 100
}
 function drawArray (ctx, arr )
 {
	 
	 for(var i = 0; i < length1 ;i++)
	 {
		 
		 for(var j = 0; j < width1 ; j++)
		 {
			console.log("cube[" + i + "][" + j + "] = " + arr[i][j]);
			if(arr[i][j] === 1)
			{
			calcXY(i,j); 
			draw_cell(ctx,globalX,globalY); 
			} 
			 
		 }
		 
	 }
 
	 
	 
	 
 }




function draw_grid( rctx, rminor, rmajor, rstroke, rfill  ) 
{
    rctx.save( );
    rctx.strokeStyle = rstroke;
    rctx.fillStyle = rfill;
    let width = rctx.canvas.width;
    let height = rctx.canvas.height;
    for ( var ix = 0; ix < width; ix += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( ix, 0 );
        rctx.lineTo( ix, height );
        rctx.lineWidth = ( ix % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        if ( ix % rmajor == 0 ) { rctx.fillText( ix, ix, 10 ); }
    }
    for ( var iy = 0; iy < height; iy += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( 0, iy );
        rctx.lineTo( width, iy );
        rctx.lineWidth = ( iy % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        if ( iy % rmajor == 0 ) {rctx.fillText( iy, 0, iy + 10 );}
    }
    rctx.restore( );
}

// this function compares both arrays one number at a time.
// if one number doesn't match, return false. otherwise, return true
function compare(a, b)
{
	for(var i = 0; i < a.length; i++)
		{
			if (a[i] !== b[i]) return false;
		}

	return true;
}