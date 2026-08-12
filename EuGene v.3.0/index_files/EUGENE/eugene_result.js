// ============================================================
// EUGENE_RESULT.JS - Versão 3.1 - 06/08/2026
// ============================================================

$(document).ready(function() {

    // Bloqueia Ctrl+F, Ctrl+G e F3
    $(document).keydown(function(e) {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'f' || e.key === 'g')) {
            e.preventDefault();
            alert('A busca por palavras está desabilitada neste jogo. Use sua atenção!');
        }
        if (e.key === 'F3') {
            e.preventDefault();
            alert('A busca por palavras está desabilitada neste jogo. Use sua atenção!');
        }
    });

    // ============================================================
    // 1. VARIÁVEIS GLOBAIS E LISTAS
    // ============================================================

    var words = ["EUGENE"];

    // ============================================================
    // 2. CÓDIGO GENÉTICO
    // ============================================================
    var genetic_code = {
        A: ["GCU"], B: ["GCG"], C: ["UGC"], D: ["GAC"], E: ["GAA"],
        F: ["UUC"], G: ["GGA"], H: ["CAC"], I: ["AUC"], J: ["GGG"],
        K: ["AAA"], L: ["CUU"], M: ["AUG"], N: ["AAC"], O: ["CUG"],
        P: ["CCA"], Q: ["CAA"], R: ["CGU"], S: ["UCA"], T: ["ACA"],
        U: ["CCG"], V: ["GUU"], X: ["GUG"], W: ["ACC"], Y: ["UAC"],
        Z: ["CGG"]
    };

    function reverseTrans(letter) {
        var codons = genetic_code[letter];
        if (!codons) return '';
        return codons[Math.floor(Math.random() * codons.length)];
    }

    // ============================================================
    // 3. LISTAS DE PALAVRAS (puzzle_lists)
    // ============================================================
    var puzzle_lists = {
        insect: ["Borboleta", "Gafanhoto", "Joaninha", "Formiga"],
        mammal: ["Elefante", "Cachorro", "Rinoceronte", "Baleia"],
        reptile: ["Crocodilo", "Tartaruga", "Camaleão", "Lagartixa"],
        bird: ["Papagaio", "Pelicano", "Canário", "Sabiá"],
        amphibian: ["Salamandra", "Perereca", "Sapo", "Rã"],
        fish: ["Sardinha", "Salmão", "Tilápia", "Atum"],
        flower: ["Orquídea", "Girassol", "Crisântemo", "Violeta"],
        tree: ["Mangueira", "Laranjeira", "Seringueira", "Cerejeira"],
        fruit: ["Laranja", "Morango", "Tangerina", "Tomate"],
        vegetables: ["Beterraba", "Mandioca", "Abóbora", "Jiló"],
        school: ["Ciências", "Matemática", "Geografia", "Professor"],
        lab: ["Microscópio", "Centrífuga", "Reagentes", "Pipeta"],
        sport: ["Basquete", "Natação", "Atletismo", "Ginástica"],
        scientists: ["Oswaldo Cruz", "Pitágoras", "Charles Darwin", "Mendeleiev"],
        elements_easy: ["Hidrogênio", "Oxigênio", "Mercúrio", "Prata"],
        elements_hard: ["Tungstênio", "Antimônio", "Estrôncio", "Chumbo"],
        body: ["Cabelo", "Perna", "Ouvido", "Nariz"],
        cell: ["Proteína", "Ribossomo", "Mitocôndria", "Membrana"],
        biology: ["Ecologia", "Zoologia", "Bioquímica", "Genética"],
        environment: ["Reciclagem", "Reflorestamento", "Poluição", "Aquecimento"],
        candy: ["Chocolate", "Brigadeiro", "Pirulito", "Picolé"],
        food: ["Batata", "Pudim", "Farofa", "Suco"],
        beach: ["Protetor", "Canga", "Onda", "Areia"],
        computer: ["Internet", "Conexão", "Documento", "Trabalho"]
    };

    // ============================================================
    // 4. FUNÇÕES DE VALIDAÇÃO E SANITIZAÇÃO
    // ============================================================

    function sanitizeText(input) {
        if (!input) return '';
        var temp = document.createElement('div');
        temp.textContent = input;
        return temp.textContent;
    }

    function safeName(input) {
        if (!input) return 'Gregor Mendel';
        var trimmed = input.trim();
        if (trimmed.length === 0) return 'Gregor Mendel';
        var clean = sanitizeText(trimmed);
        clean = clean.replace(/[^a-zA-Z\u00C0-\u00FF\s\-']/g, '');
        if (clean.length === 0) return 'Gregor Mendel';
        if (clean.length > 50) clean = clean.substring(0, 50);
        return clean;
    }

    function safeAge(input) {
        if (!input) return '40';
        var trimmed = input.trim();
        var num = Number(trimmed);
        if (isNaN(num) || !Number.isFinite(num)) return '40';
        if (num < 0 || num > 120) return '40';
        return Math.floor(num).toString();
    }

    function safeEmail(input) {
        if (!input) return '-';
        var trimmed = input.trim();
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(trimmed)) return '-';
        return trimmed;
    }

    function safeTitle(input) {
        if (!input) return 'EUGENE';
        var trimmed = input.trim();
        if (trimmed.length === 0) return 'EUGENE';
        var clean = sanitizeText(trimmed);
        clean = clean.replace(/[<>]/g, '');
        if (clean.length > 100) clean = clean.substring(0, 100);
        return clean || 'EUGENE';
    }

    function sanitizeWord(word) {
        if (!word) return '';
        var clean = sanitizeText(word);
        clean = clean.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        clean = clean.replace(/[^a-zA-Z]/g, '');
        clean = clean.toUpperCase();
        if (clean.length > 20) clean = clean.substring(0, 20);
        return clean;
    }

    function sanitizeCustom(input) {
        if (!input) return null;
        var trimmed = input.trim();
        if (trimmed.length === 0) return null;
        var clean = sanitizeText(trimmed);
        clean = clean.replace(/[^a-zA-Z0-9\u00C0-\u00FF\s,_]/g, '');
        clean = clean.replace(/\s+/g, ' ').trim();
        if (clean.length > 500) clean = clean.substring(0, 500);
        return clean || null;
    }

    function validateDatabase(input) {
        if (!input) return 'cell';
        var validDbs = Object.keys(puzzle_lists);
        return validDbs.indexOf(input) !== -1 ? input : 'cell';
    }

    function validateLevel(input) {
        var validLevels = [
            'Nível 1: blastn',
            'Nível 2: blastp',
            'Nível 3: blastx',
            'Nível 4: tblastn',
            'Nível 5: tblastx'
        ];
        if (!input) return 'Nível 1: blastn';
        return validLevels.indexOf(input) !== -1 ? input : 'Nível 1: blastn';
    }

    // ============================================================
    // 5. FUNÇÃO PARA EXTRAIR PARÂMETROS DA URL
    // ============================================================

    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1));
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
        return null;
    }

    // ============================================================
    // 6. RECEBER E VALIDAR PARÂMETROS
    // ============================================================

    var nameParam = getUrlParameter('NAME');
    var name = safeName(nameParam);
    $('#student_name1').text(name);
    $('#student_name2').text(name);

    var ageParam = getUrlParameter('AGE');
    var age = safeAge(ageParam);
    $('#student_age').text(age);

    var emailParam = getUrlParameter('EMAIL');
    var email = safeEmail(emailParam);
    $('#email').text(email);

    var titleParam = getUrlParameter('TITLE');
    var title = safeTitle(titleParam);
    document.title = title;

    var levelParam = getUrlParameter('LEVEL');
    var level = validateLevel(levelParam);
    $('#level').text(level);

    // Palavras extras
    var customParam = getUrlParameter('CUSTOM');
    if (customParam) {
        var customClean = sanitizeCustom(customParam);
        if (customClean) {
            var customWords = customClean.split('_');
            customWords = customWords.slice(0, 20);
            for (var i = 0; i < customWords.length; i++) {
                var sw = sanitizeWord(customWords[i]);
                if (sw.length > 0) words.push(sw);
            }
        }
    }

    // Banco de dados
    var dbParam = getUrlParameter('DB');
    var db = validateDatabase(dbParam);
    if (db && puzzle_lists[db]) {
        var dbWords = puzzle_lists[db].slice(0, 20);
        for (var j = 0; j < dbWords.length; j++) {
            var dbWord = sanitizeWord(dbWords[j]);
            if (dbWord.length > 0) words.push(dbWord);
        }
    }

    $('#custom_words').text(words.join(', '));

    // ============================================================
    // 7. GERADOR DE SEQUÊNCIA
    // ============================================================

    var gen = getUrlParameter('GEN');
    if (gen) {

        var validNucleotides = ["A", "C", "G", "T"];
        var validAminoacids  = ["A", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "V", "Y"];

        var sanitizedName = sanitizeWord(name);
        if (!sanitizedName) sanitizedName = "GREGORMENDEL";

        var extraWords = words.slice(0, 20);

        var totalLength = sanitizedName.length;
        for (var w = 0; w < extraWords.length; w++) {
            totalLength += extraWords[w].length;
        }

        var sequenceLength = 2000;
        if (totalLength > sequenceLength - 50) {
            var newWords = [];
            var used = sanitizedName.length;
            for (var w = 0; w < extraWords.length; w++) {
                if (used + extraWords[w].length <= sequenceLength - 50) {
                    newWords.push(extraWords[w]);
                    used += extraWords[w].length;
                } else {
                    break;
                }
            }
            extraWords = newWords;
        }

        var seq = "";
        var rand;
        var nucleotideSet = (level === "Nível 1: blastn" ||
                             level === "Nível 4: tblastn" ||
                             level === "Nível 5: tblastx");
        var alphabet = nucleotideSet ? validNucleotides : validAminoacids;
        var alphabetSize = alphabet.length;

        for (var i = 0; i < sequenceLength; i++) {
            rand = Math.floor(Math.random() * alphabetSize);
            seq += alphabet[rand];
        }

        var myWords = [];
        var pos = Math.floor(Math.random() * (sequenceLength - totalLength - 50)) + 25;

        var name1 = sanitizedName;
        var strandEl = document.getElementById('strand');

        if (level === "Nível 3: blastx" || level === "Nível 5: tblastx") {
            name1 = name1.split("").reverse().join("");
            if (strandEl) strandEl.textContent = "Strand = Plus/Minus ";
        } else {
            if (strandEl) strandEl.textContent = "Strand = Plus/Plus ";
        }

        var nameDisplay = name1;
        if (level === "Nível 4: tblastn" || level === "Nível 5: tblastx") {
            var nameCodons = "";
            for (var k = 0; k < name1.length; k++) {
                var codon = reverseTrans(name1[k]);
                if (codon) nameCodons += codon;
            }
            name1 = nameCodons;
        }

        if (name1.length > sequenceLength - 100) {
            name1 = name1.substring(0, sequenceLength - 100);
        }

        seq = seq.substring(0, pos) + name1 + seq.substring(pos + name1.length);
        myWords.push(name1);

        for (var w = 0; w < extraWords.length; w++) {
            var word = extraWords[w];
            var maxAttempts = 100;
            var inserted = false;
            for (var attempt = 0; attempt < maxAttempts; attempt++) {
                var randPos = Math.floor(Math.random() * (sequenceLength - word.length - 50)) + 25;
                var overlap = false;
                for (var m = 0; m < myWords.length; m++) {
                    if (Math.abs(randPos - pos) < word.length + 10) {
                        overlap = true;
                        break;
                    }
                }
                if (!overlap && randPos + word.length <= sequenceLength) {
                    seq = seq.substring(0, randPos) + word + seq.substring(randPos + word.length);
                    myWords.push(word);
                    inserted = true;
                    break;
                }
            }
            if (!inserted) {
                seq = seq.slice(0, -word.length) + word;
                myWords.push(word);
            }
        }

        // --- ATUALIZA A INTERFACE ---

        var seqDisplay = nameDisplay;
        var matchBar = nameDisplay.replace(/./g, "|");

        if (level === "Nível 4: tblastn" || level === "Nível 5: tblastx") {
            seqDisplay = name1; // exibe os códons
            matchBar = name1.replace(/./g, "|");
        }

        if (level === "Nível 5: tblastx") {
            // Para tblastx, o nome original foi revertido e depois traduzido.
            // A barra de match deve ter espaços para alinhar com a sequência de códons.
            matchBar = " " + name1.split("").join("  ");
        }

        var queryEl = document.getElementById('query');
        var nameLengthEl = document.getElementById('name_length');
        var matchBarEl = document.getElementById('match_bar');
        var matchEl = document.getElementById('match');

        if (queryEl) queryEl.textContent = "1\t" + nameDisplay + "\t" + nameDisplay.length;
        if (nameLengthEl) nameLengthEl.textContent = nameDisplay.length;
        if (matchBarEl) matchBarEl.textContent = "\t" + matchBar;
        if (matchEl) matchEl.textContent = pos + "\t" + seqDisplay + "\t" + (seqDisplay.length + pos);

        // Preenche as 20 linhas
        for (var l = 0; l < 20; l++) {
            var lineEl = document.getElementById('line' + l);
            if (lineEl) {
                var start = l * 100;
                var end = start + 100;
                lineEl.textContent = seq.substring(start, end);
            }
        }
    } // fim do if(gen)

// ============================================================
// 8. CONTROLE DE EXIBIÇÃO DOS RODAPÉS (DNA vs CÓDONS)
// ============================================================
var codonSection = document.getElementById('codonSection');
var dnaFooter = document.getElementById('dnaFooter');

if (codonSection && dnaFooter) {
    if (level === "Nível 4: tblastn" || level === "Nível 5: tblastx") {
        codonSection.classList.add('show-codon');
        dnaFooter.style.display = 'none';
    } else {
        codonSection.classList.remove('show-codon');
        dnaFooter.style.display = ''; // volta ao normal
    }
}
}); // fim do $(document).ready