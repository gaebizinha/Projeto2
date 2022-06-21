window.addEventListener("scroll", function () { //faz o icone subir quando a pagina rola para cima
  var img = document.querySelector("img");
  img.classList.toggle("sticky", window.scrollY > 0);
});

api = "http://127.0.0.1:3061"; 

//Usado para so precisar link nav e footer nas paginas e não precisar escrever todo o código.
$(document).ready(function () {
  $("#header").load("NavBar.html");
  $("#footer").load("Footer.html");
  $("#OndeEstamos").load("OndeEstamos.html")
});

//Faz os as funções GET serem ativados quando o documento é aberto
$(document).ready(() => {
  getDonation.getDonation();
  getDonation2.getDonation2();
  users.list();
  blog.postagem();
  blogposts.postagens();
  lugaresvisitados.visita();
  atendimentos.tabela();
  doadores.dados();
  VoluntarioPriv.cadastroV();
});

//Integração tabela acolhido ------------------------------------//

//Mostra pessoas cadastradas -> Foi usado o metodo Get ---------//
var users = {
  list() {
    $.ajax({
      url: api + "/users",
      type: "GET",
      success: (data) => {
        var tx = "";
        tx += '<div class="centerList">';
        data.forEach((element) => {
          tx += '<div class="card slim bloco">';
          tx += '<input  id="id'+element.id_atendido+'" value="'+element.id_atendido+'" disabled>';
          tx += '<input class="ttl2" id="nome'+element.id_atendido+'" value="' + element.nm_nome +'" >';
          tx += '<input class="txt1" id="dt'+element.id_atendido+'" value="'+ element.dt_nascimento +'" disabled>';
          tx += '<input class="txt1" id="cpf'+element.id_atendido+'" value="'+ element.nr_cpf +'" disabled>';
          tx += '<input class="txt1" id="rg'+element.id_atendido+'" value="'+ element.nr_rg +'" disabled>' ;
          tx += '<input class="txt1" id="inL'+element.id_atendido+'" value="'+ element.in_locais + '" disabled>';
          tx += '<input class="txt1" id="dsL'+element.id_atendido+'"value="'+ element.ds_locais +'" disabled>' ;
          tx += '<input class="txt1" id="ds_A'+element.id_atendido+'" value="'+ element.ds_albergue +'" disabled>';
          tx += '<input class="txt1" id="ds_domici'+element.id_atendido+'" value="'+ element.ds_domiciliopart +'" disabled>';
          tx += '<input class="txt1" id="qt_rua'+element.id_atendido+'" value="'+ element.qt_rua +'" disabled>';
          tx += '<input class="txt1" id="qt_A'+element.id_atendido+'" value="'+ element.qt_albuergue +'" disabled>';
          tx += '<input class="txt1"  id="qt_dom'+element.id_atendido+'" value="'+ element.qt_domicilio +'" disabled>';
          tx += '<input class="txt1"  id="qt_mr'+element.id_atendido+'" value="'+ element.qt_morarua +'" disabled>';
          tx += '<input class="txt1" id="motivR'+element.id_atendido+'" value="'+ element.motivRua +'" disabled>';
          tx += '<input class="txt1" id="tempC'+element.id_atendido+'" value="'+ element.TempCid +'" disabled>';
          tx += '<input class="txt1" id="familia'+element.id_atendido+'" value="'+ element.st_familia +'" disabled>';
          tx += '<input class="txt1" id="ds_com'+element.id_atendido+'" value="'+ element.ds_comunitarias +'" disabled>';
          tx += '<input class="txt1" id="ds_a'+element.id_atendido+'" value="'+ element.ds_atendido +'" disabled>';
          tx += '<input class="txt1" id="carteira'+element.id_atendido+'" value="'+ element.st_carteiratrab +'" disabled>';
          tx += '<input class="txt1" id="ds_r'+element.id_atendido+'" value="'+ element.ds_renda +'" disabled>';
          tx += '<input class="txt1" id="prog'+element.id_atendido+'" value="'+ element.ds_progrenda +'" disabled>';
          tx += '<input class="txt1" id="proGR'+element.id_atendido+'" value="'+ element.ds_programarenda +'" disabled>';
          tx += '<input class="txt1" id="sd1'+element.id_atendido+'" value="'+ element.ecServico1_data +'" disabled>';
          tx += '<input class="txt1" id="s1'+element.id_atendido+'" value="'+ element.ecServico1 +'" disabled>';
          tx += '<input class="txt1" id="sd2'+element.id_atendido+'" value="'+ element.ecServico2_data +'" disabled>';
          tx += '<input class="txt1" id="s2'+element.id_atendido+'" value="'+ element.ecServico2 +'" disabled>';
          tx += '<button class="smbtn" id="most'+element.id_atendido+'" onclick="lb('+element.id_atendido+')">Editar</button>'



          tx += '<div class="actions">';
          tx += "</div>";
          tx += "</div>";
        });
        $("#main").html(tx);
      },
    });
  },
};

