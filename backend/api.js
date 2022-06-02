
const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const hostname = '127.0.0.1';

/* Servidor do Banco de Dados */
const portback = 3061;
const sqlite3 = require('sqlite3').verbose();
const server = express();
const DBPATH = 'revirarDB.db';
server.use(express.static("../Index"));
server.use(express.json());


/* Definição dos endpoints */

/****** CRUD ******************************************************************/
//Rodrigo----------------------------------------------------------------------------------------------------------//
// Retorna todos registros (é o R do CRUD - Read)
server.get('/users', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM acolhido';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});
// Insere um registro (é o C do CRUD - Create)
server.post('/userinsert', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "INSERT INTO acolhido (nm_nome, dt_nascimento, nr_cpf, nr_rg, in_locais, ds_locais, ds_albergue, ds_domiciliopart, qt_rua, qt_albergue, qt_domicilio, qt_morarua, st_familia, ds_comunitarias, ds_atendido, st_carteiratrab, ds_renda, ds_progrenda, ds_programarenda) VALUES ('"+ req.body.nm_nome +"','" + req.body.data +"', '" + req.body.cpf +"','"+req.body.rg+"','"+ req.body.in_locais +"', '"+ req.body.ds_locais + "', '"+ req.body.albuergue+"', '"+ req.body.ds_domiciliop +"', '"+req.body.qt_r+"','"+req.body.qt_albuergue+"','"+req.body.qt_dom+"','"+req.body.qt_rua+"', '"+req.body.st_f+"', '"+req.body.ds_com+"', '"+req.body.ds_at+"','"+req.body.st_cattrab+"', '"+req.body.ds_renda+"','"+req.body.ds_progren+"','"+req.body.programar+"')";
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close(); // Fecha o banco
	res.end();
});

server.patch('/editarUsuarios', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	console.log(req.body.userId)
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	console.log("req:");
	sql = "UPDATE acolhido SET nm_nome = '" + req.body.nm_nome + "', dt_nascimento = '"+req.body.dt_nas+"', nr_cpf = '"+req.body.nr_cpf+"', nr_rg = '"+req.body.nr_rg+"', in_locais = '"+req.body.in_locais+"', in_locais = '"+req.body.ds_locais+"',  ds_albergue = '"+req.body.ds_albergue+"', ds_domiciliopart = '"+req.body.ds_domiciliop+"', qt_rua = '"+req.body.qt_rua+"', qt_albergue = '"+req.body.qt_albuergue+"',  qt_domicilio = '"+req.body.qt_domicilio+"', qt_morarua = '"+req.body.qt_morarua+"', st_familia = '"+req.body.st_familia+"', ds_comunitarias = '"+req.body.ds_comunitarias+"', ds_atendido = '"+req.body.ds_atendido+"', st_carteiratrab = '"+req.body.st_cattrab+"', ds_renda = '"+req.body.ds_renda+"', ds_progrenda  = '"+req.body.ds_progrenda+"', ds_programarenda = '"+req.body.programarenda+"' WHERE id_atendido = " + req.body.userId;

	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});
server.delete('/excluiusuario', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    sql = "DELETE FROM doacao WHERE tlt_doacao = '" + req.body.nome + "'"; 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    db.close(); // Fecha o banco
});

//Doação(Gabi) ------------------------------------------------------------------------------------------------------------------//
/* Inicia o servidor */
server.listen(portback, hostname, () => {
	console.log(`BD server running at http://${hostname}:${portback}/`);
  });
//Doação Post.............................................................//
  server.post('/criaDoacao', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "INSERT INTO doacao (tlt_doacao, ds_doacao, vl_valor) VALUES ('" + req.body.tlt_doacao + "','"+ req.body.ds_doacao +"' , '"+ req.body.vl_valor +"')";
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close(); // Fecha o banco
	res.end();
});

//Doação Get.........................................................//
server.get('/veDoacao', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = 'SELECT * FROM doacao';
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});


