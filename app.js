const express = require("express");
const http = require("http");
const app = express();
const path = require('path');
const serveStatic = require('serve-static');
const WebSocket = require("ws");
require("./server/models/db");

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

const indexRouter = require('./server/routes/main');
const apiRouter = require("./api/routes/messages");

app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'pug');
app.set('x-powered-by', false);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(serveStatic('public/images'));             
app.use(serveStatic('public/stylesheets'));       
app.use(serveStatic('public/javascripts'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};  
  res.status(err.status || 500);
  res.sendFile('error.html', { root: 'server/views/' });
});

wss.on("connection", (socket) => {  
  socket.on("message", (message) => {    
    wss.clients.forEach((client) => {
        client.send(message);
      })
  })
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${server.address().port}`);
});

module.exports = app;