//Cadastra pessoas no banco de dados a partir do formulario --------------//
var user = {
  insert() {
    var nome = document.querySelector("#nome").value;
    var apl = document.querySelector("#apelido").value;
    var dataN = document.querySelector("#dataN").value;
    var cpf = parseInt(document.querySelector("#cpf").value);
    var rg = parseInt(document.querySelector("#rg").value);
    var in_loc = document.querySelector("#locais_e").value;
    var ds_l = document.querySelector("#ds_locais").value;
    var alb_abr = document.querySelector("#al_ab").value;
    var domiciP = document.querySelector("#domP").value;
    var locaisOndeFica = document.querySelector("#locais_e").value;
    var qt_ruaS = document.querySelector("#qt_ruaSem").value;
    var qt_alb = document.querySelector("#qt_albSem").value;
    var qt_domPart = document.querySelector("#qt_domP").value;
    var tDRua = document.querySelector("#tempoRua").value;
    var moTRua = document.querySelector("#motivoRua").value;
    var TemC = document.querySelector("#qtCidade").value;
    var fVRua = document.querySelector("#famVRua").value;
    var dsC = document.querySelector("#atvComutarias7dias").value;
    var atdLug = document.querySelector("#lugares6M").value;
    var cTrab = document.querySelector("#cartTra").value;
    var FazDinheiro = document.querySelector("#oqFazDinheiro").value;
    var ProgRen = document.querySelector("#progRenda").value;
    var qProgRe = document.querySelector("#qProgRenda").value;
    var dtS1 = parseInt(document.querySelector("#dtaServ1").value);
    var ser1 = document.querySelector("#serv1").value;
    var dtS2 = parseInt(document.querySelector("#dtServ2").value);
    var ser2 = document.querySelector("#serv2").value;
    console.log(cpf);

    if (nome) {
      if (nome.trim() != "") {
        $.ajax({
          type: "POST",
          url: api + "/userinsert",
          data: {
            nm_nome: nome,
            dt_nas: dataN,
            nr_cpf: cpf,
            nr_rg: rg,
            in_locais: in_loc,
            ds_locais: ds_l,
            albuergue: alb_abr,
            ds_domiciliop: domiciP,
            qt_r: qt_ruaS,
            qt_albuergue: qt_alb,
            qt_dom: qt_domPart,
            qt_rua: tDRua,
            moRua: moTRua,
            tempCid: TemC,
            st_f: fVRua,
            ds_com: dsC,
            ds_at: atdLug,
            st_cattrab: cTrab,
            ds_renda: FazDinheiro,
            ds_progren: ProgRen,
            programar: qProgRe,
            dt_Serv1: dtS1,
            Serv1: ser1,
            dt_Serv2: dtS2,
            Serv2: ser2,
          },
        })
          .done(function () {
            users.list();
          })
          .fail(function (msg) {
            //console.log('FAIL');
          })
          .always(function (msg) {
            //console.log('ALWAYS');
          });
      }
    }
  },
};

//Integração tabela post (BLOG) --------------------------------------//

