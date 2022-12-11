var gl;
var points;

window.onload = function init(){
var canvas = document.getElementById( "gl-canvas");
        
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" );
 }
    // Four Vertices

    var vertices = [
        vec2( 0.0, 0.5),
        vec2( -0.5, -0.5),
        vec2( 0.5, -0.5)
    ];

    // vertices colors
    var vertexColors=[
        vec4( 1.0, 0.0, 0.0, 0.0 ),  // black or red?
        vec4( 1.0, 0.0, 0.0, 0.0 ),  // red or black?
        vec4( 1.0, 0.0, 0.0, 0.0 ),  // yellow
        vec4( 0.0, 0.0, 0.0, 0.0 ),  // green
        vec4( 0.0, 0.0, 0.0, 0.0 ),  // blue
        vec4( 0.0, 0.0, 0.0, 0.0 ),  // magenta
        vec4( 0.0, 0.0, 0.0, 0.0 )   // cyan
    ]

// Configure WebGL
 
 gl.viewport( 0, 0, canvas.width, canvas.height );
 gl.clearColor( 0, 1, 0, 1 ); // red, green, blue, alpha(opacity)

  // Load shaders and initialize attribute buffers
 var program = initShaders( gl, "vertex-shader", "fragment-shader" );
 gl.useProgram( program );

 // load color buffer for vertex
var colorBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);

 // load color
 var vColor = gl.getAttribLocation(program, "vColor");
gl.vertexAttribPointer( vColor, 1, gl.FLOAT, false, 0, 0 ); //error produced here
gl.enableVertexAttribArray( vColor );

 // Load the data into the GPU
 var bufferId = gl.createBuffer();
 gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
 gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

  // Associate out shader variables with our data buffer
 var vPosition = gl.getAttribLocation( program, "vPosition" );
 gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
 gl.enableVertexAttribArray( vPosition );

     render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 3);
    //gl.drawArrays(gl.TRIANGLES_FAN, 3, 6)
    //gl.drawArrays(gl.TRIANGLE_FAN, 0,3);
    //gl.drawArrays(gl.TRIANGLE_STRIP, 0,4);
    //window.requestAnimFrame(render, canvas);
}