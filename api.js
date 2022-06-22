const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

 
/* Servidor do Banco de Dados */
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors')
const server = express();
const DBPATH = 'backend/revirarDB.db';
server.use(express.static("./Index/."));
server.use(express.json());
server.use(cors())
server.use(bodyParser.urlencoded({ // Irá suportar urlenconded
    extended: true
}));

/* Definição dos endpoints */

/****** CRUD ******************************************************************/
//Endpoints tabela acolhido----------------------------------------------------------------------------------------------------------//

// GET -----------------------------------------------------//
server.get('/users', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 

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

server.get('/acolhido/:id', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	let id = req.params.id
	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM acolhido WHERE id_atendido ='+id+'';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

//POST --------------------------------------------------------//
server.post('/userinsert', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 

	sql = "INSERT INTO acolhido (nm_nome, apelido, dt_nascimento, nr_cpf, nr_rg, in_locais, ds_locais, ds_albergue, ds_domiciliopart, qt_rua, qt_albergue, qt_domicilio, qt_morarua, motivRua, TempCid, st_familia, ds_comunitarias, ds_atendido, st_carteiratrab, ds_renda, ds_progrenda, ds_programarenda, ecServico1_data, ecServico1, ecServico2_data, ecServico2) VALUES ('"+ req.body.nm_nome +"', '"+ req.body.apelido +"','" + req.body.data +"', '" + req.body.nr_cpf +"','"+req.body.nr_rg+"','"+ req.body.in_locais +"', '"+ req.body.ds_locais + "', '"+ req.body.albuergue+"', '"+ req.body.ds_domiciliop +"', '"+req.body.qt_r+"','"+req.body.qt_albuergue+"','"+req.body.qt_dom+"','"+req.body.qt_rua+"', '"+req.body.moRua+"', '"+req.body.tempCid+"', '"+req.body.st_f+"', '"+req.body.ds_com+"', '"+req.body.ds_at+"','"+req.body.st_cattrab+"', '"+req.body.ds_renda+"','"+req.body.ds_progren+"','"+req.body.programar+"', '"+req.body.dt_Serv1+"', '"+req.body.Serv1+"', '"+req.body.dt_Serv2+"', '"+req.body.Serv2+"')";
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close(); // Fecha o banco
	res.end();
});

//EDIT --------------------------------------------------------//
server.post('/editarUsuarios', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	console.log(req.body.userId)
	res.setHeader('Access-Control-Allow-Origin', '*'); 

	console.log("req:");
	sql = "UPDATE acolhido SET nm_nome = '" + req.body.nm_nome + "', dt_nascimento = '"+req.body.dt_nas+"', nr_cpf = '"+req.body.nr_cpf+"', nr_rg = '"+req.body.nr_rg+"', in_locais = '"+req.body.in_locais+"', in_locais = '"+req.body.ds_locais+"',  ds_albergue = '"+req.body.ds_albergue+"', ds_domiciliopart = '"+req.body.ds_domiciliop+"', qt_rua = '"+req.body.qt_rua+"', qt_albergue = '"+req.body.qt_albuergue+"',  qt_domicilio = '"+req.body.qt_domicilio+"', qt_morarua = '"+req.body.qt_morarua+"', st_familia = '"+req.body.st_familia+"', ds_comunitarias = '"+req.body.ds_comunitarias+"', ds_atendido = '"+req.body.ds_atendido+"', st_carteiratrab = '"+req.body.st_cattrab+"', ds_renda = '"+req.body.ds_renda+"', ds_progrenda  = '"+req.body.ds_progrenda+"', ds_programarenda = '"+req.body.programarenda+"' WHERE id_atendido = '" + req.body.userId+"'";

	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});

