function onTextEnter(e) {
	if (e.keyCode == 13){
		var textBox = document.getElementById("input").value;
		if (e.shiftKey){
			textBox = textBox.replace(/[\n\r]/g, ' ');
		}
		while (textBox.indexOf('  ') != -1) {
			textBox = textBox.replace('  ', ' ');
		}
		document.getElementById("input").value = textBox;
		document.getElementById("input").select();
		return false;
	}
}

function correctKey() {
  if (navigator.platform=="MacIntel" || navigator.platform=="MacPPC") {
    document.write("Command");
  } else {
    document.write("Ctrl");
  }
}
console.log("Platform name: "+navigator.platform);
