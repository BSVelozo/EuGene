$(document).ready(function(){
//    alert("Working");
// Global var
var words = new Array();
    words.push("EuGene");

// Codons
genetic_code = {
    A:["GCT"],
    B:["GCG"],
    C:["TGC"],
    D:["GAC"],
    E:["GAA"],
    F:["TTC"],
    G:["GGA"],
    H:["CAC"],
    I:["ATC"],
    J:["GGG"],
    K:["AAA"],
    L:["CTT"],
    M:["ATG"],
    N:["AAC"],
    O:["CTG"],
    P:["CCA"],
    Q:["CAA"],
    R:["CGT"],
    S:["TCA"],
    T:["ACA"],
    U:["CCG"],
    V:["GTT"],
    X:["GTG"],
    W:["ACC"],
    Y:["TAC"],
    Z:["CGG"]
};

    var reverseTrans = function reverseTrans(letter) {
	if (letter == "B"){
	    letter = "B";
	}else if (letter == "J"){
		letter = "J";
	}else if (letter == "O"){
		letter = "O";
	}else if (letter == "X"){
		letter = "X";
	}else if (letter == "Z"){
		letter = "Z";
	}else if(letter == "U"){
		letter = "U";
	}
//	alert(letter);
	letter1 = genetic_code[letter][Math.floor(Math.random()*genetic_code[letter].length)]
//	alert(letter1);
	name2 += letter1;
    };

// Lists
puzzle_lists = {
    insect:["Borboleta", "Barata", "Joaninha", "Formiga", "Besouro", "Gafanhoto", "Grilo", "Mosquito"],
    mammal:["Humano", "Cachorro", "Macaco", "Tigre", "Elefante", "Rinoceronte", "Baleia", "Foca"],
    reptile:["Jacaré", "Cobra", "Camaleão", "Tartaruga", "Crocodilo", "Lagartixa", "Lagarto", "Jabuti"],
    bird:["Arara", "Tucano", "Canário", "Papagaio", "Pelicano", "Periquito", "Coruja", "Sabiá"],
    amphibian:["Sapo", "Perereca", "Rã", "Salamandra", "Cobra cega"],
    fish:["Sardinha", "Bagre", "Salmão", "Tilápia", "Atum", "Linguado", "Pintado", "Peixe palhaço"],
    flower:["Orquídea", "Girassol", "Rosa", "Cravo", "Lírio", "Violeta", "Margarida", "Crisântemo"],
    tree:["Mangueira", "Amoreira", "Bananeira", "Laranjeira", "Amendoeira", "Seringueira", "Salgueiro", "Cerejeira"],
    fruit:["Banana", "Laranja", "Uva", "Manga", "Morango", "Caqui", "Tangerina", "Tomate"],
    vegetables:["Cenoura", "Batata", "Mandioca", "Vagem", "Beterraba", "Chuchu", "Abóbora", "Jiló"],
    school:["Ciências", "Português", "Matemática", "História", "Artes", "Geografia", "Professor", "Aluno"],
    lab:["Erlenmeyer", "Pipeta", "Estufa", "Microscópio", "Centrífuga", "Tubo de ensaio", "Becher", "Reagentes"],
    sport:["Vôlei", "Basquete", "Futebol", "Natação", "Handebol", "Ginástica", "Atletismo", "Boxe"],
    scientists:["Marrie Currie", "Albert Einstein", "Oswaldo Cruz", "Barbara Mcclintock", "Pitágoras", "Gregor Mendel", "Charles Darwin", "Dmitri Mendeleiev"],
    elements_easy:["Hidrogênio", "Oxigênio", "Hélio", "Fósforo", "Mercúrio", "Prata", "Ouro", "Cloro"],
    elements_hard:["Chumbo", "Potássio ", "Enxofre", "Tungstênio", "Sódio", "Estanho", "Antimônio", "Estrôncio"],
    body:["Boca", "Ouvido", "Mão", "Perna", "Cabelo", "Nariz", "Dedo", "Pé"],
    cell:["DNA", "RNA", "Proteína", "Enzimas", "Ribossomo", "Mitocôndria", "Núcleo", "Membrana"],
    biology:["Evolução", "Ecologia", "Zoologia", "Botânica", "Bioquímica", "Genética", "Anatomia", "Fisiologia"],
    environment:["Reciclagem", "Agroecologia", "Reflorestamento", "Desmatamento", "Poluição", "Chuva ácida", "Efeito estufa", "Aquecimento global"],
    candy:["Bala", "Chocolate", "Sorvete", "Brigadeiro", "Jujuba", "Pirulito", "Gelatina", "Picolé"],
    food:["Arroz", "Bolo", "Pudim", "Carne", "Sopa", "Farofa", "Batata", "Suco"],
    beach:["Sol", "Mar", "Areia", "Protetor", "Coco", "Sunga", "Canga", "Onda"],
    computer:["Jogo", "Estudo", "Vídeo", "Documento", "Trabalho", "Internet", "Rede", "Conexão"]
};

    var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
           sURLVariables = sPageURL.split('&'),
           sParameterName,
           i;

	for (i = 0; i < sURLVariables.length; i++) {
           sParameterName = sURLVariables[i].split('=');

           if (sParameterName[0] === sParam) {
               return sParameterName[1] === undefined ? true : sParameterName[1];
	   }
	}
    };

   var name = getUrlParameter('NAME');
   if (Boolean(name)){
//	alert ("Studant xname is "+name+"!");
   }else{
	name = "Gregor Mendel";
   }
	$('#student_name1').text(name);
	$('#student_name2').text(name);


   var title = getUrlParameter('TITLE');
   if (Boolean(title)){
	document.title = title;
   }else{
	document.title = name;
   }

   var level = getUrlParameter('LEVEL');
   if (Boolean(level)){
	$('#level').text(level);
//	alert ("Studant xname is "+name+"!");
   }
   var custom = getUrlParameter('CUSTOM');
   if (custom){
	var lCustom = custom.split("_");
	words = words.concat(lCustom);
   }
   var db = getUrlParameter('DB');
   if (db){
	words = words.concat(puzzle_lists[db]);
   }
	$('#custom_words').text(words.join(", "));


// Sequence generator
   var gen = getUrlParameter('GEN');
   if (gen){
//     alert ("Gen is working");
     var nucleotides = ["A","C","G","T"];
     var aminoacids  = ["A","C","D","E","F","G","H","I","J","K","L","M","N","P","Q","R","S","T","W","V","Y"];

     var seq = "";
     var i;
     var rand = 0;

   if (level == "blastn" || level == "tblastn" || level == "tblastx"){
     for (i = 0; i < 2000; i++) {
       rand = Math.ceil(Math.random() * 4) -1;
       seq += nucleotides[rand];
     }

   }
   if (level == "blastp" || level == "blastx"){
     for (i = 0; i < 2000; i++) { 
       rand = Math.ceil(Math.random() * 20) -1;
       seq += aminoacids[rand];
     }
   }

// Insert words
   var myWords = new Array();

// Insert name
    var pos = Math.ceil(Math.random() * 1800);
//    alert(rand);

// Processing name
    var name1 = name.normalize('NFD').replace(/[\u0300-\u036f\s]/g, "").toUpperCase();
// Reverse
	if (level == "blastx" || level == "tblastx"){
//	alert (name1);
	name1 = name1.split("").reverse().join("");
	$("#strand").text("Strand = Plus/Minus ");
	}

//Retro translate
	if (level == "tblastn" || level == "tblastx"){
	lname1 = name1.split("");
//	alert(lname1);
	var name2 = "";
	lname1.forEach(reverseTrans);
//	alert (name2);
	name1 = name2;

// reverseTrans other words
	for (var index = 0; index < words.length; index++){
		name2 = "";
//		alert (words[index]);
		wordN = words[index].normalize('NFD').replace(/[\u0300-\u036f\s]/g, "").toUpperCase();
		lwords = wordN.split("");
		lwords.forEach(reverseTrans);
		words[index] = name2;
	}
	}

// Adjusting match
	var match_bar = "";
	if (level == "tblastx"){
	name2 = "";
	match_bar = " "+lname1.join("  ");
	lname1.forEach(reverseTrans);
	}else{
	match_bar = name1.replace(/./g, "|");
	name2 = name1;
	}

    seq = seq.substring(0,pos)+String.fromCharCode(97+myWords.length)+seq.substring(pos,seq.length-name1.length);
	myWords.push(name1);

//Insert other words
    var insertWord = function insertWord(word) {
	if (word.length > 0){
//	alert(word);
	var rand = Math.ceil(Math.random() * 1750);
	var word1 = word.normalize('NFD').replace(/[\u0300-\u036f\s]/g, "").toUpperCase();
	if (rand < pos){ // Correct Blast position
	pos += word1.length;
	}
	var marker = String.fromCharCode(97+myWords.length);
//		alert(rand);
	seq = seq.substring(0,rand)+marker+seq.substring(rand,seq.length-word1.length);
	    myWords.push(word1);
	}
    };
    words.forEach(insertWord);

// Replacing numbers for words
   for (i = 0; i <= myWords.length; i++) {
	var marker = String.fromCharCode(97+i);
//	alert(marker);
	seq = seq.replace(marker,myWords[i]);
   }

// Updating page

// Blast information
	$('#query').text("1	"+name2+"	"+name2.length);
	$('#name_length').text(name1.length);
	$('#match_bar').text("	"+match_bar);
	$('#match').text(pos+"	"+name1+"	"+(name1.length+pos));

// Sequence information
     var line = "";
     var string = "";

     for (i=0;i<20;i++){
        string = seq.substring(i*100, i*100+100);
        line = "#line"+i;
        $(line).text(string);
     }
   }
});
