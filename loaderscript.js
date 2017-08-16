var button = bind("startbutton"),
	pFileSelector = bind("pfileinput"),
	pImg = bind("pimg"),
	qFileSelector = bind("qfileinput"),
	qImg = bind("qimg"),
	text = bind("text");

var qfilefound = false,
	pfilefound = false;

var string = sessionStorage.getItem("qjson");
if (string) {
	sessionStorage.setItem("qjson", string);
	qfilefound = true;
	qImg.src = "checkmark.png";
}

string = sessionStorage.getItem("pjson");
if (string) {
	sessionStorage.setItem("pjson", string);
	pfilefound = true;
	pImg.src = "checkmark.png";
}

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
	// Great success! All the File APIs are supported.
} else {
  	alert("The File APIs are not fully supported in this browser.");
}

function bind(id) { // shortcut for document.getElementById
  	return document.getElementById(id);
}

function make(type) {
	return document.createElement(type);
}

function textNode(text) {
	return document.createTextNode(text);
}

function readFile(e) {
	alert("Reading File");
	var file  = e.target.files[0];
	var selector = this;
	if (file) {
		var reader = new FileReader();
		reader.onload = function (t) {
			loadFile(t, selector);
		}
		reader.readAsText(file);
	} else {
		alert("Failed to load file");
	}
}

function loadFile(t, source) {
	alert("Loading File");
	
	var json = JSON.parse(t.target.result);
	text.innerHTML = t.target.result;

	if (source == pFileSelector) {
		sessionStorage.setItem("pjson", t.target.result);
		if (json["pokemon"]) { // pokemon.json file found
			pfilefound = true;
			pImg.src = "checkmark.png";
		} else {
			pfilefound = false;
			pImg.src = "xmark.svg";
		}
	} else if (source == qFileSelector) {
		sessionStorage.setItem("qjson", t.target.result);
		if (json["questions"]) { // questions.json file found
			qfilefound = true;
			qImg.src = "checkmark.png";
		} else {
			qfilefound = false;
			qImg.src = "xmark.svg";
		}
	} else {
		alert("Source not found");
	}
}

function buttonClicked() {
	if (qfilefound && pfilefound) {
		window.location.href = "quiz.html";
	} else if (qfilefound) {
		alert("Introducza el documento 'pokemon.json' para continuar");
	} else if (pfilefound) {
		alert("Introducza el documento 'questions.json' para continuar");
	} else {
		alert("Introducza los documento 'pokemon.json' y 'questions.json' para continuar");
	}
}

/*
function updateGui(string) {
	text.innerHTML = (string);
	bind("questionlist").appendChild( 
		makeUl( JSON.parse(string) )
	);
}

function makeUl(json) {
	var list = make("ul");
	var easy = json.questions.easy;
	for (var i in easy) {
		var item = makeLi(easy[i], i);
		list.appendChild(item);
	}
	return list;
}

function makeLi(question, i) {
	var container = make("li");
	var a = make("a");
	var title = "Pregunta " + i;
	a.title = title;
	a.href = "quiz.html";
	a.addEventListener('click', function() { 
	    sessionStorage.setItem("question", JSON.stringify(question));
	});
	a.appendChild(textNode(title));
	container.appendChild(a);
	var list = make("ul");
	var answers = question.answers;
	container.appendChild(list);
	for (var i in answers) {
		var item = make("li");
		item.appendChild(
			textNode(answers[i].answer)
		);
		list.appendChild(item);
	}
	return container;
}
*/

pFileSelector.addEventListener("change", readFile, false);
qFileSelector.addEventListener("change", readFile, false);
button.addEventListener("click", buttonClicked);

