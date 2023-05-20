const express = require('express')
const cors = require('cors')
// const bodyParser = require('body-parser')
const app = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// app.use(bodyParser.raw())
// app.use(bodyParser.json())
app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}))
app.use(express.json())
const port = 3000
// const salt = 'belka'
const salt = bcrypt.genSaltSync(10);
const secret = 'belka'
// function passwordCompare (password, id) {
//     const compare=bcrypt.compareSync(req.body.password, user.password);
// }
// const genSalt = bcrypt.genSalt(10, salt) 
// function genHash (genPassword, genSalt, returnHash) { return bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash(genPassword, genSalt, function(err, hash) {
//         // Store hash in your password DB.
//         console.log('genPassword: '+genPassword)
//         console.log('genSalt: '+genSalt)
//         console.log('hash: '+hash)
//         returnHash = hash
//     });
// });}


// const pool = mysql.createPool({
//     connectionLimit: 5,
//     host: "localhost",
//     user: "root",
//     database: "usersdb2",
//     password: "123456"
//   });

const mysql = require('mysql')
// const connection = mysql.createConnection({
const connection = mysql.createPool({

connectionLimit: 5,

  host: 'db',
  user: 'root1',
  password: '123',
  database: 'belka'
//   database: 'db'
})

// connection.connect()

// connection.query( 'SELECT * FROM some_table', ( err, rows ) => {
//     connection.query( 'SELECT * FROM other_table', ( err, rows2 ) => {
//       connection.close( err => {
//         // ... do something with all the results
//       }
//     }
//   }




// connection.connect(function(err) {
connection.getConnection(function(err) {
    if (err) throw err;
    console.log("Connected!");
    // var sql = "CREATE TABLE IF NOT EXISTS users (login VARCHAR(255), name VARCHAR(255), password VARCHAR(255))";
    
    // connection.query('CREATE TABLE IF NOT EXISTS users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, login VARCHAR(255), name VARCHAR(255), password VARCHAR(255))', function (err, result) {
    //   if (err) throw err;
    //   console.log("Table 'users' created");
    // });

    let createUsersPromise = new Promise((resolve, reject) => {
        connection.query('CREATE TABLE IF NOT EXISTS users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), firstname VARCHAR(255), password VARCHAR(255))', function (err, result) {
            // if (err) throw err;
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
            // connection.end();
        });
    })
    
    
  });
//   connection.end();


  //////////
 // auth //
//////////
function generateAccessToken(username) {
    // return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
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
// function getUserIdFromToken(req) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if(!token) return false
//     const verifyData = jwt.verify(token, secret);
    
//     return connection.query("SELECT * FROM users WHERE login = ?", [verifyData.login], function(err, result){
//         return result[0].id
//         // if(!result.length)
//         //     return false
//         // else
//         //     return true
//     });

//   }


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
            // if(!result.length)
            //     return false
            // else
            //     return true
        });
    })
    
    
    
    
    
    

  }
function verifyAccessTokenFromReq(req) {
    console.log('verifyAccessTokenFromReq')
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

    // jwt.verify(token, secret, function(err, decoded) {
    //     if (err) {
    //         return false
    //       /*
    //         err = {
    //           name: 'TokenExpiredError',
    //           message: 'jwt expired',
    //           expiredAt: 1408621000
    //         }
    //       */
    //     }
    //   });

    // const verifyData = jwt.verify(token, secret);
    // console.log('verifyData: '+JSON.stringify(verifyData))
    // return connection.query("SELECT * FROM users WHERE login = ?", [verifyData.login], function(err, result){
    //     if(!result.length)
    //         return false
    //     else
    //         return true
    // });

  }
