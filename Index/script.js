window.addEventListener("scroll", function(){ 
    var img = document.querySelector("img");
    img.classList.toggle("sticky", window.scrollY > 0)  
})  

$(document).ready(function(){       
    $("#header").load("NavBar.html")
    $("#footer").load("Footer.html")
});
api = 'http://127.0.0.1:3061'


$(document).ready(() => {
    users.list();
});


var users = {
    
    list() {
        $.ajax({
            url: api + '/users',
            type: 'GET',
            success: data => {
                var tx = '';
                tx += '<div class="centerList">';
                data.forEach(element => {
                    tx += '<div class="card slim">';
                        tx += '<h2 class="ttl2">' + element.nm_nome + '</h2>';
                        tx += '<p class="txt1">' + element.dt_nascimento + '</p>';
                        tx += '<div class="actions">';
                        tx += '</div>';
                    tx += '</div>';
                });
                $('#main').html(tx);
            }
        });
        
    }
    
};

var users = {
    
    list() {
        $.ajax({
            url: api + '/vePostagem',
            type: 'GET',
            success: data => {
                var tx = '';
                tx += '<div class="centerList">';
                data.forEach(element => {
                    tx += '<div class="card slim">';
                        tx += '<h2 class="ttl2">' + element.tlt_post + '</h2>';
                        tx += '<p class="txt1" pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}">' + element.dt_post + '</p>';
                        tx += '<p class="txt1">' + element.txt_post + '</p>';  
                        tx += '<div class="actions">';
                        tx += '</div>';
                    tx += '</div>';
                });
                $('#blog').html(tx);
            }
        });
        
    }
    
};