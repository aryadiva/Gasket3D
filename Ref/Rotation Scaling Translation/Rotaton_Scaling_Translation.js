var gl;

var angleDegrees =  0.0;
var angleRadians = 0.0;
var scale = 1;
var xaxis = 0;
var yaxis = 0;

var requestId;

window.onload = function init(){
	var canvas = document.getElementById( "gl-canvas" );
		
	gl = WebGLUtils.setupWebGL( canvas );
	if ( !gl ) 
	{ 
		alert( "WebGL isn't available" );
	}

	var vertices = [
		vec2(   0.1, -0.1 ),
		vec2(  -0.0,  0.1 ),
		vec2(  -0.1, -0.1 ),
	];

	//  Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 0.0, 1.0, 0.0, 1.0 );

	//  Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	// Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

	// Associate out shader variables with our data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	xLoc = gl.getUniformLocation( program, "xloc" );
	yLoc = gl.getUniformLocation( program, "yloc" );

	scaleLoc = gl.getUniformLocation( program, "scale" );

	xaxisLoc = gl.getUniformLocation( program, "xaxis" );
	yaxisLoc = gl.getUniformLocation( program, "yaxis" );

    document.getElementById("rotate-r").onchange = function() {
        angleDegrees =  event.srcElement.value;
        angleRadians = angleDegrees * Math.PI/180.0;
    };

	document.getElementById("scale").onchange = function() {
        scale = event.srcElement.value;
    };
	
	document.getElementById("axis-x").onchange = function() {
        xaxis = event.srcElement.value;
    };

    document.getElementById("axis-y").onchange = function() {
        yaxis = event.srcElement.value;
    };
	
    document.getElementById("Reset").onclick = function () {
        angleDegrees =  0.0;
        angleRadians = 0.0;
        document.getElementById('rotate-r').value = angleDegrees;
		
		scale = 1.0;
        document.getElementById('scale').value = scale;
		
		xaxis = 0;
        yaxis = 0;
        document.getElementById('axis-x').value = xaxis;
        document.getElementById('axis-y').value = yaxis;
    };
	
	document.getElementById("Start").onclick = function() 
	{
		animation();
		document.getElementById("Start").disabled = true;
		document.getElementById("Stop").disabled = false;
		/* 
		document.getElementById('rotate-r').disabled = true;
		document.getElementById('scale').disabled = true;
		document.getElementById('axis-x').disabled = true;
		document.getElementById('axis-y').disabled = true; */
	}
	
	document.getElementById("Stop").onclick = function()
	{
		window.cancelAnimationFrame(requestId);
		document.getElementById("Stop").disabled = true;
		document.getElementById("Start").disabled = false;
		
		/* document.getElementById('rotate-r').disabled = false;
		document.getElementById('scale').disabled = false;
		document.getElementById('axis-x').disabled = false;
		document.getElementById('axis-y').disabled = false;	 */	
	}
    render();
};

function animation()
{
	angleRadians += 0.01;
	
	xvalue = Math.sin(angleRadians);
	yvalue = Math.cos(angleRadians);
	gl.uniform1f( xLoc, xvalue );
	gl.uniform1f( yLoc, yvalue );
	
	requestId = requestAnimFrame(animation);
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    document.getElementById('textrotate').value = angleDegrees;
	document.getElementById('textscale').value = scale; 
	document.getElementById('textaxisx').value = xaxis;
    document.getElementById('textaxisy').value = yaxis;
	
	xvalue = Math.sin(angleRadians);
	yvalue = Math.cos(angleRadians);
	gl.uniform1f( xLoc, xvalue );
	gl.uniform1f( yLoc, yvalue );

    gl.uniform1f(xaxisLoc, xaxis)
    gl.uniform1f(yaxisLoc, yaxis)
	
	gl.uniform1f(scaleLoc, scale)
	
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
    requestAnimFrame(render);
}