//Mostra postagem no site -> Foi usado o metodo GET -------------------//
var blog = {
  postagem() {
    $.ajax({
      url: api + "/vePostagem",
      type: "GET",
      success: (data) => {
        var tx = "";
        tx += '<div class="centerList">';
        data.forEach((element) => {
          tx += '<div class="card slim">';
          tx += '<h2 class="ttl2">' + element.tlt_post + "</h2>";
          tx += '<p class="txt1">' + element.dt_post + "</p>";
          tx += '<p class="txt1">' + element.txt_post + "</p>";

          tx += '<div class="actions">';
          tx += "</div>";
          tx += "</div>";
        });
        $("#blog").html(tx);
      },
    });
  },
};

//Mostra postagens na area privada -> Usado GET ---------------------------//
var blogposts = {
  postagens() {
    $.ajax({
      url: api + "/vePostagem",
      type: "GET",
      success: (data) => {
        var tx = "";
        tx += '<div class="centerList">';
        data.forEach((element) => {
          tx += '<div class="card slim">';
          tx += '<h2 class="ttl2">' + element.tlt_post + "</h2>";
          tx += '<p class="txt1">' + element.dt_post + "</p>";
          tx += `<button onclick="subirPost.delete('${element.tlt_post}')">Excluir</button>`;
          tx += '<div class="actions">';
          tx += "</div>";
          tx += "</div>";
        });
        $("#postsblog").html(tx);
      },
    });
  },
};


var subirPost = {
  //Colocar no onClick

  insert() { //Cadastra postagem no banco de dados ---------------------//
    var titulo_post = document.querySelector("#titulo_post").value;
    var dataP = document.querySelector("#dataP").value;
    var img = document.querySelector("#img_post").value;
    var texto_post = document.querySelector("#texto_post").value;

    if (titulo_post) {
      if (titulo_post.trim() != "") {
        $.ajax({
          type: "POST",
          url: api + "/criaPostagem",
          data: {
            tlt_post: titulo_post,
            dt_post: dataP,
            img: img,
            txt_post: texto_post,
          },
        })
          .done(function () {
            blog.postagem();
          })
          .fail(function (msg) {
            //console.log('FAIL');
          })
          .always(function (msg) {
            //console.log('ALWAYS');
          });
      }
    }
  },

  delete(tlt_post) { //Deleta postagem do banco de dados ---------------------//
    $.ajax({
      type: "DELETE",
      url: api + "/excluiPostagem",
      data: { tlt_post: tlt_post },
    }).done(() => {
      window.location.reload();
    });
  },
};

//Integração tabela lugares ---------------------------------------------------//

//Mostra Lugares visitados -> Metodo GET ------------------------------------------//
var lugaresvisitados = {
  visita() {
    $.ajax({
      url: api + "/visualizaLugar",
      type: "GET",
      success: (data) => {
        var tx = "";
        tx += '<div class="centerList">';
        data.forEach((element) => {
          tx += '<div class="card slim">';
          tx +=
            '<h2 class="ttl2">' +
            element.nm_rua +
            ", " +
            element.bairro +
            "</h2>";
          tx += '<p class="txt1">' + element.dt_visita + "</p>";
          tx +=
            '<p class="txt1">Ponto de referencia: ' +
            element.nm_referencia +
            "</p>";
          tx +=
            '<p class="txt1">Número de assistidos encontrados:' +
            element.nr_pessoas +
            "</p>";
          tx += `<button onclick="acoeslugares.delete('${element.nm_rua}')">Excluir</button>`;

          tx += '<div class="actions">';
          tx += "</div>";
          tx += "</div>";
        });
        $("#lugaresvisitados").html(tx);
      },
    });
  },
};