//DELETE --------------------------------------------------------------//
server.delete('/excluiusuario', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 

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

//Endpoints tabela Doação------------------------------------------------------------------------------------------------------------------//
/* Inicia o servidor */
server.listen(process.env.PORT, () => {
	console.log(`Server running!`);
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
	res.setHeader('Access-Control-Allow-Origin', '*'); 

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


//Doação Update.................................................//


server.patch('/editaDoacao', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
	
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

//Doação Delete..............................................//

server.delete('/excluiDoacao', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 

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




//Tabela post----------------------------------------------------------------------------------------------------------------------------------------------------//

//Post--------------------------------------------------------//
server.post('/criaPostagem', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 

	sql = "INSERT INTO post (tlt_post, txt_post, dt_post) VALUES ('" + req.body.tlt_post + "','"+ req.body.txt_post + "', '"+ req.body.dt_post+"')"; 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close(); // Fecha o banco
	res.end();
});

//Get------------------------------------------------------//
server.get('/vePostagem', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 

	sql = 'SELECT * FROM post'; 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

//Delete--------------------------------------------------//
server.delete('/excluiPostagem', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 

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

//Edit ------------------------------------------------//
server.patch('/editaPostagem', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 

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

//Endpoint tabela Atendimentos----------------------------------------------------------------------------------//

//Post -----------------------------------------------------------//
server.post('/criaAtendimento', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');

	sql = "INSERT INTO atendimentos (id_atendido, id_toalha, nr_lanches, qt_banho, dt_atendimento, dt_horario, qt_bazar, nm_nome, atividades) VALUES ('" + req.body.id_atendido + "','"+ req.body.id_toalha + "','"+ req.body.nr_lanches +"', '"+ req.body.qt_banho+"', '"+ req.body.dt_atendimento+"', '"+ req.body.dt_horario+"', '"+ req.body.qt_bazar+"', '"+ req.body.nm_nome+"', '"+ req.body.atividades+"')";
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close(); // Fecha o banco
	res.end();
});

//Get----------------------------------------------------------//
server.get('/visualizaAtendimentos', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');

	sql = 'SELECT * FROM atendimentos'; 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

//Delete--------------------------------------------------------//
server.delete('/excluiAtendimento', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 

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


//Endpoint tabela lugares----------------------------------------------------------------------------------//


// Post ------------------------------------------------------//
server.post('/cadastraLugar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = "INSERT INTO lugares (nm_rua, bairro, dt_visita, nm_referencia, nr_pessoas ) VALUES ('" + req.body.nm_rua + "','"+ req.body.bairro +"', '"+ req.body.dt_visita +"', '"+ req.body.nm_referencia +"', '"+ req.body.nr_pessoas +"' )"; 
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

// Get ----------------------------------------------------//
server.get('/visualizaLugar', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
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

// Delete -----------------------------------------------//
server.delete('/excluiLugar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = "DELETE FROM lugares WHERE nm_rua = '"+ req.body.nm_rua+"'";
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});


//Enspoint tabela doadores-----------------------------------------------------------------//

//Post---------------------------------------------------------//
server.post('/cadastraDoador', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = "INSERT INTO doadores (nm_nomedoador, nm_email, nr_celular, dt_doacao ) VALUES ('" + req.body.nm_nomedoador + "','"+ req.body.nm_email +"', '"+ req.body.nr_celular +"', '"+ req.body.dt_doacao +"' )"; 
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

// Get -----------------------------------------------------//
server.get('/visualizaDoacao', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM doadores';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

//delete ------------------------------------------------//
server.delete('/excluiDoador', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = "DELETE FROM doadores WHERE nm_email = '"+ req.body.nm_email+"'";
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}                 
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

//Enspoint tabela voluntarios-----------------------------------------------------------------//

//Post------------------------------------------------------------//
server.post('/cadastraVoluntario', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = "INSERT INTO voluntarios (voluntario, nm_email, dt_idade, nr_tel, dr_ajuda) VALUES ('" + req.body.voluntario + "','"+ req.body.nm_email +"', '"+ req.body.dt_idade +"', '"+ req.body.nr_tel +"', '"+ req.body.dr_ajuda +"' )"; 
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

//Get -------------------------------------------------------//
server.get('/visualizaVoluntario', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM voluntarios';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

//Delete------------------------------------------------------//
server.delete('/excluiVoluntario', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = "DELETE FROM voluntarios WHERE nm_email = '"+ req.body.nm_email+"'";
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}                      
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

//Endpoint do login --------------------------------------------------------------------//
//Post ------------------------------------------------------//
server.post('/login', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var login = req.body.user
    console.log(login)
    var senha = req.body.senha
    console.log(senha)
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = `SELECT * FROM users WHERE users = "${login}"`; 
    db.all(sql, [],  (err, rows) => {
        if (err) {
            throw err;
        }
        console.log(rows)
        if (rows == '') {
            res.status(400).send('Credenciais incorretas!')
        } else {
            console.log(rows[0])
            if (rows[0].senha == senha) {
                res.status(200).send('Usuário Logado!')
            } else {
                res.status(400).send('Credenciais incorretas!')
            }
        }
       
    });
    db.close(); // Fecha o banco
});

//Enspoint relatorios a partir da tabela atendimentos-----------------------------//
//Post------------------------------------------//
server.post('/relatorios', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
	var data1 = req.body.data1
	console.log(data1)
    var data2 = req.body.data2
	console.log(data2)
    var db = new sqlite3.Database(DBPATH); // Abre o banco
  	var sql = `SELECT SUM(qt_banho) qt_banho, SUM(nr_lanches) nr_lanches, SUM(qt_bazar) qt_bazar, COUNT(id_atendido) id_atendido FROM atendimentos WHERE dt_atendimento BETWEEN "${data1}" AND "${data2}"`;
	//usado as datas requeridas para consulta no banco de dados
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});
