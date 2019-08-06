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
document.getElementById("recarregar").onclick = function () {
    if (Math.floor(Math.random() * 2)) {
        customCheck1.checked = true;
    } else {
        customCheck1.checked = false;
    }

    if (Math.floor(Math.random() * 2)) {
        customCheck2.checked = true;
    } else {
        customCheck2.checked = false;
    }
};

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

// fazer os sumary flotoante
