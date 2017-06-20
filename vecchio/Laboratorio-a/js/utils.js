$(function(){
  // variabili di stato della finestra
  var win = {
    x : parseInt($(window).width()),
    y : parseInt($(window).height()),
    t : parseInt($(document).scrollTop()),
    update : function(){                    // ad ogni resize o scroll chiamare win.update() per aggiornare le variabili di stato della finestra
      this.x = parseInt($(window).width());
      this.y = parseInt($(window).height());
      this.t = $(document).scrollTop();
    }
  }
  // variabili di stato pagina
  var pos = {
    currentSection : '#laboratorio', 
    currentPage : '#intro',
    '#laboratorio' : 0,
    '#works' : -1,
    '#clients' : -2,
    '#contacts' : -3
  }
  var scrolling = false;
  
// aggiungere navigazione hash
// aggiungere script di resize automatico (in utils-old.js c'è, potrebbe andare bene)

 
  $('article,body').height(parseInt($(window).height()));
  $('article#intro').addClass('current');
  $('article.current').next('article').addClass('next');
  pageIn($(pos.currentPage),50,250);
  
  
  
// NAVIGATION
  $('nav a').click(function(e){
    e.preventDefault();
    r = navSec($(this).attr('href'),pos,win);
    pos.currentSection = r;
    win.update();
  });
// aggiungere navigazione da link logo


// crea evento a fine scroll
  $(window).bind('scroll',function(){
    scrolling = true;
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function(){
      scrolling = false;
      $(window).trigger('scrollhappened');
    },150));
  });

// scroll magnetizzato e aggiornamento delle posizioni delle sezioni nascoste  
  $(window).bind('scrollhappened',function(){
    p = win.t;
    win.update();
    c = win.t;
    (c > p) ? d ="down" : d="up";
    f = c % win.y
    s = pos.currentSection.replace('#','');
    if(f!=0){
      if(d=='down' && f > win.y*0.07){ // distanza dal top per attivare lo scroll magnetizzato
        $('body,html').stop().animate({scrollTop:c+win.y-f},function(){
          // aggiorna la posizione delle sezioni nascoste
          win.update();
          $('section[id!=' + s + ']').css('top',win.t);
        });
      } else if(d=='down' && f < win.y*0.07){ // distanza dal top per attivare lo scroll magnetizzato
        $('body,html').stop().animate({scrollTop:c-f},function(){
          win.update();
          $('section[id!=' + s + ']').css('top',win.t);
        });
      } else if(d=='up' && f > win.y*0.07){ // distanza dal top per attivare lo scroll magnetizzato
        $('body,html').stop().animate({scrollTop:c-f},function(){
          win.update();
          $('section[id!=' + s + ']').css('top',win.t);
        });
      } else { 
        win.update();
        $('section[id!=' + s + ']').css('top',win.t);
      }    
    }
  });

// SCROLL BUTTON ROLLOVER  
  $('.btn-scroll').mouseenter(function(){
    $(this).stop().animate();
    $(this).css('background-color','transparent');
    $(this).css('border-width','2px');
    $(this).animate({'background-position':'0 -66px'},150);
    $(this).mouseleave(function(){
      $(this).stop().animate();
      $(this).removeAttr('style');
      $(this).css('background-position','2px -97px');
    });
  });
// SCROLL BUTTON CLICK
  $('.btn-scroll').click(function(){
    d = $(this).parent().parent().next().offset().top;
    s = pos.currentSection.replace('#','');
    $('body,html').animate({scrollTop:d},750,'swing');
    $('section[id!=' + s + ']').css('top',win.t);
    win.update();
  });
// JUMP BUTTON ROLLOVER
  $('.btn-jump').mouseenter(function(){
    $(this).stop().animate();
    $(this).css('background-color','transparent');
    $(this).css('border-width','2px');
    if($(this).parent().parent().parent().attr('id')=='laboratorio'){
      $(this).animate({'background-position-x':'-2px'},150);
      $(this).mouseleave(function(){
        $(this).stop().animate();
        $(this).removeAttr('style');
        $(this).css('background-position-x','-32px');
      });
    } else if($(this).parent().parent().parent().attr('id')=='clients'){
      $(this).animate({'background-position-x':'-122px'},150);
      $(this).mouseleave(function(){
        $(this).stop().animate();
        $(this).removeAttr('style');
        $(this).css('background-position-x','-152px');
      });
    }
  });
// JUMP BUTTON ROLLOVER (triggera il click sul menu)
  $('.btn-jump').click(function(){
    if($(this).parent().parent().parent().attr('id')=='laboratorio'){
      $('a[href=#works]').trigger('click');
    } else if($(this).parent().parent().parent().attr('id')=='clients'){
      $('a[href=#contacts]').trigger('click');
    }
  });
});

// ANIMAZIONE LETTERE
function pageIn(page,hS,pS){    //jquery object (pagina article), int (frames per second), int (frames per second)
  h = page.find('h2');
  p = page.find('p');
  b = page.find('div.btn-scroll');
  h.shuffleLetters({'fps':hS});
  p.shuffleLetters({'fps':pS});
  b.fadeIn(1500);
  return true
}

function navSec(l,pos,win){   // DOM object id, object, object
// da rifattorizzare: verificare l'ordine delle animazioni in stack
// verificare perché da sezioni a dx verso sx non riallinea correttamente
  c = pos.currentSection;
  if(c!=l){
    $('nav a li').removeClass('selected');
    $('a[href=' + l + '] li').addClass('selected');
    $('html').css('overflow','hidden');
    win.update();
    x = win.x*pos[l];
    $('section,article').show().width(win.x);
    $('div#wrapper').width(win.x*4);
    $('div#wrapper').stop(false,true).animate({'left':x},1500,function(){
      $('section,html').removeAttr('style');
      $('body,html').scrollTop(0);
      $('section[id!=' + l.replace('#','') + ']').hide();
    });
  }
  return l
}