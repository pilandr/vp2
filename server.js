const WebSocket = require('ws');
const uuidv1 = require('uuid/v1');
const fs = require('fs');
const { connect } = require('http2');
const wss = new WebSocket.Server({ port: 5501 });
const connections = new Map();

wss.on('connection', function connection(socket) {
  connections.set(socket, {});
  socket.on('message', (messageData) => {
    const message = JSON.parse(messageData);
    let excludeItself = false;

    if (message.type === 'hello') {
      excludeItself = true;
      connections.get(socket).userName = message.data.name;
      //console.log(connections.keys());
      
      sendMessageTo(
        {
          type: 'user-list',
          data: [...connections.values()].map((item) => {
            // const dataUser = {};
            // try {
            //   dataUser.userName = item.userName;
            //   if (fs.existsSync(`./logins/${item.userName}`)) {
            //     dataUser.photo = fs.readFileSync(`./logins/${item.userName}`, "utf8");
            //   } else {
            //     dataUser.photo = fs.readFileSync(`./logins/!nofoto`, "utf8")
            //   }
            // } catch(err) {
            //   console.error(err)
            // }
            // return dataUser;
            return getUser(item.userName);
          }).filter(Boolean),
        },
        socket
      );
      message.data = getUser(message.data.name);
    }

    if (message.type === 'avatar') {
      const socketData = connections.get(socket);
      if (!socketData) {
        return;
      }
      //console.log(message.data.base64);
      fs.writeFile(`./logins/${socketData.userName}`,message.data.base64,() => 0);
    }
      sendMessageFrom(connections, message, socket, excludeItself);
  });

  socket.on('close', () => {

    sendMessageFrom(connections, { type: 'bye-bye' }, socket, true);
    //console.log("bye-bye");
    connections.delete(socket);
  });
});

function sendMessageTo(message, to) {
  //console.log(message);
  to.send(JSON.stringify(message));
}


function getUser(name) {
  const dataUser = {};
  try {
    dataUser.userName = name;
    if (fs.existsSync(`./logins/${name}`)) {
      dataUser.photo = fs.readFileSync(`./logins/${name}`, "utf8");
    } else {
      dataUser.photo = fs.readFileSync(`./logins/!nofoto`, "utf8")
    }
  } catch(err) {
    console.error(err)
  }
  return dataUser;
}
// function broadcast(connections, message) {
//   for (const connection of connections.keys()) {
//     connection.send(JSON.stringify(message));
//   }
// }

function sendMessageFrom(connections, message, from, excludeSelf) {
  const socketData = connections.get(from);

  if (!socketData) {
    return;
  }

  message.from = socketData.userName;
  //console.log(message);

  for (const connection of connections.keys()) {
    //console.log(from);
    if (connection === from && excludeSelf) {
      continue;
    }

    connection.send(JSON.stringify(message));
  }
}

