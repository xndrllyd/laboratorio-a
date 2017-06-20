var page = {
	articles : {
		"laboratorio"		: "ascensorFloor0",
		"webdesign"			: "ascensorFloor1",
		"artdirection"		: "ascensorFloor2",
		"events"			: "ascensorFloor3",
		"webdeveloper"		: "ascensorFloor4",
		"works"				: "ascensorFloor5",
		"gallery"			: "ascensorFloor6",
		"akkua"				: "ascensorFloor7",
		"alartariosto"		: "ascensorFloor8",
		"alessio"			: "ascensorFloor9",
		"costant"			: "ascensorFloor10",
		"altadesign"		: "ascensorFloor11",
		"killforkicks"		: "ascensorFloor12",
		"casadesign"		: "ascensorFloor13",
		"logos"				: "ascensorFloor14",
		"claudia"			: "ascensorFloor15",
		"deponte"			: "ascensorFloor16",
		"ernst"				: "ascensorFloor17",
		"iemi"				: "ascensorFloor18",
		"sunmusic"			: "ascensorFloor19",
		"fivefittings"		: "ascensorFloor20",
		"interniinpelle"	: "ascensorFloor21",
		"varese"			: "ascensorFloor22",
		"mariana"			: "ascensorFloor23",
		"ncba"				: "ascensorFloor24",
		"santopalato"		: "ascensorFloor25",
		"trussardi"			: "ascensorFloor26",
		"piazzacitta"		: "ascensorFloor27",
		"villador"			: "ascensorFloor28",
		"cattolica"			: "ascensorFloor29",
		"leonebifulco01"	: "ascensorFloor30",
		"leonebifulco02"	: "ascensorFloor31",
		"clients"			: "ascensorFloor32",
		"contacts"			: "ascensorFloor33",
		"write"				: "ascensorFloor34"
	},
	links : {
		"ascensorFloor0"	: "ascensorLink0",
		"ascensorFloor1"	: "ascensorLink0",
		"ascensorFloor2"	: "ascensorLink0",
		"ascensorFloor3"	: "ascensorLink0",
		"ascensorFloor4"	: "ascensorLink0",
		"ascensorFloor5"	: "ascensorLink5",
		"ascensorFloor6"	: "ascensorLink5",
		"ascensorFloor7"	: "ascensorLink5",
		"ascensorFloor8"	: "ascensorLink5",
		"ascensorFloor9"	: "ascensorLink5",
		"ascensorFloor10"	: "ascensorLink5",
		"ascensorFloor11"	: "ascensorLink5",
		"ascensorFloor12"	: "ascensorLink5",
		"ascensorFloor13"	: "ascensorLink5",
		"ascensorFloor14"	: "ascensorLink5",
		"ascensorFloor15"	: "ascensorLink5",
		"ascensorFloor16"	: "ascensorLink5",
		"ascensorFloor17"	: "ascensorLink5",
		"ascensorFloor18"	: "ascensorLink5",
		"ascensorFloor19"	: "ascensorLink5",
		"ascensorFloor20"	: "ascensorLink5",
		"ascensorFloor21"	: "ascensorLink5",
		"ascensorFloor22"	: "ascensorLink5",
		"ascensorFloor23"	: "ascensorLink5",
		"ascensorFloor24"	: "ascensorLink5",
		"ascensorFloor25"	: "ascensorLink5",
		"ascensorFloor26"	: "ascensorLink5",
		"ascensorFloor27"	: "ascensorLink5",
		"ascensorFloor28"	: "ascensorLink5",
		"ascensorFloor29"	: "ascensorLink5",
		"ascensorFloor30"	: "ascensorLink5",
		"ascensorFloor31"	: "ascensorLink5",
		"ascensorFloor32"	: "ascensorLink32",
		"ascensorFloor33"	: "ascensorLink33",
		"ascensorFloor34"	: "ascensorLink33"

	},
	pos		: "ascensorFloor0",
	width	: parseInt($(window).width()),
	height	: parseInt($(window).height()),
	top		: $("#ascensorBuilding").scrollTop(),
	update	: function() { // AGGIORNAMENTO DATI
		this.pos	= this.articles[(window.location.hash).replace("#/","")];
		this.width	= parseInt($(window).width());
		this.height	= parseInt($(window).height());
		this.top	= $("#ascensorBuilding").scrollTop();
	},
	shuffleLetters : function(p) { // ANIMAZIONE LETTERE USANDO IL PLUGIN LETTERSHUFFLE
		$("#" + p + " h2").shuffleLetters({'fps':50});
  		$("#" + p + " p").shuffleLetters({'fps':250});
	},
	centerText : function() { // CENTRA IL TESTO VERTICALMENTE
		this.update();
		$("div.page-wrapper").each(function(index, elm) {
			var margin = 0;
		
			if($(elm).parent().attr("id") != "ascensorFloor0") {
				margin = 47;
			}
				
			margin += (Math.floor(page.height - parseInt($(elm).height())));
		
			if(margin <= 0) {
				margin = 0;
			} else {
				margin /= 2;
			}

			$(elm).css("marginTop",(margin + "px"));
		});
	},
	current : function() { // PAGINA ATTUALE
		$("nav li").removeClass("linkActive")
		$("nav li." + this.links[this.pos]).addClass("linkActive");
	}
}

	// ON LOAD
