window.addEventListener("scroll", function(){ 
    var img = document.querySelector("img");
    img.classList.toggle("sticky", window.scrollY > 0)  
})  

$(function(){ 

    $("#filtro").keyup(function(){
      var texto = $(this).val();
      
      $(".bloco").each(function(){
        var resultado = $(this).text().toUpperCase().indexOf(' '+texto.toUpperCase());
        
        if(resultado < 0) {
          $(this).fadeOut();
        }else {
          $(this).fadeIn();
        }
      }); 
  
    });
  
  });

api = 'http://127.0.0.1:3061'


$(document).ready(() => {
    users.list();
    blog.postagem();
    blogposts.postagens();
    lugaresvisitados.visita();
    atendimentos.tabela();
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
                    tx += '<div class="card slim bloco">';
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
        var locaisOndeFica = document.querySelector("#locais_e").value;
        var alb_abr = document.querySelector("#al_ab").value;
        var domiciP = document.querySelector("#domP").value;
        var qt_ruaS = document.querySelector("#qt_ruaSem").value;
        var qt_alb = document.querySelector("#qt_albSem").value;
        var qt_domPart = document.querySelector("#qt_domP").value;
        console.log(cpf)

    

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

var blog = {
    
    postagem() {
        $.ajax({
            url: api + '/vePostagem',
            type: 'GET',
            success: data => {
                var tx = '';
                tx += '<div class="centerList">';
                data.forEach(element => {
                    tx += '<div class="card slim">';
                        tx += '<h2 class="ttl2">' + element.tlt_post + '</h2>';
                        tx += '<p class="txt1">' + element.dt_post + '</p>';
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

var blogposts = {
    
    postagens() {
        $.ajax({
            url: api + '/vePostagem',
            type: 'GET',
            success: data => {
                var tx = '';
                tx += '<div class="centerList">';
                data.forEach(element => {
                    tx += '<div class="card slim">';
                        tx += '<h2 class="ttl2">' + element.tlt_post + '</h2>';
                        tx += '<p class="txt1">' + element.dt_post + '</p>';
                        tx += '<div class="actions">';
                        tx += '</div>';
                    tx += '</div>';
                });
                $('#postsblog').html(tx);
            }
        });
        
    }
    
};

var subirPost = { //Colocar no onClick

    insert() {
        var titulo_post = document.querySelector("#titulo_post").value;
        var dataP = document.querySelector("#dataP").value;
        var img = document.querySelector("#img_post").value;
        var texto_post = document.querySelector("#texto_post").value;
        

    

        if (titulo_post) {
            if (titulo_post.trim() != '') {
                $.ajax({
                    type: 'POST',
                    url: api + '/criaPostagem',
                    data: {tlt_post: titulo_post ,  dt_post : dataP, img : img, txt_post : texto_post},
                }).done(function () {
                    blog.postagem();
                }).fail(function (msg) {
                    //console.log('FAIL');
                }).always(function (msg) {
                    //console.log('ALWAYS');
                });
            }
        }
    },
}

var lugaresvisitados = {
    
    visita() {
        $.ajax({
            url: api + '/visualizaLugar',
            type: 'GET',
            success: data => {
                var tx = '';
                tx += '<div class="centerList">';
                data.forEach(element => {
                    tx += '<div class="card slim">';
                        tx += '<h2 class="ttl2">' + element.nm_rua + ', ' + element.bairro + '</h2>';
                        tx += '<p class="txt1">' + element.dt_visita + '</p>';
                        tx += '<p class="txt1">Ponto de referencia: ' + element.nm_referencia + '</p>';
                        tx += '<p class="txt1">Número de assistidos encontrados:' + element.nr_pessoas + '</p>';
                        
                        tx += '<div class="actions">';
                        tx += '</div>';
                    tx += '</div>';
                });
                $('#lugaresvisitados').html(tx);
            }
        });
        
    }
    
};

var atendimentos = {
    
    tabela() {
        $.ajax({
            url: api + '/visualizaAtendimentos',
            type: 'GET',
            success: data => {
                var tx = '';
                data.forEach(element => {
                    tx += '<tr><td>' + element.id_atendido + '</td><td>' + element.nm_nome + '</td><td>' + element.dt_atendimento + ' </td><td>' + element.dt_horario + '</td><td>' + element.nr_lanches + '</td><td>' + element.atividades + '</td><td>' + element.qt_banho + '</td><td>' + element.id_toalha + '</td><td>' + element.qt_bazar + '</td></tr>'
                });
                $('#tbody').html(tx);
            }
        });
        
    }
    
};


