// alert('terrasystem: voce foi hackeado por Coyas');
// datatables
$(document).ready( function () {
    $('#table_id').DataTable({
        paging: false,
        // scrollY: 400,
        searching: false,
        ordering:  true,
        select: true,
        autoWidth: true,
        responsive: true
    });
} );


// add slidedown and up em despositivos, servicos
$(document).ready(function(){
    $(".fa-chevron-down").click(function(){
        alert('tessra system slidedown');
      $(".devicebox").slideDown("slow");
    });
  });

// script para input mask
$(document).ready(function(){
    $('#inputCardnumber').mask('0000   0000   0000   0000');
    $('#inputCardexpiry').mask('00 / 00');
    $('#inputCVC').mask('000');
    // $('#inputCardholder').mask('AAAAA');
  });

// code do footer
$(document).ready(function() {
   // $("#a").click(function(){
        //$(this).hide();
        //console.log ( $("#z").index() )
     //   $('#creditos').before($('#social'));
     // });
     var $window = $(window);
     
     //$('#social').html("<p>sq</p>");

     // viewport 230-480
     if($window.width() > 319 && $window.width() < 481){
        console.log('$window.width mobile:'+$window.width())
        // alert('teste de swap div footer mobile version');
        $('#a').addClass('aa');
        $('#b').addClass('bb');
        $('.aa').before($('.bb'));
     }else if($window.width() > 479 && $window.width() < 768) {
        // console.log('$window.width nao:'+$window.width())
        $('#a').addClass('aa');
        $('#b').addClass('bb');
        $('.aa').before($('.bb'));
     }


});

// script do bookin
var currentTab = 0;
$(document).ready(function() {



    // step1
    $("#next-1").click(function() {
        if ( !validateForm()) return false;
        $("#step2").show();
        $("#step1").hide();
        currentTab += 1;
    });

    //    step2
    $("#next-2").click(function() {
        if ( !validateForm()) return false;
        $("#step3").show();
        $("#step2").hide();
        $("#status").hide();
        currentTab += 1;
    });
    $("#prev-2").click(function() {
        // if ( !validateForm()) return false;
        $("#step1").show();
        $("#step2").hide();
        currentTab -= 1;
    });

    //    step3 
    // $("#submit").click(function() {
    //     if ( !validateForm()) return false;
    //     $("#form-2").show();
    //     $("#Cardpay").show();
    //     $("#step3").hide();
    //     currentTab += 1;
    // });
 
    $("#prev-3").click(function() {
        // if ( !validateForm()) return false;
        $("#step2").show();
        $("#status").show();
        $("#step3").hide();
        currentTab -= 1;
    });


});


function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    console.log(y);
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value == "") {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false
            valid = false;
        }
    }
    // If the valid status is true, mark the step as finished and valid:
    // if (valid) {
    // document.getElementsByClassName("step")[currentTab].className += " finish";
    // }
    return valid; // return the valid status
}

// fim do script para booking
