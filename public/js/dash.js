// var $ = require( 'jquery' );
// require( 'datatables.net' )( window, $ );

$(document).ready(function() {
    $('#dt-basic-checkbox').DataTable({
        paging:false,
        searching:false,
        select: true,

                columnDefs: [ {
                    orderable: false,
                    className: 'custom-control-input',
                    targets:   0
                } ],
                select: {
                    style:    'os',
                    selector: 'td:first-child'
                },
                /*order: [[ 1, 'asc' ]]*/
  } );
} );
 
// o que isso faz
// document.getElementById("#recarregar").onclick = function () {
//     if (Math.floor(Math.random() * 2)) {
//         customCheck1.checked = true;
//     } else {
//         customCheck1.checked = false;
//     }

//     if (Math.floor(Math.random() * 2)) {
//         customCheck2.checked = true;
//     } else {
//         customCheck2.checked = false;
//     }
// };

// metodo para mudar de reserva corente para antigas assim como mudar de DataTable
// reservas atual
$('#ratual').click(function() {
    // alert( "reservas atual" );
    $( "#ratual" ).addClass('active');
    $( "#rantes" ).removeClass('active');

    
    $('#box').removeClass('invisivels')
    $('#box1').addClass('invisivels')
});

// reservas antigas
$('#rantes').click(function() {
    // alert( "reservas antigas" );
    $( "#rantes" ).addClass('active');
    $( "#ratual" ).removeClass('active');

    
    $('#box1').removeClass('invisivels')
    $('#box').addClass('invisivels')    
    
});
	
// get scroll position in px
// $(document).ready(function(){
//     console.log($("#sumario").scrollTop() + " px");
//   });
$(window).scroll(function() {
    var $height = $(window).scrollTop();
    this.console.log($height)
  if($height > 950) {
        $('#sumario').removeClass('sumario');
        $('#sumario').addClass('sumario2');
        // this.console.log($height)
    }else {
        $('#sumario').removeClass('sumario2');
        $('#sumario').addClass('sumario');
	}
});

/******** make sumary ***********/

// pickupdate
$(document).ready(function(){
    $("#inputPickupdate").change(function(){
        var valor = $('#inputPickupdate').val();
      $(".pickdate").text(valor);
    });
});
// input number
$(document).ready(function(){
    $("#inputNumber").change(function(){
        var valor = $('#inputNumber').val();
      $(".duration").text(valor);
    });
});
// pick up location
$(document).ready(function(){
    $("#inputLocation").change(function(){
        var valor = $('#inputLocation').val();
      $(".uploc").text(valor);
    });
});
// return location
$(document).ready(function(){
    $("#inputLocation2").change(function(){
        var valor = $('#inputLocation2').val();
      $(".urnloc").text(valor);
    });
});