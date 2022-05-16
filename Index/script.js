window.addEventListener("scroll", function(){
    var img = document.querySelector("img");
    img.classList.toggle("sticky", window.scrollY > 0)  
})  