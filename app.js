const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const AdmZip = require('adm-zip');

const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));

// static directory
app.use(express.static('static'))

//index.html
app.get('/', (req, res) => {
    res.sendFile('./static/index.html');
});

//create page
app.get('/page', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});

//get content from the textareas
app.post('/page', function (req, res) {
    var file = req.body.file;
    var content = req.body.contente;
    var contentcss = req.body.styles
    var contentjs = req.body.scripts

    htmlFile(file, content, res);
    cssFile(file, contentcss, res);
    jsFile(file, contentjs, res);

});
/////////////////
//html
const preData = '<!DOCTYPE html><!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]--><!--[if IE 7]><html class="no-js lt-ie9 lt-ie8"><![endif]--><!--[if IE 8]><html class="no-js lt-ie9"><![endif]--><!--[if gt IE 8]><!--><html class="no-js"><!--<![endif]--><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title></title><meta name="description" content=""><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="style.css"></head><body>';

const postData = '<script src="scripts.js"></script></body></html>';

function htmlFile(file, data, res) {
    var name = "files/" + file + ".html";
    var content = preData + data + postData;
    fs.writeFile(name, content, function (err) {
        if (err) {
            throw err;
            res.send(err);
        } else {
            res.send('<div style="text-align:center; margin: 20% auto; "><h1 style="color:#535353; text-align:center; left: 45%;">Files successfuly saved in your /files folder<br> or click on the link below to save in your downloads folder.</h1><div style="text-align:center; margin: 10% auto; "><a href="/download" style="background-color: #008ee0;color: #fff;font-size: 14px; font-weight: bold; padding: 15px 25px; margin: 25px 25px 0px 0px;border-radius: 10px;border-color: transparent !important; position: relative; text-decoration: none !important; font-family: Arial, Helvetica, sans-serif;" name="dfiles" id="dfile" value="download">Download files</a></div></div>');
        }
    });
};

//css
function cssFile(file, data, res) {
    var file = "style";
    var name = "files/" + file + ".css";
    var csscontent = data;
    fs.writeFile(name, csscontent, function (err) {
        if (err) {
            throw err;
            res.send(err);
        }
    });
};

//js
function jsFile(file, data, res) {
    var file = "scripts";
    var name = "files/" + file + ".js";
    var jscontent = data;
    fs.writeFile(name, jscontent, function (err) {
        if (err) {
            throw err;
            res.send(err);
        }
    });
};

////download files
var uploadDir = fs.readdirSync(__dirname + "/files");

const zip = new AdmZip();

const downloadName = "files.zip";

zip.addLocalFile("./files/index.html");
zip.addLocalFile("./files/scripts.js");
zip.addLocalFile("./files/style.css");
zip.writeZip(__dirname + "/" + "files" + "/" + downloadName);

app.get('/download', (req, res) => {

    res.download(__dirname + "/" + "files" + "/" + downloadName);

});

///////////////////////////
//server

port = 3000;

app.listen(process.env.port || 3000,
    console.log(`The editor is running on port: ${port}`));