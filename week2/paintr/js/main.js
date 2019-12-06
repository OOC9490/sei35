
let hue = 0;  // our hue increment counter

let lastX = 0; // keep track of the last mouse X position

const createBlob = function( x, y ){

  // Make a DIV to add to the page, giving it the position of the mouse
  const $blob = $('<div class="blob">');


  const xVelocity = Math.abs(x - lastX);

  lastX = x;  // update lastX for the next time we use it

  // Valid hue values are 0 - 360, but it will be wrapped back to 0 for us when
  // it reaches 360
  const colour = `hsla(${ hue }, 100%, 50%, 50% )`;

  hue += 10;  // hue = hue + 1;

  const size = xVelocity;

  $blob.css({
    top:  (y - size/2) + 'px',
    left: (x - size/2) + 'px',
    backgroundColor: colour,
    width: size + 'px',
    height: size + 'px',
    // border: '1px solid white'
  });

  $('body').append( $blob );   // attach to the DOM

  if( Math.random() > 0.5 ){

    $blob.animate({
      top: window.innerHeight
    }, 1000, function(){
      $blob.remove();
    }
  );

  } else {

    $blob.animate({
      top: 0
    }, 1000, function(){
      $blob.remove();
    }
  );
  }


};

$(document).ready( function(){

  console.log('DOM loaded!');

  $(document).on('mousemove', function( event ){
    // console.log( event.clientX, event.clientY ); // print out mouse position at time of click

    // Only draw a blob if the shift key was held down
    if( event.shiftKey  ){
      createBlob( event.clientX, event.clientY );
    }

  }); // .on('click')


  $(document).on('keypress', function( event ){

    // Clear the screen on spacebar press
    if( event.key === ' ' ){
      $('div.blob').remove();
    }  //else if ( event.key === '...' )

  }); // .on('keypress')


}); // .ready()