//Insere dados no banco de dados
var acoeslugares = {
  insert() {
    var nm_rua = document.querySelector("#nm_rua").value;
    var bairro = document.querySelector("#bairro").value;
    var dt_visita = document.querySelector("#dt_visita").value;
    var nm_referencia = document.querySelector("#nm_referencia").value;
    var nr_pessoas = document.querySelector("#nr_pessoas").value;

    if (nm_rua) {
      if (nm_rua.trim() != "") {
        $.ajax({
          type: "POST",
          url: api + "/cadastraLugar",
          data: {
            nm_rua: nm_rua,
            bairro: bairro,
            dt_visita: dt_visita,
            nm_referencia: nm_referencia,
            nr_pessoas: nr_pessoas,
          },
        })
          .done(function () {
            lugaresvisitados.visita();
            alert("Salvo com sucesso");
          })
          .fail(function (msg) {
            //console.log('FAIL');
          })
          .always(function (msg) {
            //console.log('ALWAYS');
          });
      }
    }
  },

  //deleta do banco de dados
  delete(nm_rua) {
    $.ajax({
      type: "DELETE",
      url: api + "/excluiLugar",
      data: { nm_rua: nm_rua },
    }).done(() => {
      window.location.reload();
    });
  },
};
//Integração dos atendimentos -----------/
//Usa o get para mostrar atendimentos realizados em uma tabela
var atendimentos = {
  tabela() {
    $.ajax({
      url: api + "/visualizaAtendimentos",
      type: "GET",
      success: (data) => {
        var tx = "";
        data.forEach((element) => {
          tx +=
            "<tr><td>" +
            element.id_atendido +
            "</td><td>" +
            element.nm_nome +
            "</td><td>" +
            element.dt_atendimento +
            " </td><td>" +
            element.dt_horario +
            "</td><td>" +
            element.nr_lanches +
            "</td><td>" +
            element.atividades +
            "</td><td>" +
            element.qt_banho +
            "</td><td>" +
            element.id_toalha +
            "</td><td>" +
            element.qt_bazar +
            "</td><td>" +
            `<button onclick="novoAtendimento.delete('${element.id_atendido}')">Excluir</button>` +
            "</td></tr>";

        });
        $("#tbody").html(tx);
      },
    });
  },
};

//Insere atendimentos no banco de dados
var novoAtendimento = {
  //Colocar no onClick

  insert() {
    var id_atendido = document.querySelector("#id_atendido").value;
    var nm_nome = document.querySelector("#nm_nome").value;
    var dt_atendimento = document.querySelector("#data_at").value;
    var dt_horario = document.querySelector("#hora_at").value;
    var nr_lanches = document.querySelector("#nr_lanches").value;
    var atividades = document.querySelector("#ativ").value;
    var qt_bazar = document.querySelector("#qt_bazar").value;
    var qt_banho = document.querySelector("#qt_banho").value;
    var id_toalha = document.querySelector("#id_toalha").value;

    if (id_atendido) {
      if (id_atendido.trim() != "") {
        $.ajax({
          type: "POST",
          url: api + "/criaAtendimento",
          data: {
            id_atendido: id_atendido,
            nm_nome: nm_nome,
            dt_atendimento: dt_atendimento,
            dt_horario: dt_horario,
            nr_lanches: nr_lanches,
            atividades: atividades,
            qt_bazar: qt_bazar,
            qt_banho: qt_banho,
            id_toalha: id_toalha,
          },
        })
          .done(function () {
            atendimentos.tabela();
          })
          .fail(function (msg) {
            //console.log('FAIL');
          })
          .always(function (msg) {
            //console.log('ALWAYS');
          });
      }
    }
  },
  //deleta atendimentos do banco de dados
  delete(id_atendido) {
    $.ajax({
      type: "DELETE",
      url: api + "/excluiAtendimento",
      data: { id_atendido: id_atendido },
    }).done(() => {
      window.location.reload();
    });
  },
};

//Integração da tabela doadores

//Mostra doadores cadastrados na area privada
var doadores = {
  dados() {
    $.ajax({
      url: api + "/visualizaDoacao", 
      type: "GET",
      success: (data) => {
        var tx = "";
        data.forEach((element) => {
          tx +=
            "<tr><td>" +
            element.nm_nomedoador +
            "</td><td>" +
            element.nm_email +
            "</td><td>" +
            element.nr_celular +
            " </td><td>" +
            element.dt_doacao +
            "</td><td>" +
            `<button onclick="novosdoadores.delete('${element.nm_email}')">Excluir</button>` +
            "</td></tr>";
            
        });
        $("#doadores").html(tx);
      },
    });
  },
};