//Doação Update//

// Atualiza um registro (é o U do CRUD - Update)
server.patch('/editaDoacao', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	
    sql = "UPDATE doacao SET ds_doacao= '" + req.body.ds_doacao+"', vl_valor= '" + req.body.vl_valor+"'  WHERE tlt_doacao ='" + req.body.tlt_doacao + "'";
	
	
	var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    db.close(); // Fecha o banco
});

//Doação Delete//

server.delete('/excluiDoacao', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    sql = "DELETE FROM doacao WHERE tlt_doacao = '" + req.body.tlt_doacao+ "'"; 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    db.close(); // Fecha o banco
});




//Postagem (Manu)----------------------------------------------------------------------------------------------------------------------------------------------------//
// Insere um registro (é o C do CRUD - Create)
server.post('/criaPostagem', urlencodedParser, (req, res) => {// inicia a função. /userint é nosso endpoint
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "INSERT INTO post (tlt_post, txt_post, img, dt_post) VALUES ('" + req.body.tlt_post + "','"+ req.body.txt_post + "','"+ req.body.img +"', '"+ req.body.dt_post+"')"; // insere um valor no banco de dados (só está sendo passado o id, porque ele é obrigatorio)
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close(); // Fecha o banco
	res.end();
});

server.get('/vePostagem', urlencodedParser, (req, res) => {// inicia a função. /userint é nosso endpoint
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = 'SELECT * FROM post'; // insere um valor no banco de dados (só está sendo passado o id, porque ele é obrigatorio)
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

server.delete('/excluiPostagem', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    sql = "DELETE FROM post WHERE tlt_post =  '"+ req.body.tlt_post+"'";
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    db.close(); // Fecha o banco
});

// Atualiza um registro (é o U do CRUD - Update)
server.patch('/editaPostagem', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    sql = "UPDATE post SET txt_post= '" + req.body.txt_post+"', img= '" + req.body.img+"',dt_post= '" + req.body.dt_post+"'   WHERE tlt_post ='" + req.body.tlt_post + "'";
	var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    db.close(); // Fecha o banco
});

//Atendimento----------------------------------------------------------------------------------//

server.post('/criaAtendimento', urlencodedParser, (req, res) => {// inicia a função. /userint é nosso endpoint
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "INSERT INTO atendimentos (id_atendido, qt_presenca, id_toalha, nr_lanches, qt_banho) VALUES ('" + req.body.id_atendido + "','"+ req.body.qt_presenca + "','"+ req.body.id_toalha +"', '"+ req.body.nr_lanches+"', '"+ req.body.qt_banho+"')"; // insere um valor no banco de dados (só está sendo passado o id, porque ele é obrigatorio)
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close(); // Fecha o banco
	res.end();
});

server.get('/visualizaAtendimentos', urlencodedParser, (req, res) => {// inicia a função. /userint é nosso endpoint
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = 'SELECT * FROM atendimentos'; // insere um valor no banco de dados (só está sendo passado o id, porque ele é obrigatorio)
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

server.delete('/excluiAtendimento', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    sql = "DELETE FROM atendimentos WHERE id_atendido =  '"+ req.body.id_atendido+"'";
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    db.close(); // Fecha o banco
});


//Lugares----------------------------------------------------------------------------------//


// Retorna todos registros (é o C do CRUD - Create)
server.post('/cadastraLugar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = "INSERT INTO lugares (lat, long, dt_visita) VALUES ('" + req.body.lat + "','"+ req.body.long +"', '"+ req.body.dt_visita +"' )";
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});
// Consulta um registro (é R do CRUD - Read)
server.get('/visualizaLugar', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
    var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM lugares';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});
// Retorna todos registros (é o C do CRUD - Create)
server.delete('/excluiLugar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = "DELETE FROM lugares WHERE dt_visita = '"+ req.body.dt_visita+"'";
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});