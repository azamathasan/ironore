const express = require('express')
const cors = require('cors')
const app = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}))
app.use(express.json())
const port = 3000
const salt = bcrypt.genSaltSync(10);
const secret = 'belka'
const mysql = require('mysql')
const connection = mysql.createPool({

connectionLimit: 5,

  host: 'db',
  user: 'root1',
  password: '123',
  database: 'belka'
})
connection.getConnection(function(err) {
    if (err) throw err;
    console.log("Connected!");

    let createUsersPromise = new Promise((resolve, reject) => {
        connection.query('CREATE TABLE IF NOT EXISTS users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), firstname VARCHAR(255), password VARCHAR(255))', function (err, result) {
            if (err) reject(err);
            console.log("Table 'users' created");
            resolve();
        });
    })
    
    createUsersPromise
    .then(()=>{
        connection.query('CREATE TABLE IF NOT EXISTS concentrates (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, user_id INT, month VARCHAR(255), ferrum FLOAT(24), silicium FLOAT(24), aluminium FLOAT(24), calcium FLOAT(24), sulfur FLOAT(24), FOREIGN KEY (user_id) REFERENCES users(id))', function (err, result) {
            if (err) throw err;
            console.log("Table 'concentrates' created");
        });
    })


    const checkQuery = 'SELECT * FROM users WHERE username = ?';
    connection.query(checkQuery, ['admin'], (err, results) => {
        if (err) {
            console.error('Error while checking for admin user:', err);
            return;
        }

        if (results.length > 0) {
            console.log('Admin user already exists');
        } else {
            console.log('Admin user not found. Creating...');

            const insertQuery = 'INSERT INTO users (username, firstname, password) VALUES (?, ?, ?)';
            // In a real application, make sure to hash the password!
            const plainPassword = 'admin123';
            const hashedPassword = bcrypt.hashSync(plainPassword, salt);
            connection.query(insertQuery, ['admin', 'admin', hashedPassword], (err, result) => {
            if (err) {
                console.error('Error while creating admin user:', err);
                return;
            }
            console.log('Admin user created successfully');
            });
        }
    });
  });

  //////////
 // auth //
//////////
function generateAccessToken(username) {
    return jwt.sign({username: username}, secret, { expiresIn: 600 * 600 });
  }
function verifyAccessToken(token) {
    const verifyData = jwt.verify(token, secret);
    
    return connection.query("SELECT * FROM users WHERE username = ?", [verifyData.username], function(err, result){
        if(!result.length)
            return false
        else
            return true
    });

  }


////////////////////////////////////////////////////////////////////////////////
// usage: 
// getUserIdFromToken(req).then(function(id123){console.log('id123: '+id123)})
///////////////////////////////////////////////////////////////////////////////
function getUserIdFromToken(req) {
    return new Promise(function(resolve, reject) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(!token) return reject(false)
        const verifyData = jwt.verify(token, secret);
        connection.query("SELECT * FROM users WHERE username = ?", [verifyData.username], function(err, result){
            resolve(result[0].id)
        });
    })
    
    
    
    
    
    

  }
function verifyAccessTokenFromReq(req) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log('token: '+token)
    if(!token) return false

    try {
        const verify = jwt.verify(token, secret);
        console.log( verify );
        return true
    } catch (err) {
        console.log('error')
        console.error( err );
        return false
    }
  }
app.post('/auth', function(req,res){
    connection.query("SELECT * FROM users WHERE username = ?", [req.body.username], function(err, result){
        if(err) throw (err);
        if(result.length)
            if(bcrypt.compareSync(req.body.password, result[0].password)){
                const token = generateAccessToken(result[0].username);
                res.json(token)
                return
            }
        res.sendStatus(401)
    })
})
app.get('/checkauth', function(req,res){
    if(!verifyAccessTokenFromReq(req)){
        res.sendStatus(401);
        return
    } else {
        res.sendStatus(200);
        return
    }
})

  //////////////
 // add user //
//////////////
// без валидации - не хватило времени 
app.post('/adduser', function(req,res){
    if(!verifyAccessTokenFromReq(req)){
        res.sendStatus(401);
        return
    }
    const user = {username: req.body.username, firstname: req.body.firstname, password: bcrypt.hashSync(req.body.password, salt)};        
        connection.query("SELECT * FROM users WHERE username = ?", [user.username], function(err, result){
            if(err) throw (err);
            if(result.length){
                res.status(409).send('User '+req.body.username+' already exist');
            } else {
                connection.query('INSERT INTO users SET ? ', user, function(err, result){
                    if(err) throw (err);
                    res.status(200).send('User '+user.username+' added')
                })
            }
        })
})

  ///////////////
 // edit user //
