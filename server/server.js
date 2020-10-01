const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'internproject'
});
connect.connect(function(err){
    (err) ? console.error(err) : console.log(connect);
});
const port = process.env.PORT || 5000;
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
var storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, 'public/images/uploads');
    },
    filename: (req,file,cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage
})
app.get('/api/label' , function (req, res) {
    var sql = "SELECT * FROM label ORDER BY labelID DESC";
    connect.query(sql, function (err,results) {
        if (err) throw err;
        res.send({label: results})
    })
});
app.post('/api/insert', function (req, res) {
    const sql = "INSERT "
    + "INTO label(labelName) "
    + "VALUES('"
    +   req.body.labelName + "')";
    connect.query(sql, function (err,results) {
        if(err) throw err;
        res.json({label: results});
    });
});
app.post('/api/insertImg',upload.single('image'), function (req, res) {
    if(req.file)
    var sql = "INSERT INTO `dicom`(`path`) VALUES ('" + req.file.filename + "')"; 
            connect.query(sql, function (err) {
                if (err) throw err;
                res.json({imageUrls: `images/uploads/${req.file.filename}`});
            })
        });

app.listen(port, error => {
    if (error) throw error;
    console.log('Server running on port' + port)
})