$(window).load(function() {
	page.update();
	
	$("#" + page.pos + " .page-wrapper").css("opacity",0);
	$("#" + page.pos + " .page-wrapper").animate({"opacity":1}, 700);
	
	page.shuffleLetters(page.pos);
	_gallerySet();
	_projectsSet();
	
	
	$("article").removeClass("hidden_item");
  	if(page.pos == "ascensorFloor32") {
  		$("#ascensorBuilding").css("overflow","hidden");
  	} else {
  		$("#ascensorBuilding").css("overflow","scroll");
  		$("article").each(function(index, elm) {
	  		if(!$(elm).hasClass($("#" + page.pos).attr("class").split(" ")[0])) {
  				$(elm).addClass("hidden_item");
  			}
  		});
  	}
});

	// ON READY
$(function() {
		// RESET
	page.update();
	page.centerText();
	page.current();
	
	$("#ascensorBuilding").width(page.width);
	$("#ascensorBuilding").height(page.height);
	$("header").css("display","none");
	
		// CLASS PER MODALITÀ MOBILE
	if($(window).width() <= 900) {
		$("body").addClass("mobile");
	}
		
		// SET LOCATION PER PRIMA PAGINA O MOSTRA HEADER
	if(page.pos == "ascensorFloor0" || page.pos == undefined || window.location.hash == "") {
		window.location.hash = "#/laboratorio";
	} else {
		$("header").slideDown();	
	}	
  	
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
    $('#ascensorBuilding').ascensor({
	 	childType			: "article",
	 	ascensorFloorName	: ["laboratorio", "webdesign", "artdirection", "events" , "webdeveloper", "works", "gallery", "akkua", "alartariosto", "alessio", "costant" , "altadesign", "killforkicks", "casadesign", "logos" , "claudia", "deponte", "ernst", "iemi" , "sunmusic", "fivefittings", "interniinpelle", "varese", "mariana", "ncba", "santopalato", "trussardi", "piazzacitta", "villador", "cattolica", "leonebifulco01", "leonebifulco02", "clients" , "contacts", "write"],
	 	ascensorMap			: [[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[13,1],[14,1],[15,1],[16,1],[17,1],[18,1],[19,1],[20,1],[21,1],[22,1],[23,1],[24,1],[25,1],[26,1],[0,2],[0,3],[1,3]],
	 	direction			: "chocolate",
	 	keyNavigation		: false,
	 	easing				: "easeInOutCubic",
	 	time				: 700,
	 	queued				: true,
	 	queuedDirection		: "y"
	 });

		// LOGO CLICK
	$("#logo").click(function() {
		$("header").slideUp();
		_pageSet("", "ascensorFloor0");
		
		if($("body").hasClass("mobile")) {
			if($("header ul").css("display") == "block") {
				$("body.mobile nav ul").toggle('slide', { direction: 'right' });
			}
		}
	});
	
		// ASSEGNA LE ANIMAZIONI AL CLICK DEI BOTTONI
	$(".btn-scroll").click(function() {
		_pageSet();
		_gallerySet();
		_projectsSet();
	});
	
	$(".btn-jump").click(function() {
		_pageSet();
	});
	
	$("nav li").click(function() {
		page.update();
		page.current();
		
		if(page.pos == "ascensorFloor0") {
			$("header").slideUp();
		} else {
			$("header").slideDown();
		}

		_pageSet();	
	});
	
	$(".proj-open").mouseenter(function() {
		$(".proj-options").slideUp();
		$(".cover").fadeOut();
		$(this).animate({"opacity":0.6});
	});

	$(".proj-open").mouseleave(function() {
		$(".proj-options").slideDown();
		$(".cover").fadeIn();
		$(this).animate({"opacity":1});
	});
	
	$("#ascensorBuilding").scroll(function() {
		scrolling = true;
    	clearTimeout($.data(this, 'scrollTimer'));
    	$.data(this, 'scrollTimer', setTimeout(function(){
      		scrolling = false;
      		$("#ascensorBuilding").trigger('_scroll');
    	},150));
	});

	$("#ascensorBuilding").bind("_scroll", function() {
		var dirCheck1 = page.top;
		page.update();
		var dirCheck2 = page.top,
			dir = (dirCheck2 > dirCheck1) ? "down" : "up",
			dif = $("#ascensorBuilding").scrollTop() % page.height;
		
		if(dir == "down" && dif > page.height * 0.1) {
			$("#ascensorBuilding").stop().animate({scrollTop:(page.top + page.height - dif)}, 300, "easeInCubic", function() {
				$("." + $("#" + page.pos).attr("class").split(" ")[0]).each(function(index, elm) {
					if($(elm).offset().top == 0) {
						page.pos = $(elm).attr("id");
					}
				});
			});
 		} else if(dir == "down" && dif < page.height * 0.1) {
 			$("#ascensorBuilding").stop().animate({scrollTop:(dirCheck2 - dif)}, 300, "easeInCubic");
 		} else if(dir == "up" && dif > page.height * 0.1) {
 			$("#ascensorBuilding").stop().animate({scrollTop:(dirCheck2 - dif)}, 300, "easeInCubic", function() {
				$("." + $("#" + page.pos).attr("class").split(" ")[0]).each(function(index, elm) {
					if($(elm).offset().top == 0) {
						page.pos = $(elm).attr("id");
					}
				});
			});
 		}
 		
 		if($("#" + page.pos).attr("class").split(" ")[0] == "laboratorio_Floor") {
 			if(Math.floor($("#ascensorBuilding").scrollTop()) >= page.height) {
 				$("header").slideDown();
 			} else {
 				$("header").slideUp();
 			}
 		}
	});
});

	// ON RESIZE
$(window).resize(function() {
	page.update();
	page.centerText();
	_gallerySet();
	_projectsSet();
	
	$("#ascensorBuilding").width(page.width);
	$("#ascensorBuilding").height(page.height);
	
	if($(window).width() <= 900) {
		if(!$("body").hasClass("mobile")) {
			$("body").addClass("mobile");
			
		}
		
		$("body.mobile nav").unbind("click");
		$("body.mobile nav ul").css("display","none");
		$("body.mobile nav").click(function() {
			$("body.mobile nav ul").toggle('slide', { direction: 'right' });
		});
	} else {
		if($("body").hasClass("mobile")) {
			$("body.mobile nav").unbind("click");
			$("body.mobile nav").removeClass("mobile");
			$("body.mobile nav ul").css("display","block");
			$("body").removeClass("mobile")
		}
	}
});


	// PAGE SET
function _pageSet(cur, target) {
	if(cur == undefined || cur == "") {
		cur = page.pos;
	}
	
	page.update();
	page.current();
	
	if(target == undefined || target == "") {
		target = page.pos;
	}

  	if(target != "ascensorFloor0") {
  		$("header").slideDown();
  	}
  	
  	page.centerText();
}

	// NASCONDE LE THUMBS CHE NON ENTRONO DENTRO LO SCHERMO
function _gallerySet() {
	page.update();
	
	var pwidth	= page.width,
		pheight	= page.height,
		iwidth	= $("#ascensorFloor6 ul li[class!='gallery-btn']").width(),
		iheight	= $("#ascensorFloor6 ul li[class!='gallery-btn']").height(),
		ilen	= $("#ascensorFloor6 ul li[class!='gallery-btn']").length,
		inum	= 0;
		
	iwidth	= Math.floor(pwidth / iwidth);
	iheight	= Math.floor(pheight / iheight);
	inum	= iwidth * iheight;
	
	if(inum % 2 == 0 || inum % 3 == 0 || inum % 5 == 0) {
		inum--;
	}
	
	if(inum >= ilen){
		inum--;
	}

	$("#ascensorFloor6 ul li").removeClass("hidden_item");

	for(var i=inum; i<ilen; i++) {
		$($("#ascensorFloor6 ul li[class!='gallery-btn']")[i]).addClass("hidden_item");
	}
		
}

	// CENTR LE IMMAGINI DEI PROGETTI
function _projectsSet() {
	$(".projects_Floor img").each(function(index, elm) {
		page.update();
		
		if($(elm).width() >= page.width) {
			$(elm).css("margin-left", "-" + Math.floor((parseInt($(elm).width()) - page.width)/2) + "px")
			$(elm).css("margin-top", "-" + Math.floor((parseInt($(elm).height()) - page.height)/2) + "px")
		} else {
			$(elm).css("margin-left", "-" + Math.floor((parseInt(page.width) - $(elm).width())/2) + "px")
			$(elm).css("margin-top", "-" + Math.floor((parseInt(page.height) - $(elm).height())/2) + "px")
		}	
	});
}