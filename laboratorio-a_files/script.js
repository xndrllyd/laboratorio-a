var page = {
	articles : ["laboratorio","webdesign","artdirection","events","webdeveloper","works","gallery","akkua","alartariosto","alessio","costant","altadesign","killforkicks","casadesign","logos","claudia","deponte","ernst","iemi","sunmusic","fivefittings","interniinpelle","varese","mariana","ncba","santopalato","trussardi","piazzacitta","villador","cattolica","leonebifulco01","leonebifulco02","clients","contacts","write"],
	pos		: "ascensorFloor0",
	width	: parseInt($(window).width()),
	height	: parseInt($(window).height()),
	top		: $("#ascensorBuilding").scrollTop(),
	update	: function() { // AGGIORNAMENTO DATI
		var tmp;
		
		$.each(this.articles, function(key, value) {
      		if(window.location.hash.replace("#/","") == value) {
				tmp = "ascensorFloor" + key;
			}
		});
		
		this.pos	= tmp;
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
		$("nav li." + $("#" + this.pos).attr("class").split(" ")[0]).addClass("linkActive");
	}
}

	// ON LOAD
$(window).load(function() {
	page.update();
	page.current();
	
	$("#" + page.pos + " .page-wrapper").css("opacity",0);
	$("#" + page.pos + " .page-wrapper").animate({"opacity":1}, 700);
	
	page.centerText();
	page.shuffleLetters(page.pos);
	_gallerySet();
	_projectsSet();
	
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
  	
		// LIMITA LE RIGHE DI TEXTAREA
	$('form textarea').keydown(function(e) {
        var lines = $(this).val().split("\n").length;

        if(e.keyCode == 13 && lines >= $(this).attr('rows')) {
            return false;
        }
    });
    
    $("header").css("margin-left","-" + _scrollbarWidth() + "px");
    
    if(page.pos == "ascensorFloor32") {
    	$("header").addClass("noscroll");
    }
 
 		// LO SCORRIMENTO DEL SITO USANDO ASCENSOR
    $('#ascensorBuilding').ascensor({
	 	childType			: "article",
	 	ascensorFloorName	: page.articles,
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
		page.update();		
		_pageSet();
		_gallerySet();
		_projectsSet();
	});
	
	$(".btn-jump").click(function() {
		page.update();
		_pageSet();
	});
	
	$("nav li").click(function() {
		page.update();
		
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
    	clearTimeout($.data(this, 'scrollTimer'));
    	$.data(this, 'scrollTimer', setTimeout(function(){
      		$("#ascensorBuilding").trigger('_scroll');
    	},300));
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
						$.each(page.articles, function(key, value) {
      						if($(elm).attr("id") == value) {
      							window.location.hash = "#/" + key
      							page.update();
      							page.current();
 								page.centerText();
      						}
						});
					}
				});
			});
 		} else if(dir == "down" && dif < page.height * 0.1) {
 			$("#ascensorBuilding").stop().animate({scrollTop:(dirCheck2 - dif)}, 300, "easeInCubic");
 		} else if(dir == "up" && dif > page.height * 0.1) {
 			$("#ascensorBuilding").stop().animate({scrollTop:(dirCheck2 - dif)}, 300, "easeInCubic", function() {
				$("." + $("#" + page.pos).attr("class").split(" ")[0]).each(function(index, elm) {
					if($(elm).offset().top == 0) {
						$.each(page.articles, function(key, value) {
      						if($(elm).attr("id") == value) {
      							window.location.hash = "#/" + key
      							page.update();
      							page.current();
 								page.centerText();
      						}
						});
					}
				});
			});
 		} else {
 			$("." + $("#" + page.pos).attr("class").split(" ")[0]).each(function(index, elm) {
				if($(elm).offset().top == 0) {
					$.each(page.articles, function(key, value) {
      					if($(elm).attr("id") == value) {
      						window.location.hash = "#/" + key
      						page.update();
      						page.current();
 							page.centerText();
      					}
					});
				}
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
		pheight	= page.height - 47,
		iwidth	= $("#ascensorFloor6 ul li[class!='gallery-btn']").width(),
		iheight	= $("#ascensorFloor6 ul li[class!='gallery-btn']").height(),
		ilen	= $("#ascensorFloor6 ul li[class!='gallery-btn']").length,
		inum	= 0;
		
	iwidth	= Math.floor(pwidth / iwidth);
	iheight	= Math.floor(pheight / iheight);
	inum	= iwidth * iheight;
	
	if(inum > ilen){
		inum = $("#ascensorFloor6 ul li[class!='gallery-btn']").length-1;
	}

	$("#ascensorFloor6 ul li").removeClass("hidden_item");

	for(var i=inum-1; i<ilen; i++) {
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

	// LARGHEZZA DELLO SCROLLBAR
function _scrollbarWidth() {
    var $inner = $('<div style="width: 100%; height:200px;">test</div>'),
        $outer = $('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append($inner),
        inner = $inner[0],
        outer = $outer[0];
     
    $('body').append(outer);
    var width1 = inner.offsetWidth;
    $outer.css('overflow', 'scroll');
    var width2 = outer.clientWidth;
    $outer.remove();
 
    return (width1 - width2);
}