
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

	sql = "INSERT INTO acolhido (id_atendido, nm_nome) VALUES ('" + req.body.userId + "','"+ req.body.nm_nome +"' )";
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
	sql = "UPDATE acolhido SET nm_nome = '" + req.body.title + "' WHERE id_atendido = " + req.body.userId;

	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});

//Gabi------------------------------------------------------------------------------------------------------------------//
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
 
server.patch('/editaDoacao', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	console.log(req.body.userId)
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	console.log("req:");
	sql = "UPDATE doacao SET doacao = '" + req.body.ds_doacao + "' WHERE tlt_doacao = " + req.body.vl_valor;

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




//Feito por Manu----------------------------------------------------------------------------------------------------------------------------------------------------//
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

// // Atualiza um registro (é o U do CRUD - Update)
// server.patch('/editaPostagem', urlencodedParser, (req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

//     sql = "UPDATE post SET txt_post= '" + req.body.txt_post + "', img ='"+req.body.img +"', dt_post = '"+req.body.dt_post +"',  WHERE tlt_post ='" + req.body.tlt_post + "' ";
// 	var db = new sqlite3.Database(DBPATH); // Abre o banco
//     db.run(sql, [],  err => {
//         if (err) {
//             throw err;
//         }
//         res.end();
//     });
//     db.close(); // Fecha o banco
// });

// Exclui um registro (é o D do CRUD - Delete)