app.post('/auth', function(req,res){
    connection.query("SELECT * FROM users WHERE username = ?", [req.body.username], function(err, result){
        console.log('connection')
        if(err) throw (err);
        console.log('result.length: '+result.length)
        if(result.length)
            if(bcrypt.compareSync(req.body.password, result[0].password)){
                console.log('bcrypt')
                // res.json(generateAccessToken(result[0].login))
                const token = generateAccessToken(result[0].username);
                // console.log('verify: '+JSON.stringify(jwt.verify(token, secret)))
                // console.log('verify: '+verifyAccessToken(token))
                res.json(token)
                return
            }
        res.sendStatus(401)
    })
    // const compare=bcrypt.compareSync(req.body.password, user.password);
})
// app.post('/auth', function(req,res){})  

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
        // user.password = bcrypt.hashSync(req.body.password, salt)
        // const compare=bcrypt.compareSync(req.body.password, user.password);
        // console.log('compare: '+compare)
        
        connection.query("SELECT * FROM users WHERE username = ?", [user.username], function(err, result){
            if(err) throw (err);
            if(result.length){
                console.log('result: '+JSON.stringify(result))
                res.status(409).send('User '+req.body.username+' already exist');
                // return
                // renderWithError(req, res, "empty_first_name");
            } else {
                connection.query('INSERT INTO users SET ? ', user, function(err, result){
                    if(err) throw (err);
                    console.log('User added');
                    console.log('result: '+JSON.stringify(result));
                    console.log('inserted id: '+result.insertId)
                    // res.json('User added')
                    res.status(200).send('User '+user.username+' added')
                })
            }
            // res.sendStatus(200)
            // res.json(result);
        })

        
    // });
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
    // const user = {login: req.body.login, name: req.body.name, password: req.body.password};
    const user = {username: req.body.username, firstname: req.body.firstname};
    connection.query("UPDATE users SET ? WHERE id = ?", [user, req.body.id], function(err, result){
        if(err) throw (err);
        console.log('User updated');
        console.log('result: '+JSON.stringify(result));
        console.log('update id: '+result.insertId)
        // res.json('User updated')
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
    // const user = {login: req.body.login, name: req.body.name, password: req.body.password};
        connection.query("DELETE FROM users WHERE id = ?", [req.body.id], function(err, result){
            if(err) throw (err);
            console.log('User deleted');
            console.log('result: '+JSON.stringify(result));
            console.log('update id: '+result.insertId)
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
    // const user = {login: req.body.login, name: req.body.name, password: req.body.password};
        connection.query("SELECT id, username, firstname FROM users", function(err, result){
            if(err) throw (err);
            console.log('User selected');
            // console.log('result: '+JSON.stringify(result));
            // res.sendStatus(200)
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
    // console.log('getUserIdFromToken: '+getUserIdFromToken(req))
    // getUserIdFromToken(req).then(function(id123){console.log('id123: '+id123)})
    // const user = {login: req.body.login, name: req.body.name, password: req.body.password};
        connection.query("SELECT id, username, firstname FROM users WHERE id = ?", [req.query.id], function(err, result){
            if(err) throw (err);
            console.log('User selected');
            console.log('result: '+JSON.stringify(result));
            // res.sendStatus(200)
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
        // user_id: req.body.user_id,
        // user_id: getUserIdFromToken(req).then(function(id){ return id}),
        // user_id: 61,
        // user_id: getUserIdFromToken(req).then(function(id){ console.log('id: '+id); return id}),
        user_id: await getUserIdFromToken(req),
        month: req.body.month,
        ferrum: req.body.ferrum,
        silicium: req.body.silicium,
        aluminium: req.body.aluminium,
        calcium: req.body.calcium,
        sulfur: req.body.sulfur,
        // ferrum: req.body.ferrum,
        // ferrum: req.body.ferrum,
    };
    console.log('concentrate: '+JSON.stringify(concentrate))

    connection.query('INSERT INTO concentrates SET ? ', concentrate, function(err, result){
        if(err) throw (err);
        console.log('Concentrate added');
        console.log('result: '+JSON.stringify(result));
        console.log('inserted id: '+result.insertId)
        // res.json('User added')
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

    // req.body.for
    // const concentrates = await Promise.all(req.body.map(async (current) => 
    //     // console.log('current: '+JSON.stringify(current))
    //     {
    //         // return {
    //         //     user_id: await getUserIdFromToken(req),
    //         //     month: current.month,
    //         //     ferrum: current.ferrum,
    //         //     silicium: current.silicium,
    //         //     aluminium: current.aluminium,
    //         //     calcium: current.calcium,
    //         //     sulfur: current.sulfur,
    //         // }
    //         return [
    //             (typeof(+current.id)==="number"&&current.id?+current.id:0), 
    //             await getUserIdFromToken(req),
    //             current.month,
    //             +current.ferrum,
    //             +current.silicium,
    //             +current.aluminium,
    //             +current.calcium,
    //             +current.sulfur,
    //         ]
    // }
        
    // ))

    // const concentrates = req.body
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

    // const concentrate = {
        // user_id: req.body.user_id,
        // user_id: getUserIdFromToken(req).then(function(id){ return id}),
        // user_id: 61,
        // user_id: getUserIdFromToken(req).then(function(id){ console.log('id: '+id); return id}),
    //     user_id: await getUserIdFromToken(req),
    //     month: req.body.month,
    //     ferrum: req.body.ferrum,
    //     silicium: req.body.silicium,
    //     aluminium: req.body.aluminium,
    //     calcium: req.body.calcium,
    //     sulfur: req.body.sulfur,
    //     // ferrum: req.body.ferrum,
    //     // ferrum: req.body.ferrum,
    // };
    console.log('concentrates: '+JSON.stringify( concentrates))

    // connection.query('INSERT INTO concentrates SET ? ', concentrate, function(err, result){
        // 'INSERT into mytable (name, email) VALUES ?'

    // connection.query('INSERT INTO concentrates (user_id,month,ferrum,silicium,aluminium,calcium,sulfur) VALUES ? ', [concentrates], function(err, result){
    // connection.query('REPLACE INTO concentrates (id,user_id,month,ferrum,silicium,aluminium,calcium,sulfur) VALUES ? ', [concentrates], function(err, result){

    // db.query("INSERT INTO movies (id, adult, backdrop_path) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE adult=VALUES(adult), backdrop_path=VALUES(backdrop_path)",
    // connection.query('INSERT INTO concentrates (id,user_id,month,ferrum,silicium,aluminium,calcium,sulfur) VALUES ? ON DUPLICATE KEY UPDATE id=VALUES(id)', [concentrates], function(err, result){
    // connection.query('INSERT INTO concentrates (id,user_id,month,ferrum,silicium,aluminium,calcium,sulfur) VALUES ? ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)', [concentrates], function(err, result){
    connection.query('INSERT INTO concentrates (id,user_id,month,ferrum,silicium,aluminium,calcium,sulfur) VALUES ? ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id), user_id=VALUES(user_id), month=VALUES(month), ferrum=VALUES(ferrum), silicium=VALUES(silicium), aluminium=VALUES(aluminium), calcium=VALUES(calcium), sulfur=VALUES(sulfur) ', [concentrates], function(err, result){

    // INSERT INTO programming_languages(id,name,released_year,githut_rank,pypl_rank,tiobe_rank) 
    // connection.query('INSERT INTO concentrates VALUES ? ', concentrates, function(err, result){
    // connection.query('INSERT INTO concentrates SET ? ', concentrate, function(err, result){
        if(err) throw (err);
        console.log('Concentrate added');
        console.log('result: '+JSON.stringify(result));
        console.log('inserted id: '+result.insertId)
        // res.json('User added')
        res.status(200).send('Concentrate added')
    })
})
  ////////////////////////
 // delete concentrate //
////////////////////////
// 
// app.delete('/deleteuser', function(req,res){
app.delete('/deleteconcentrate', function(req,res){
    if(!verifyAccessTokenFromReq(req)){
        res.sendStatus(401);
        return
    }

    // console.log('id: '+req.params['id']);
    console.log('id: '+req.body.id);

    connection.query("DELETE FROM concentrates WHERE id = ?", [req.body.id], function(err, result){
        if(err) throw (err);
        console.log('Concentrate deleted');
        console.log('result: '+JSON.stringify(result));
        console.log('update id: '+result.insertId)
        res.sendStatus(200)
    })

    // connection.query('INSERT INTO concentrates (id,user_id,month,ferrum,silicium,aluminium,calcium,sulfur) VALUES ? ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id), user_id=VALUES(user_id), month=VALUES(month), ferrum=VALUES(ferrum), silicium=VALUES(silicium), aluminium=VALUES(aluminium), calcium=VALUES(calcium), sulfur=VALUES(sulfur) ', [concentrates], function(err, result){
    //     if(err) throw (err);
    //     console.log('Concentrate added');
    //     console.log('result: '+JSON.stringify(result));
    //     console.log('inserted id: '+result.insertId)
    //     res.status(200).send('Concentrate added')
    // })
})
// edit ??
// delete ??

  //////////////////////////
 // get all concentrates //
//////////////////////////
// 
app.get('/getallconcentrates', function(req,res){
    if(!verifyAccessTokenFromReq(req)){
        res.sendStatus(401);
        return
    }
    // const user = {login: req.body.login, name: req.body.name, password: req.body.password};
        connection.query("SELECT * FROM concentrates", function(err, result){
            if(err) throw (err);
            console.log('User selected');
            // console.log('result: '+JSON.stringify(result));
            // res.sendStatus(200)
            res.json(result);
        })
})


// connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
//   if (err) throw err

//   console.log('The solution is: ', rows[0].solution)
// })

// connection.query('SELECT * FROM users', (err, rows, fields) => {
// connection.query('CREATE TABLE IF NOT EXISTS users', (err, result) => {
// //   if (err) throw err
//   if (err) throw console.log('ERROR 123')

// //   console.log('The solution is: ', rows[0].solution)
// })

// connection.end()

// connection.connect(function(err) {
//     if (err) throw err;
//     con.query("SELECT * FROM customers", function (err, result, fields) {
//       if (err) throw err;
//       else console.log(result);
//     });
//   })





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