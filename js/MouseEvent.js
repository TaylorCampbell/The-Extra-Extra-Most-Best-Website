window.onresize = resize;

function resize()
{
adapt();
}

function adapt(){
if ($(window).height() < 368) {
    // do something for small screens
    console.log("reloading iframe to 300")
    document.getElementById("calendarFrame").style.height = "300px";

}
else if ($(window).height() >= 368 &&  $(window).height() <= 468) {
    // do something for medium screens
    console.log("reloading iframe to 400")
    document.getElementById("calendarFrame").style.height = "400px";

}
else if ($(window).height() >= 468 &&  $(window).height() <= 568) {
    // do something for medium screens
    console.log("reloading iframe to 500")
    document.getElementById("calendarFrame").style.height = "500px";

}
else if ($(window).height() >= 568 &&  $(window).height() <= 668) {
    // do something for medium screens
    console.log("reloading iframe to 600")
    document.getElementById("calendarFrame").style.height = "600px";

}
else if ($(window).height() >= 668 &&  $(window).height() <= 768) {
    // do something for medium screens
    console.log("reloading iframe to 600")
    document.getElementById("calendarFrame").style.height = "700px";

}
else if ($(window).height() >= 768 &&  $(window).height() <= 868) {
    // do something for medium screens
    console.log("reloading iframe to 700")
    document.getElementById("calendarFrame").style.height = "800px";

}
else {
    // do something for medium screens
    console.log("reloading iframe to 900")
    document.getElementById("calendarFrame").style.height = "900px";

}
}