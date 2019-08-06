var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

// $(document).ready(function(){
//     $('div.faq a img').click(function(){
//       $('a img').removeClass("ativo");
//       $(this).addClass("ativo");
//   });
//   });

$(window).on('load', function() {
    
    // code here
    $('div.faq a img').click(function(){
         $('a img').removeClass("ativo");
         $(this).addClass("ativo");
    });
 });

//  window.addEventListener("load", function(){
//     // Your code
//     $('div.faq a img').click(function(){
//         $('a img').removeClass("ativo");
//         $(this).addClass("ativo");
//    });
// });