//insere dados no banco de dados
var novosdoadores = {
  //Colocar no onClick

  insert() {
    var nm_nomedoador = document.querySelector("#nm_nomedoador").value;
    var nm_email = document.querySelector("#nm_email").value;
    var nr_celular = document.querySelector("#nr_celular").value;
    var dt_doacao = document.querySelector("#dt_doacao").value;

    if (nm_nomedoador) {
      if (nm_nomedoador.trim() != "") {
        $.ajax({
          type: "POST",
          url: api + "/cadastraDoador",
          data: {
            nm_nomedoador: nm_nomedoador,
            nm_email: nm_email,
            nr_celular: nr_celular,
            dt_doacao: dt_doacao,
          },
        })
          .done(function () {
            doadores.dados();
          })
          .fail(function (msg) {
            //console.log('FAIL');
          })
          .always(function (msg) {
            //console.log('ALWAYS');
          });
      }
    }
  },
  //deleta dados do banco de dados
  delete(nm_email) {
    $.ajax({
      type: "DELETE",
      url: api + "/excluiDoador",
      data: { nm_email: nm_email},
    }).done(() => {
      window.location.reload();
    });
  },
};
//Inegração da databela Voluntarios
//Mostra voluntarios cadastrados
var VoluntarioPriv = {
  cadastroV() {
    $.ajax({
      url: api + "/visualizaVoluntario",
      type: "GET",
      success: (data) => {
        var tx = "";
        data.forEach((element) => {
          tx +=
            "<tr><td>" +
            element.voluntario +
            "</td><td>" +
            element.nm_email +
            "</td><td>" +
            element.dt_idade +
            " </td><td>" +
            element.nr_tel +
            " </td><td>" +
            element.dr_ajuda +
            "</td><td>" +
            `<button onclick="cadastroVoluntario.delete('${element.nm_email}')">Excluir</button>` +
            "</td></tr>";
        });
        $("#Vbody").html(tx);
      },
    });
  },
};

//Cadastra no banco de dados
var cadastroVoluntario = {
  //Colocar no onClick

  insert() {
    var voluntario = document.querySelector("#voluntario").value;
    var nm_email = document.querySelector("#nm_email").value;
    var dt_idade = document.querySelector("#dt_idade").value;
    var nr_tel = document.querySelector("#nr_tel").value;
    var dr_ajuda = document.querySelector("#dr_ajuda").value;

    if (voluntario) {
      if (voluntario.trim() != "") {
        $.ajax({
          type: "POST",
          url: api + "/cadastraVoluntario",
          data: {
            voluntario: voluntario,
            nm_email: nm_email,
            dt_idade: dt_idade,
            nr_tel: nr_tel,
            dr_ajuda: dr_ajuda,
          },
        })
          .done(function () {
            voluntarioPriv.cadastroV();
          })
          .fail(function (msg) {
            //console.log('FAIL');
          })
          .always(function (msg) {
            //console.log('ALWAYS');
          });
      }
    }
  },
  //deleta do banco de dados
  delete(nm_email) {
    $.ajax({
      type: "DELETE",
      url: api + "/excluiVoluntario",
      data: { nm_email: nm_email},
    }).done(() => {
      window.location.reload();
    });
  },
};

//Inegração das tabela doacao

