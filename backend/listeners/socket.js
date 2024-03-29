const socketIO = require('socket.io');
const { adduser, user, getReceiver, RemoveUser,Getuser } = require("./EmitterChat");

module.exports = function(server) {
  const io = socketIO(server,{
    path: "/api/socket.io/",
    cors: {
      origin: ["https://htron.site",'http://localhost:7000','https://www.htron.site',`https://admin.htron.site`],
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (message) => {
      console.log('Received message:', message);
      io.emit('chat message', message); // Broadcast the message to all connected clients
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
      RemoveUser(socket.id)

    });
    socket.on("adduser", (userid) => {
      adduser(userid, socket.id)
      console.log(user)
      const users = Getuser()
        io.emit('getuser',users)
      });
    
    socket.on('sendMessage', ({ senderid, receiverid,name, text }) => {
      console.log('messahe working');
      console.log(text);
      console.log(receiverid);
      console.log(name);
      console.log('ivdeyo aano presnm id');
      const receiver = getReceiver(receiverid)
      console.log(receiver);
      if (receiver) {
        io.to(receiver?.socketid).emit('getMessage', {
          senderid,
          text,
          name
        })
      }
    })
    socket.on("block", ({userid,text}) => {
      console.log(text);
      const receiver = getReceiver(userid)
       console.log(receiver);
       if (receiver) {
         io.to(receiver?.socketid).emit('blockuser',user)
       }
       });
  });
};
