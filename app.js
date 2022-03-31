const app = require('express')()
const http = require('http').createServer(app)

a =[]

app.get('/', (req, res) => {
    let size = a.length
    let message = "Node Server is running. Yay!!"+ size;
    res.send(message)
})

app.get('/notes', function(req, res) {
  Note.findAll().then(notes => res.json(notes));
});

//Socket Logic
const socketIO = require('socket.io')(http)

socketIO.on("connection", (userSocket) => {
    userSocket.on("send_message", (data) => {
        userSocket.broadcast.emit("receive_message", data)
    })
})


socketIO.on('connection',  (client)=> {
  console.log('Connected...', client.id);
// console.log('Connected broadcast', client.broadcast);


//listens for new messages coming in
  client.on('message',  (data) =>{
    console.log("message",data);
    a.push(data)
    console.log(a.length)
    socketIO.emit('message', data);
  })



//listens when a user is disconnected from the server
  client.on('disconnect',  () =>{
    console.log('Disconnected......', client.id);
  })

//listens when there's an error detected and logs the error on the console
  client.on('error',  (err) =>{
    console.log('Error detected', client.id);
    console.log(err);
  })


  client.on("buyorder",(data)=>{
    console.log("buy order...",data)
    socketIO.emit('buyorder', data);
  })

  client.on("sellorder",(data)=>{
    console.log("sell order...",data)
  })


})

var port = process.env.PORT || 3344;
http.listen(port, function (err) {
  if (err) console.log(err);
  console.log('Listening on port', port);
});



