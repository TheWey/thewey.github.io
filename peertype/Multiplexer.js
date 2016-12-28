function Multiplexer(peer, received, connectionOpened, updateConnectionList) {

  var connections = [];

  this.connectToNetwork = function(PeerID) {
    connectTo(PeerID);
  };

  this.sendToAll = function(prefix, data) {
    var dataObject = JSON.stringify(new DataObject(prefix, data));
    var i;
    for (i in connections) {
      connections[i].send(dataObject);
    }
  };

  this.sendTo = function(dataConnection, prefix, data) {
    var dataObject = JSON.stringify(new DataObject(prefix, data));
    dataConnection.send(dataObject);
  };

  function DataObject(prefix, data) {
    this.prefix = prefix;
    this.data = data;
  }

  function alreadyConnectedTo(PeerID) {
    if (PeerID == peer.id) {
      return true;
    }
    var index;
    for (index in connections) {
      if (connections[index].peer == PeerID) {
        return true;
      }
    }
    return false;
  }

  function sendPeerList(dataConnection) {
    if (connections.length > 0) {
      var idList = [];
      var index;
      for (index in connections) {
        idList.push(connections[index].peer);
      }
      var dataObject = JSON.stringify(new DataObject("ids", idList));
      dataConnection.send(dataObject);
    }
  }

  peer.on('connection', function(dataConnection) {
    connectHandlers(dataConnection);
  });

  function connectTo(id) {
    if (!alreadyConnectedTo(id)) {
      var dataConnection = peer.connect(id);
      connectHandlers(dataConnection);
    }
  }

  function connectHandlers(dataConnection) {
    dataConnection.on('open', function() {
      console.log("Connected to: " + dataConnection.peer);
      sendPeerList(dataConnection);
      connections.push(dataConnection);
      updateConnectionList(connections);
      connectionOpened(dataConnection);
    });

    dataConnection.on('data', function(data) {
      processData(data);
    });

    dataConnection.on('close', function(data) {
      console.log("Disconnected from: " + dataConnection.peer);
      connections = connections.filter(function(conn) {
        return conn.peer != dataConnection.peer;
      });
      updateConnectionList(connections);
    });
  }

  function processData(dataString, connecting) {
    var dataObject = JSON.parse(dataString);
    if (dataObject.prefix == "ids") {
      var index;
      for (index in dataObject.data) {
        connectTo(dataObject.data[index]);
      }
    } else {
      received(dataObject);
    }
  }
}
