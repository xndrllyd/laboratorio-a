$(function(){
  var s = skrollr.init();
  var sp = {
        inTop:'data-center-center',
        outTop:'data-top-center',
        outBottom:'data-bottom-center',
      }
  var idRef = {
        firstPage : 'page-laboratorio',
        secondPage : 'page-webdesign'
      }
  var win = {
    w : parseInt($(window).width()),
    h : parseInt($(window).height()),
    c : Math.floor(parseInt($(window).width())/2),
    m : Math.floor(parseInt($(window).height())/2),
    t : 0,
    n : parseInt($(window).height()),
    p : 0,
    d : 'down',
    doc : parseInt($(document).height()),
    update : function(){
      this.w = parseInt($(window).width());
      this.h = parseInt($(window).height());
      this.c = Math.floor(this.w/2);
      this.m = Math.floor(this.h/2);
      this.t = s.getScrollTop();
      this.n = this.t + this.h;
      this.p = this.t - this.h;
      this.d = this.d;
      this.doc = parseInt($(document).height());
    }
  }  
//  var v = 'data-' + (win.h-47);
  var shufh = {'fps':50};
  var shufp = {'fps':250};

// INIT
  win.update();
  $('article').height(win.h);
  $('header,article h2,article p,article div.btn-scroll').hide();
  $('h2,p', '#' + idRef.firstPage).show();
  $('h2', '#' + idRef.firstPage).shuffleLetters(shufh);
  $('p', '#' + idRef.firstPage).shuffleLetters(shufp);
  $('div.btn-scroll', '#' + idRef.firstPage).fadeIn(1500);
  s.refresh();
  
// SCROLL EVENTS
  $('article').waypoint(function(direction){
    if(direction=='down'){
      if($(this).attr('id')!=idRef.firstPage&&$(this).attr('id')!=idRef.secondPage){
        // reset skrollr params
        $('div.page-wrapper').removeAttr(sp.inTop);
        $('div.page-wrapper').removeAttr(sp.outTop);
        $('div.page-wrapper').removeAttr(sp.outBottom);
        $('div.page-wrapper').removeAttr('style');
        // effects in
        $('h2,p,div.btn-scroll').hide();
        pageIn(this,shufh,shufp);
        if($('header').css('display')!='block'){
          $('header').css('display','block')
        };
        // set fade in and out
        $('div.page-wrapper', this).attr(sp.inTop,'opacity:1.0');
        $('div.page-wrapper', this).attr(sp.outTop,'opacity:0.0');
        $('div.page-wrapper', this).attr(sp.outBottom,'opacity:0.0');
        s.refresh('div.page-wrapper');
      } else if($(this).attr('id')!=idRef.firstPage){
        pageIn(this,shufh,shufp);
        $('header').slideDown(750);
      } else{
        pageIn(this,shufh,shufp);
      }
    } else if(direction=='up'){
      if($('h2',this).css('display')!='block'){
        $('h2', this).show().shuffleLetters(shufh);
        $('p', this).show().shuffleLetters(shufp);
        $('.btn-scroll', this).fadeIn(1500);
      } else {
      }
    }
  });
  
  


// BEGIN EVENT HANDLERS  
  $(window).bind('resize',function(){
    win.update();
    $('header').removeAttr(v);
    v = 'data-' + (win.h-47);
    $('header').attr(v,'display:block;position:fixed');
    s.refresh();
    $('article').height(win.h);
  });
  
  $(window).bind('scroll',function(){
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() {
      win.update();
// scroll magnetizzato
      var m = win.t%win.h;
      var fdown = 7;  // punto di mangetizzazione in basso
      var fup = 0.4; // punto di magnetizzazione in alto
      var dur = m*0.3;
      if(win.d=='down'){
        if(m>win.h/fdown){
          s.animateTo(win.h*Math.ceil(win.t/win.h),{duration:dur*2,done:shuf()});
        }else{
          s.animateTo(win.h*Math.floor(win.t/win.h),{duration:dur*2,done:shuf()});
        }
      } else {
        if(m>win.h/fup){
          s.animateTo(win.h*Math.ceil(win.t/win.h),{duration:dur,done:shuf()});
        }else{
          s.animateTo(win.h*Math.floor(win.t/win.h),{duration:dur,done:shuf()});
        }
      }
    }, 150));
  });
  


  $('li.menu-item').click(function(){
    $('li.menu-item').removeClass('selected');
    $(this).addClass('selected');
  });

// scroll button fx
  $('.btn-scroll').mouseenter(function(){
    $(this).css('background-color','transparent');
    $(this).css('border','2px solid rgba(39,44,39,0.8)');
    $(this).animate({'background-position-y':'-66px'},150);
    $(this).mouseleave(function(){
      $(this).stop().animate();
      $(this).removeAttr('style');
      $(this).css('background-color','rgba(39,44,39,0.8)');
      $(this).css('background-position-y','-97px');
    });
  });
    
  $('.btn-scroll').click(function(){
    if((win.n)<=$('body').height()){
      s.animateTo(win.n,{duration:1000,easing:'swing',done:function(){
          win.update();
        }
      });
    }
  });
  s.on('render',function(obj){
    if(obj.direction!=win.d){
      win.d = obj.direction;
    }
  });
});

function pageIn(id,h,p){
  $('h2', id).show().shuffleLetters(h);
  $('p', id).show().shuffleLetters(p);
  $('div.btn-scroll', id).fadeIn(1500);
}