///////////////
// 
app.patch('/updateuser', function(req,res){
    if(!verifyAccessTokenFromReq(req)){
        res.sendStatus(401);
        return
    }
    const user = {username: req.body.username, firstname: req.body.firstname};
    connection.query("UPDATE users SET ? WHERE id = ?", [user, req.body.id], function(err, result){
        if(err) throw (err);
        console.log('User updated');
        res.sendStatus(200)
    })
})

  ///////////////////////
 // delete user by id //
///////////////////////
//
app.delete('/deleteuser', function(req,res){
    if(!verifyAccessTokenFromReq(req)){
        res.sendStatus(401);
        return
    }
        connection.query("DELETE FROM users WHERE id = ?", [req.body.id], function(err, result){
            if(err) throw (err);
            console.log('User deleted');
            res.sendStatus(200)
        })
})

  ///////////////////
 // get all users //
///////////////////
// 
app.get('/getallusers', function(req,res){
    if(!verifyAccessTokenFromReq(req)){
        res.sendStatus(401);
        return
    }
        connection.query("SELECT id, username, firstname FROM users", function(err, result){
            if(err) throw (err);
            console.log('User selected');
            res.json(result);
        })
})

  ////////////////////
 // get user by id //
////////////////////
// 
app.get('/getuserbyid', function(req,res){
    if(!verifyAccessTokenFromReq(req)){
        res.sendStatus(401);
        return
    }
        connection.query("SELECT id, username, firstname FROM users WHERE id = ?", [req.query.id], function(err, result){
            if(err) throw (err);
            console.log('User selected');
            res.json(result);
        })
})

  /////////////////////
 // add concentrate //
/////////////////////
// 
app.post('/addconcentrate', async function(req,res){
    if(!verifyAccessTokenFromReq(req)){
        res.sendStatus(401);
        return
    }

    const concentrate = {
        user_id: await getUserIdFromToken(req),
        month: req.body.month,
        ferrum: req.body.ferrum,
        silicium: req.body.silicium,
        aluminium: req.body.aluminium,
        calcium: req.body.calcium,
        sulfur: req.body.sulfur,
    };

    connection.query('INSERT INTO concentrates SET ? ', concentrate, function(err, result){
        if(err) throw (err);
        console.log('Concentrate added');
        res.status(200).send('Concentrate added')
    })
})

  ////////////////////////
 // update concentrate //
////////////////////////
// 
app.post('/updateconcentrates', async function(req,res){
    if(!verifyAccessTokenFromReq(req)){
        res.sendStatus(401);
        return
    }
    const concentrates = await Promise.all(req.body.map(async (current) => {
        return [
            (typeof(+current[0])==="number"?+current[0]:0),
            (typeof(+current[1])==="number"&&(+current[1])!==0?+current[1]:await getUserIdFromToken(req)),
            current[2],
            (typeof(+current[3])==="number"?+current[3]:null),
            (typeof(+current[4])==="number"?+current[4]:null),
            (typeof(+current[5])==="number"?+current[5]:null),
            (typeof(+current[6])==="number"?+current[6]:null),
            (typeof(+current[7])==="number"?+current[7]:null),
        ]
    }))
    connection.query('INSERT INTO concentrates (id,user_id,month,ferrum,silicium,aluminium,calcium,sulfur) VALUES ? ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id), user_id=VALUES(user_id), month=VALUES(month), ferrum=VALUES(ferrum), silicium=VALUES(silicium), aluminium=VALUES(aluminium), calcium=VALUES(calcium), sulfur=VALUES(sulfur) ', [concentrates], function(err, result){
        if(err) throw (err);
        console.log('Concentrate added');
        res.status(200).send('Concentrate added')
    })
})
  ////////////////////////
 // delete concentrate //
////////////////////////
// 
app.delete('/deleteconcentrate', function(req,res){
    if(!verifyAccessTokenFromReq(req)){
        res.sendStatus(401);
        return
    }

    connection.query("DELETE FROM concentrates WHERE id = ?", [req.body.id], function(err, result){
        if(err) throw (err);
        console.log('Concentrate deleted');
        res.sendStatus(200)
    })
})

  //////////////////////////
 // get all concentrates //
//////////////////////////
// 
app.get('/getallconcentrates', function(req,res){
    if(!verifyAccessTokenFromReq(req)){
        res.sendStatus(401);
        return
    }
        connection.query("SELECT * FROM concentrates", function(err, result){
            if(err) throw (err);
            console.log('User selected');
            res.json(result);
        })
})

  /********************/
 /*** Hello World! ***/
/********************/

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

  /************************/
 /*** END Hello World! ***/
/************************/