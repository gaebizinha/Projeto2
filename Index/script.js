window.addEventListener("scroll", function(){
    var img = document.querySelector("img");
    img.classList.toggle("sticky", window.scrollY > 0)  
})  

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
var user = {

    insert() {
        var nome = document.querySelector("#nome").value;
        var dataN = document.querySelector("#dataN").value;
        var cpf = parseInt(document.querySelector("#cpf").value);
        var rg = parseInt(document.querySelector("#rg").value);
        var ds_locais = document.querySelector("#ds_locais").value;
        var apl = document.querySelector("#apelido").value;

    

        if (nome) {
            if (nome.trim() != '') {
                $.ajax({
                    type: 'POST',
                    url: api + '/userinsert',
                    data: {nm_nome: nome, dt_nas: dataN, nr_cpf: cpf, nr_rg: rg, ds_locais: ds_locais},
                }).done(function () {
                    users.list();
                }).fail(function (msg) {
                    //console.log('FAIL');
                }).always(function (msg) {
                    //console.log('ALWAYS');
                });
            }
        }
    },
}



