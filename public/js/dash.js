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

