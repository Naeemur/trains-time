let fs = require('fs');
let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');

let app = express();
let port = process.env.PORT || 80;
let files = {
	html: fs.readFileSync(path.join(__dirname, '/index.html')).toString(),
	css: fs.readFileSync(path.join(__dirname, '/public/css/index.css')).toString()
}
let data = JSON.parse(fs.readFileSync('data.json').toString());
console.log(data);
let key = 'TT'+Math.floor(Math.random()*1E10);
console.log(key);

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cors());
app.use(express.static('public/'));

app.get('/', (req, res) => {
	res.send(files.html.split('{{api_key}}').join(key));
	// console.log(req);
});

app.get('/api/:key', (req, res) => {
	if(req.params.key == key) res.send(JSON.stringify(data));
	else res.end();
	console.log(req);
});

let server = app.listen(port, () => {
	console.log(`Serving on port ${port} ...`);
});