$(document).ready(function() {
 
console.log("hit laoder");
  // Fakes the loading setting a timeout
    setTimeout(function() {
        $('body').addClass('loaded');
    }, 3500);
 
});