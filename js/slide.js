//넓이와 높이 구하는 메서드
/*
width => $('div').width()
width+padding => $('div').innerWidth()
width+padding+border => $('div').outerWidth()
width+padding+border+margin => $('div').outerWidth(true)
*/

$(function(){
  var flag = true;
  var imageWidth = $('.slide-contents .wrap').outerWidth();
  var imageLength = $('.slide-contents img').length;
  console.log('이미지폭: ' + imageWidth +', 이미지수:' + imageLength);

  var page = imageLength-2;
  console.log('페이지버튼 수: ' + page);

  //paging 초기화
  for(var i=0; i<page; i++){
    $('#paging').append('<li><a href="#none">'+(i+1)+'</a></li>');
    if(i==0){
      //첫번째 버튼 활성화
      $('#paging li:eq(0) a').addClass('active');
    }
  }

  //control(재생/정지)의 위치
  var pageWidth = page*$('#paging li').width()+10;
  $('#control').css('margin-left',(pageWidth/2));

  //이전/다음 버튼 초기화
  var arrow =$('.slide .next');

  //자동 재생 처리(gallery 함수 호출)
  play = setInterval(gallery, 2000);

  var i = 0;
  //이미지 슬라이드
  function gallery(){
    if(flag){
      flag=false;//비활성화
      //페이징 활성화 상태 초기화
      $('#paging a').removeClass('active');
      if(arrow.hasClass('prev')){i--;}
      else{i++;}
      //무한대로 증가, 감소 하는 것을 막아줌
      if(i<0){i=page-1;}
      if(i>=page){i=0;}
      $('.slide-contents ul').animate({
        'left':-(i*imageWidth)
      },1000, function(){flag=true;})//애니메이션 종료 후 다시 활성화 상태

      //해당 페이징 활성화
      $('#paging a').eq(i).addClass('active');
      console.log('인덱스값' + i);
    }
  }

  //갤러리 정지
  function stop(){
    $('#stop').hide();
    $('#play').show();
    clearInterval(play);//슬라이드 멈춤
  }

  //이전/다음 버튼
  $('.slide .arrow').click(function(){
    arrow=$(this); //클릭하는 버튼에 따라서 이전, 다음 버튼이 될 수 있다.
    stop();//자동으로 롤링되고 있는 이미지를 정지
    gallery();//이미지 롤링
  })

  //재생버튼
  $('#play').click(function(){
    //재생버튼을 누르면 무조건 다음 이미지로 롤링
    arrow=$('.slide .next');
    $(this).hide();
    $('#stop').show();
    //만약 자동재생되는 상태가 계속 유지되고 있을 경우
    clearInterval(play);
    play = setInterval(gallery, 2000);
  })

  //정지버튼
  $('#stop').click(function(){
    stop();
  })
})
