$(document).ready(function(){

//Handle image size

var divWidth = $('#chooseprog').width();
//alert (divWidth);
    if (divWidth < 1200) {
//	alert (divWidth);
        var imgWidth = divWidth*0.3;
        $('.chooseprog img').css('width', imgWidth + 'px');
}
$(window).resize(function() {
var divWidth = $('#chooseprog').width();
//alert (divWidth);
  //resize just happened, pixels changed
        var imgWidth = divWidth*0.3;
        $('.chooseprog img').css('width', imgWidth + 'px');
});

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

    $(".summary img").click(function(){
	var options = new Array();
	var options = new Array();

// 1. Nome
var name = "NAME=" + encodeURIComponent($("#student_name").val());
options.push(name);

// 2. Palavras extras (CUSTOM)
if (Boolean($("#qorganism").val())){
    var custom = $("#qorganism").val();
    var lcustom = custom.split(", ");
    var scustom = "CUSTOM=" + encodeURIComponent(lcustom.join("_"));
    options.push(scustom);
}

// 3. Título
var qtitle = "TITLE=" + encodeURIComponent($("#qtitle").val());
options.push(qtitle);

// 4. Idade
var age = "AGE=" + encodeURIComponent($("#student_age").val());
options.push(age);

// 5. Nível (mesmo sendo texto fixo, codifique por segurança)
var type = "LEVEL=" + encodeURIComponent($(".tab-current span").text());
options.push(type);

// 6. Banco de dados
var db = "DB=" + encodeURIComponent($("#DATABASE").val());
options.push(db);

// 7. Email
var email = "EMAIL=" + encodeURIComponent($("#email").val());
options.push(email);

// Agora todos os valores já estão codificados, juntar com "&" é 100% seguro
var soptions = options.join("&");
window.open("index_files/EUGENE.html?GEN&" + soptions);

// POST values to Google spread sheet
//	$.get("https://script.google.com/macros/s/AKfycby1yO60CyPBsbrj4MFAV2jbXXhXOB4KapZfiXj3Hjvr_xkY_bA/exec?"+soptions,
//        function(data,status){
//            alert("Data: " + data + "\nStatus: " + status);
//        });
//
//
    });


    $("#chooseprog span").click(function(){
        var selectTab = "#"+$(this).attr("program");
//	alert(selectTab);
	$("#home-wrap").hide();
	$("#search-content").show();
        $(selectTab).trigger("click");
    });

    $(".home-link").click(function(){
	$("#home-wrap").show();
	$("#search-content").hide();
        $(selectTab).trigger("click");
    });


    $( ".mouseover" )
        .mouseover(function() {
            var $ovrimage = $( this ).find("img").attr("mouseovimg");
            $( this ).find("img").attr("src",$ovrimage);
        })

        .mouseout(function() {
            var $outimage = $( this ).find("img").attr("mouseoutimg");
            $( this ).find("img").attr("src",$outimage);
    });



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
   var program = getUrlParameter('PROGRAM');
   if (program){
      var programTab = "#"+program+"Tab";
      $("#home-wrap").hide();
      $("#search-content").show();
      $(programTab).trigger("click");
   }

});


