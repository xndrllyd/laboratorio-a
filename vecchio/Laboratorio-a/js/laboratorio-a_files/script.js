var page = {
	articles	: {
		"laboratorio"	: "laboratorio_Floor0",
		"webdesign"		: "laboratorio_Floor1",
		"artdirection"	: "laboratorio_Floor2",
		"events"		: "laboratorio_Floor3",
		"webdeveloper"	: "laboratorio_Floor4",
		"works"			: "works_Floor0",
		"presentation"	: "works_Floor1",
		"clients"		: "section_Floor2",
		"contacts"		: "contacts_Floor0",
		"write"			: "contacts_Floor1"
	},
	pos			: "laboratorio_Floor0",
	height		: parseInt($(window).height()),
	update		: function() {
		this.pos	= this.articles[(window.location.hash).replace("#/","")];
		this.height	= parseInt($(window).height());
	},
	shuffle		: function() {
		$("#" + this.pos + " h2").shuffleLetters({'fps':50});
  		$("#" + this.pos + " p").shuffleLetters({'fps':250});
	}
}

$(function() {
	page.update();
	_centerText();
	_shuffleLetters(page.pos);
	// CLASS PER MODALITÀ MOBILE
	/*if($(window).width() <= 800) {
		$("nav").addClass("mobile");
	}
	
	$("header").css("display","none");
	
	$(window.location.hash + " .page-wrapper").css("opacity","0");
	$(window.location.hash + " .page-wrapper").animate({opacity: 1},1000); // ANIMAZIONE TESTO
	 		
  	centerText(window.location.hash);
	lettersShuffle(window.location.hash);
	headerToggle(window.location.hash);
	navSelected(window.location.hash);
	wrapperHeight($(("nav li.selected")).attr("id")); 
	*/
	// LOGO CLICK
	/*$("#logo").click(function() {
		$("nav li[id='#laboratorio']").trigger("click");
	});
	*/
	// APRE IL MENU IN MODALITÀ MOBILE USANDO IL PLUGIN JQUERY UI	
	/*$("nav.mobile").click(function() {
		$("nav.mobile ul").toggle('slide', { direction: 'right' });
	});
	*/
	//NAVIGATOR LINK CLICK
	/*$("nav li").click(function() {
		var li		= $(this),
	 		hash	= li.attr("id"),
	 		target	= $(hash);
		
		wrapperHeight(hash);
		
		$(hash + " .page-wrapper").css("opacity",0);
		$("html,body").stop().animate({scrollTop: target.offset().top},900,"swing",function() {
			$(hash + " .page-wrapper").animate({opacity: 1},600);
				navSelected(window.location.hash);
				headerToggle(hash);
				window.location.hash = hash;
				lettersShuffle(hash);
			}
		);
					
	});
	*/
	// ANIMAZIONE FADE
	$(".btn-scroll").click(function() {
		page.update();
		var cur = page.pos;
		var target = $(this).parent().parent().next().attr("id");

		$("#" + cur + " .page-wrapper").css("opacity",1);
		$("#" + target + " .page-wrapper").css("opacity",0);

		$("#" + cur + " .page-wrapper").animate({"opacity":0},700, function() {
			$("#" + cur + " .page-wrapper").css("opacity",1);
			$("#" + target + " .page-wrapper").animate({"opacity":1},300);
			_shuffleLetters(target);	
		});
	});
	
	$(".btn-jump").click(function() {
		page.update();
		var cur = page.pos;
		var target = $(this).parent().parent().parent().next().children("article").attr("id");

		$("#" + cur + " .page-wrapper").css("opacity",1);
		$("#" + target + " .page-wrapper").css("opacity",0);

		$("#" + cur + " .page-wrapper").animate({"opacity":0},500, function() {
			$("#" + cur + " .page-wrapper").css("opacity",1);
			$("#" + target + " .page-wrapper").animate({"opacity":1},300);
			
		});
	});
	
	// JUMP BUTTON CLICK
	/*$(".btn-jump").click(function() {
		window.location.hash = $(this).parent().parent().parent().next().attr("id");
		headerToggle(window.location.hash);
		navSelected(window.location.hash);
		lettersShuffle(window.location.hash);
	});
	*/
	// LINEE DI TEXTAREA USANDO SVG
	var svg = "<svg xmlns='http://www.w3.org/2000/svg' width='1' height='40px'><line x1='0' y1='40px' x2='1' y2='40px' stroke='#A7272D' stroke-width='2px'/></svg>";
	$("form textarea").attr('style','background-image: url("data:image/svg+xml;utf8,' + svg + '")}');
	
	// LIMITA LE RIGHE DI TEXTAREA
	$('form textarea').keydown(function(e) {
        var lines = $(this).val().split("\n").length;

        if(e.keyCode == 13 && lines >= $(this).attr('rows')) {
            return false;
        }
    });
 
 	// LO SCORRIMENTO DEL SITO USANDO ASCENSOR
    $('#ascensorBuilding').ascensor({direction:"x", childType:"section", ascensorName:"section_", ascensorFloorName:["laboratorio", "works", "clients" , "contacts"], overflow:"hidden"});
    $('#section_Floor0').ascensor({direction:"y", childType:"article", time:700, ascensorName:"laboratorio_", ascensorFloorName:["laboratorio", "webdesign", "artdirection", "events" , "webdeveloper"]});
    $('#section_Floor1').ascensor({direction:"y", childType:"article", ascensorName:"works_", ascensorFloorName:["works", "presentation"]});
    $('#section_Floor3').ascensor({direction:"y", childType:"article", ascensorName:"contacts_", ascensorFloorName:["contacts", "write"]});
});

