$(document).ready(function(){

    // ===== REDIMENSIONAMENTO DE IMAGENS =====
    var divWidth = $('#chooseprog').width();
    if (divWidth < 1200) {
        var imgWidth = divWidth * 0.3;
        $('.chooseprog img').css('width', imgWidth + 'px');
    }
    $(window).resize(function() {
        var divWidth = $('#chooseprog').width();
        var imgWidth = divWidth * 0.3;
        $('.chooseprog img').css('width', imgWidth + 'px');
    });

    // ===== TROCA DE ABAS (NÍVEIS) =====
    $(".bc-tabs span").click(function(){
        var $myid = $(this).attr("header");
        $(".tab-current").toggleClass('tab-select tab-current');
        $(".tab-lh").toggleClass('tab-lh tab');
        $(".tab-rh").toggleClass('tab-rh tab');
        $(this).parent().prev('li').toggleClass('tab-lh tab');
        $(this).parent().next('li').toggleClass('tab-rh tab');
        $(this).parent().toggleClass('tab-select tab-current');
        blast_type = $(this).val();
        $(".pageTitle").find("span").text($myid);
    });

    // ===== FUNÇÕES DE VALIDAÇÃO (com fallback) =====
    function validateName(input) {
        if (!input) return 'Gregor Mendel';
        var trimmed = input.trim();
        if (trimmed.length === 0) return 'Gregor Mendel';
        var cleaned = trimmed.replace(/[^a-zA-Z\u00C0-\u00FF\s\-']/g, '');
        if (cleaned.length === 0) return 'Gregor Mendel';
        if (cleaned.length > 50) cleaned = cleaned.substring(0, 50);
        return cleaned;
    }

    function validateAge(input) {
        if (!input) return '40';
        var trimmed = input.trim();
        var num = Number(trimmed);
        if (isNaN(num) || !Number.isFinite(num)) return '40';
        if (num < 0 || num > 120) return '40';
        return Math.floor(num).toString();
    }

    function validateEmail(input) {
        if (!input) return '-';
        var trimmed = input.trim();
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(trimmed)) return '-';
        return trimmed;
    }

    function validateTitle(input, defaultTitle) {
        if (!input) return defaultTitle;
        var trimmed = input.trim();
        if (trimmed.length === 0) return defaultTitle;
        if (trimmed.length > 100) trimmed = trimmed.substring(0, 100);
        trimmed = trimmed.replace(/[<>]/g, '');
        return trimmed;
    }

    function validateCustomWords(input) {
        if (!input) return null;
        var trimmed = input.trim();
        if (trimmed.length === 0) return null;
        var cleaned = trimmed.replace(/\s+/g, ' ').trim();
        if (cleaned.length > 500) cleaned = cleaned.substring(0, 500);
        return cleaned;
    }

    // ===== EVENTO DE CLIQUE NO BOTÃO "BLAST" =====
    $(".summary img").click(function(){
        var options = [];

        // 1. Nome
        var nameVal = validateName($("#student_name").val());
        options.push("NAME=" + encodeURIComponent(nameVal));

        // 2. Idade
        var ageVal = validateAge($("#student_age").val());
        options.push("AGE=" + encodeURIComponent(ageVal));

        // 3. Email
        var emailVal = validateEmail($("#email").val());
        options.push("EMAIL=" + encodeURIComponent(emailVal));

        // 4. Título
        var fase = $(".tab-current span").text();
        var titleVal = validateTitle($("#qtitle").val(), fase);
        options.push("TITLE=" + encodeURIComponent(titleVal));

        // 5. Palavras extras
        var customVal = validateCustomWords($("#qorganism").val());
        if (customVal) {
            var lcustom = customVal.split(", ");
            var scustom = "CUSTOM=" + encodeURIComponent(lcustom.join("_"));
            options.push(scustom);
        }

        // 6. Nível e banco
        options.push("LEVEL=" + encodeURIComponent(fase));
        options.push("DB=" + encodeURIComponent($("#DATABASE").val()));

        // Abrir a página de resultados
        var soptions = options.join("&");
        window.open("index_files/EUGENE.html?GEN&" + soptions);
    });

    // ===== NAVEGAÇÃO PELOS ÍCONES DA HOME =====
    $("#chooseprog span").click(function(){
        var selectTab = "#" + $(this).attr("program");
        $("#home-wrap").hide();
        $("#search-content").show();
        $(selectTab).trigger("click");
    });

    $(".home-link").click(function(){
        $("#home-wrap").show();
        $("#search-content").hide();
        // (selectTab não definido aqui, mas não é necessário)
    });

    // ===== EFEITO MOUSEOVER NO BOTÃO =====
    $(".mouseover")
        .mouseover(function() {
            var $ovrimage = $(this).find("img").attr("mouseovimg");
            $(this).find("img").attr("src", $ovrimage);
        })
        .mouseout(function() {
            var $outimage = $(this).find("img").attr("mouseoutimg");
            $(this).find("img").attr("src", $outimage);
        });

    // ===== PARÂMETRO "PROGRAM" NA URL (para carregar aba específica) =====
    var getUrlParameter = function(sParam) {
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
    var program = getUrlParameter('PROGRAM');
    if (program) {
        var programTab = "#" + program + "Tab";
        $("#home-wrap").hide();
        $("#search-content").show();
        $(programTab).trigger("click");
    }
});