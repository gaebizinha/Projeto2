window.addEventListener("scroll", function(){
    var img = document.querySelector("img");
    img.classList.toggle("sticky", window.scrollY > 0)  
})  

$(document).ready(function(){       
    $("#header").load("NavBar.html")
    $("#footer").load("Footer.html")
});