//Cadastra no banco da dados
var postDonation = {
  postDonation() {
    var tlt_doacao = document.querySelector("#titulo_doacao").value;
    var ds_doacao = document.querySelector("#dataP").value;
    var vl_valor = document.querySelector("#val_post").value;

    $.ajax({
      url: api + "/criaDoacao",
      type: "POST",
      data: { tlt_doacao: tlt_doacao, ds_doacao: ds_doacao, vl_valor: vl_valor },
    });
  },
  //deleta do banco de dados
  delete(tlt_doacao) {
    $.ajax({
      type: "DELETE",
      url: api + "/excluiDoacao",
      data: { tlt_doacao: tlt_doacao},
    }).done(() => {
      window.location.reload();
      alert("Excluido com sucesso")
    });
  },
};
//Mostra doação na area privada
var getDonation = {
  getDonation() {
    $.ajax({
      url: api + "/veDoacao",
      type: "GET",
      success: (data) => {
        var tx = "";
        tx += '<div class="centerList">';
        data.forEach((element) => {
          tx += '<div class="card slim">';
          tx += '<h2 class="ttl2">' + element.tlt_doacao + "</h2>";
          tx += '<p class="txt2">' + "R$ " + element.vl_valor + "</p>";
          tx += '<p class="txt2">' + element.ds_doacao + "</p>";
          tx += `<button onclick="postDonation.delete('${element.titulo_doacao}')">Excluir</button>`;
          tx += "</div>";
        });
        $("#showDonations").html(tx);
      },
    });
  },
};
//Mostra pedidos de doação na area publica
var getDonation2 = {
  getDonation2() {
    $.ajax({
      url: api + "/veDoacao",
      type: "GET",
      success: (data) => {
        var tx = "";
        tx += '<div class="boxRow flexWrap lg-screen-RLpadding10">';
        data.forEach((element) => {
          tx += '<div class="card padding20px flexGrow">';
          tx += '<a href="PagDoacaoDinheiro.html">';
          tx += '<h2 class="ttl2">' + element.tlt_doacao + "</h2>";
          tx += '<p class="txt2">' + "R$ " + element.vl_valor + "</p>";
          tx += '<p class="txt1 wordBreak">' + element.ds_doacao + "</p>";
          tx += "</a>";
          tx += "</div>";
        });
        $("#showDonations2").html(tx);
      },
    });
  },
};

//Ingração do LOGIN
var Login = {
 
    Login() {
 
        var user = document.getElementById('userLogin').value
        var senha = document.getElementById('senhaLogin').value
 
        console.log(user)
        console.log(senha)
 
        $.ajax({
            url: api + '/login',
            type: 'POST',
            data: {
                user: user,
                senha: senha
            },
            success: data => {
                console.log(data)
                window.location.href = api + '/PagAssistente.html'
            }
        }).fail(function(err) {
            console.log(err)
            alert('Credenciais Incorretas')
        })
    }
}

//Integração dos relatorios (usado a tabela atendimentos)
var getBanhos = {
  getBanhos() {
    var data1 = document.getElementById('data1').value  //variaveis para pegar dados do html
    var data2 = document.getElementById('data2').value
    
    $.ajax({
      url: api + "/relatorios",
      type: "POST",
      data: { 
        data1 : data1, //datas que serão usadas para consutar banco de dados
        data2 : data2
      },
      success: (data) => { //define quais dados serão acessados e atribui a variaveis
        var qt_banho = data[0].qt_banho;
        var texto_banho = '<p>' + qt_banho + "</p>";
        var nr_lanches = data[0].nr_lanches;
        var texto_lanches = '<p>' + nr_lanches + "</p>";
        var qt_bazar = data[0].qt_bazar;
        var texto_bazar = '<p>' + qt_bazar + "</p>";
        var id_atendido = data[0].id_atendido;
        var texto_atendimentos = '<p>' + id_atendido + "</p>";

        //insere o texto no html
        $("#banhos-periodo").html(texto_banho);
        $("#lanches-periodo").html(texto_lanches);
        $("#roupas-periodo").html(texto_bazar);
        $("#atendimentos-periodo").html(texto_atendimentos);
        
      },
    });
  },
};



