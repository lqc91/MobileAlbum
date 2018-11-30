// 移动端适配，REM布局
(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;  
      if (!clientWidth) return;
      if (clientWidth >= 1500) {
        docEl.style.fontSize = '100px';
      } else {
        docEl.style.fontSize = 100 * (clientWidth / 1500) + 'px';
      }
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
  recalc();
})(document, window);

$(document).ready(function(){
  var album = $('.album'),
    albumItem = $('.album__item'),
    mask = $('.mask'),
    maskItem = $('.mask__item'),
    imgObj = new Image();
  // 遍历img标签，并添加src属性，插入图片
  albumItem.each(function(index, item){
    $(item).attr('src', function(){
      index += 1;
      return './image/' + index + '.jpg';
    });
  });
  // 小图状态下，单击图片，显示对应大图
  album.on('tap', '.album__item', function(e){
    var imgSrc = $(this).attr('src');
    imgObj.src = imgSrc;
    imgObj.onload = function (){
      // 判断图片宽高比，确定为竖图模式或横图模式
      if(this.height / this.width > 1.2){
        maskItem.height('100%');
      }else{
        maskItem.width('100%');
      }
      mask.css('display', 'flex');
      maskItem.attr('src', imgSrc);
    }
  });
  // 大图状态下，单击图片，移除图片宽高属性并返回相册
  maskItem.on('tap', function(e){
    $(this).css({
      'width': '',
      'height': ''
    });
    mask.css('display', 'none');
  });
});