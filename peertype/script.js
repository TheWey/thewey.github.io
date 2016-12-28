var multi;
var peer;

function IDBoxKeyPressed(event) {
  if (event.which == 13 && !$('#myID').is('[readonly]')) {
    register();
    return false;
  }
}

function connectBoxKeyPressed(event) {
  if (event.which == 13 && $('#stepConnect').is(':visible')) {
    connect();
    return false;
  }
}

function register() {
  var testID = $('#myID').val();
  peer = new Peer(testID, {key: 'ricuand2z18gds4i'});

  peer.on('error', function(err) {
    if (err.type == "unavailable-id") {
      alert("The ID \'" + testID + "\' is not available. Please try another.");
      $('#myID').val("");
    }
  });

  peer.on('open', function(id) {
    multi = new Multiplexer(peer, updateText, connectionOpened, updateConnectionList);
    $('#myIDText').html("Your ID: ");
    console.log("Your ID: " + id);
    $('#myID').prop('readonly', true);
    $('#stepConnect').prop('hidden', false);
    $('#connectTo').focus();
    $('#registerButton').prop('hidden', true);
  });

}

function connect() {
  var id = $('#connectTo').val();
  multi.connectToNetwork(id);
}

function connectionOpened(dataConnection) {
  if ($('#stepType').is(':visible')) {
    var currentVal = $('#writeArea').val();
    var cursorIndex = $("#writeArea").getCursorPosition();
    multi.sendTo(dataConnection, cursorIndex, currentVal);
  }
  $('#stepType').prop('hidden', false);
  $('#stepConnect').prop('hidden', true);
  $('#writeArea').focus();
}

function updateConnectionList(connections) {
  var listHTML = "";
  for (var index in connections) {
    listHTML = listHTML + "<li>" + connections[index].peer + "</li>";
  }
  $('#connectionList').html(listHTML);
}

function sendUpdate() {
  var currentVal = $('#writeArea').val();
  var cursorIndex = $("#writeArea").getCursorPosition();
  multi.sendToAll(cursorIndex, currentVal);
}

function updateText(dataObject) {
  var cursor = $('#writeArea').prop("selectionEnd");
  $('#writeArea').val(dataObject.data);
  if (cursor > dataObject.prefix) {
    cursor++;
  }
  setCaretToPos($('#writeArea')[0], cursor);
}


(function ($, undefined) {
    $.fn.getCursorPosition = function() {
        var el = $(this).get(0);
        var pos = 0;
        if('selectionStart' in el) {
            pos = el.selectionStart;
        } else if('selection' in document) {
            el.focus();
            var Sel = document.selection.createRange();
            var SelLength = document.selection.createRange().text.length;
            Sel.moveStart('character', -el.value.length);
            pos = Sel.text.length - SelLength;
        }
        return pos;
    }
})(jQuery);

function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  } else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function setCaretToPos(input, pos) {
  setSelectionRange(input, pos, pos);
}