function lb(a){
  
  var nm = (document.querySelector('#nome'+a+'').removeAttribute('disabled'));
  var dtNa = document.querySelector('#dt'+a+'').removeAttribute('disabled');
  var cpff = document.querySelector('#cpf'+a+'').removeAttribute('disabled');
  var rgg = document.querySelector('#rg'+a+'').removeAttribute('disabled');
  var inLoc = document.querySelector('#inL'+a+'').removeAttribute('disabled');
  var ds_L = document.querySelector('#dsL'+a+'').removeAttribute('disabled');
  var ds_alber = document.querySelector('#ds_A'+a+'').removeAttribute('disabled');
  var ds_domicil = document.querySelector('#ds_domici'+a+'').removeAttribute('disabled');
  var q_rua = document.querySelector('#qt_rua'+a+'').removeAttribute('disabled');
  var qt_alb = document.querySelector('#qt_A'+a+'').removeAttribute('disabled');
  var qt_domi = document.querySelector('#qt_dom'+a+'').removeAttribute('disabled');
  var qt_moraR = document.querySelector('#qt_mr'+a+'').removeAttribute('disabled');
  var motivoR = document.querySelector('#motivR'+a+'').removeAttribute('disabled');
  var tCidade = document.querySelector('#tempC'+a+'').removeAttribute('disabled');
  var fam = document.querySelector('#familia'+a+'').removeAttribute('disabled');
  var ds_comun = document.querySelector('#ds_com'+a+'').removeAttribute('disabled');
  var ds_alb = document.querySelector('#ds_a'+a+'').removeAttribute('disabled');
  var carte = document.querySelector('#carteira'+a+'').removeAttribute('disabled');
  var ds_rend = document.querySelector('#ds_r'+a+'').removeAttribute('disabled');
  var progR = document.querySelector('#prog'+a+'').removeAttribute('disabled');
  var programaR = document.querySelector('#proGR'+a+'').removeAttribute('disabled');
  var serviceD1 = document.querySelector('#sd1'+a+'').removeAttribute('disabled');
  var service1 = document.querySelector('#s1'+a+'').removeAttribute('disabled');
  var serviceD2 = document.querySelector('#sd2'+a+'').removeAttribute('disabled');
  var service2 = document.querySelector('#s2'+a+'').removeAttribute('disabled');
  var cont ='<button class="smbtn" id="most'+a+'" onclick="ed.edit('+a+')">Salvar</button>'
  $("#most1").html(cont)
  }

var ed = {


  edit(a) {
    console.log(a)
    var nm = String(document.querySelector('#nome'+a+'').value);
    var dtNa = document.querySelector('#dt'+a+'').value;
    var cpff = document.querySelector('#cpf'+a+'').value;
    var rgg = document.querySelector('#rg'+a+'').value;
    var inLoc = document.querySelector('#inL'+a+'').value;
    var ds_L = document.querySelector('#dsL'+a+'').value;
    var ds_alber = document.querySelector('#ds_A'+a+'').value;
    var ds_domicil = document.querySelector('#ds_domici'+a+'').value;
    var q_rua = document.querySelector('#qt_rua'+a+'').value;
    var qt_alb = document.querySelector('#qt_A'+a+'').value;
    var qt_domi = document.querySelector('#qt_dom'+a+'').value;
    var qt_moraR = document.querySelector('#qt_mr'+a+'').value;
    var motivoR = document.querySelector('#motivR'+a+'').value;
    var tCidade = document.querySelector('#tempC'+a+'').value;
    var fam = document.querySelector('#familia'+a+'').value;
    var ds_comun = document.querySelector('#ds_com'+a+'').value;
    var ds_alb = document.querySelector('#ds_a'+a+'').value;
    var carte = document.querySelector('#carteira'+a+'').value;
    var ds_rend = document.querySelector('#ds_r'+a+'').value;
    var progR = document.querySelector('#prog'+a+'').value;
    var programaR = document.querySelector('#proGR'+a+'').value;
    var serviceD1 = document.querySelector('#sd1'+a+'').value;
    var service1 = document.querySelector('#s1'+a+'').value;
    var serviceD2 = document.querySelector('#sd2'+a+'').value;
    var service2 = document.querySelector('#s2'+a+'').value;
    console.log(nm)

  $.ajax({
    
    url: api + '/editarUsuarios',
    type: 'POST',
    data: {
        userId: a,
        nm_nome: nm,
        dt_nas: dtNa,
        nr_cpf: cpff,
        nr_rg: rgg,
        in_locais: inLoc,
        ds_locais: ds_L,
        ds_albergue: ds_alber,
        ds_domiciliop: ds_domicil,
        qt_rua: q_rua,
        qt_albuergue: qt_alb,
        qt_domicilio: qt_domi,
        qt_morarua: qt_moraR,
        st_familia: fam,
        ds_comunitarias: ds_comun,
        st_cattrab: carte,
        ds_renda: ds_rend,
        ds_progrenda: progR,
        ds_programarenda: programaR




        

    },
    success: data => {
      Swal.fire(
        'Prontinho!',
        'clique para fechar!',
        'success'
      )
   
  }
    
  }
    
    )}

    }