// ON RESIZE
$(window).resize(function() {
	//_centerText();
	/*if($(window).width() <= 800) {
		if(!$("nav").hasClass("mobile")) {
			$("nav").addClass("mobile");
			$("nav.mobile ul").css("display","none");
			$("nav.mobile").click(function() {
				$("nav.mobile ul").toggle('slide', { direction: 'right' });
			});
		}
	} else {
		if($("nav").hasClass("mobile")) {
			$("nav.mobile").unbind("click");
			$("nav").removeClass("mobile");
			$("nav ul").css("display","block");
		}
	}*/
});

// CENTRA IL TESTO VERTICALMENTE
function _centerText() {
	$("div.page-wrapper").each(function(index, elm) {
		var margin = 0;
		
		if($(elm).parent().attr("id") != "laboratorio_Floor0") {
			if($("body").hasClass("mobile")) {
				margin = 56;
			} else {
				margin = 47;
			}
		}
				
		margin += (Math.floor(page.height - parseInt($(elm).height())));
		margin /= 2;
		$(elm).css("marginTop",(margin + "px"));
	});
}
/*
// ALTERNA LA PARTE DEL HEADER
function headerToggle(hash) {
	if(hash == "" || hash == "#laboratorio") {
		$("header").slideUp();
	} else {		
		if($("header").css("display") == "none") {
			$("header").slideDown();
			$("nav.mobile ul").css("display","none");
		}
	}
}
*/
// ANIMAZIONE LETTERE USANDO IL PLUGIN LETTERSHUFFLE
function _shuffleLetters(pos) {
	$("#" + pos + " h2").shuffleLetters({'fps':50});
  	$("#" + pos + " p").shuffleLetters({'fps':250});
}

// SELEZIONA IL LINK ATTUALE
/*function navSelected(hash) {
	$("nav li").removeClass("selected");

	if(hash.replace("#","") == $("section" + hash).attr("id")) {
		$("nav li[id=" + hash +"]").addClass("selected");
	} else {
		$("nav li[id=#" + $("section " + hash).parent().attr("id") +"]").addClass("selected");
	}
}
*/
// DETERMINA L'ALTEZZA DEL SECTION
/*function wrapperHeight(hash) {
	$("#wrapper").height($(hash).height());	
}*/