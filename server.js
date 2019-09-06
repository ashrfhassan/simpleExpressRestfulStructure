// App needed modules
const Express = require('express');
const app = new Express();
const BodyParser = require('body-parser');
const jsonParser = BodyParser.json();

// App controllers
const AuthController = require('./controllers/AuthController');
const auth = new AuthController();
const BlogController = require('./controllers/BlogController');
const blog = new BlogController();

// App routes
app.get('/', jsonParser, (req, res) => res.send("loaded successfully..."));
app.post('/register', jsonParser, (req, res) => auth.register(req, res));
app.post('/login', jsonParser, (req, res) => auth.login(req, res));

// App start server
app.listen(3000, () => console.log('your app listening on port 3000!'));