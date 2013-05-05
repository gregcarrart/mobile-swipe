/* 
CLIENT ID 3d70e4d7afe944da8447281fa354ad2f
CLIENT SECRET 209d97765e7f489487214bd3cb263f2f
WEBSITE URL http://gcarrdesign.com
REDIRECT URI  http://instagram.com
*/

(function($){

  var pagUrl, top;

  var INSTA = {
    config: {
      clientId: '3d70e4d7afe944da8447281fa354ad2f',
      accessToken: '51460400.3d70e4d.613fef818cdb4426a80799eae64d6ea1',
      tag: 'design',
      isModal: true,
      isFirstLoad: true,
    },
    el: {
      $container: $('#container'),
      $more: $('#more'),
      $close: $('#close, #modalOverlay'),
      $modal: $('#modal'),
      $modalOverlay: $('#modalOverlay'),
      $items: $('.items')
    },
    init: function() {
      INSTA.getData();
      INSTA.events();
      //INSTA.url();
    },
    url: function() {
      /*var url = $.url();
      url.attr('fragment');
      console.log(url);*/
    },
    getData: function() {
      if(INSTA.config.isFirstLoad) 
      {
        pagUrl = 'https://api.instagram.com/v1/tags/' + INSTA.config.tag + '/media/recent?access_token=' + INSTA.config.accessToken;
        INSTA.config.isFirstLoad = false; 
      }
      
      $.ajax({
        type: 'GET',
        url: pagUrl,
        dataType: 'jsonp',
        success: function(data) {
            INSTA.setData(data);
        }
      });
    },
    setData: function(data) {
      var yPos, items, caption;

      pagUrl = data.pagination.next_url;
      
      $.each(data.data, function(index, val){
        var imgUrl, regularImgUrl, imgId;
        $(val.images).each(function(index, val){
          imgUrl = val.low_resolution.url;
          standardImgUrl = val.standard_resolution.url;
        });

        imgId = val.id;
        caption = val.caption.text;

        if(INSTA.config.isModal)
        {
          items = "<div class='items' data-caption-text='" + caption + "' data-img-id=" + imgId + " data-img-url=" + standardImgUrl + "><img src=" + imgUrl + ">" + "<div class='meta'>By " + val.user.username + " via <a href=" + val.link + " target='_blank'>instagram</a></div><div>";
        } 
        else
        {
          items = "<div class='items'><a href=" + val.link + " target='_blank'><img src=" + imgUrl + "></a>" + "<div class='meta'>By " + val.user.username + " via <a href=" + val.link + " target='_blank'>instagram</a></div><div>";
        }

        INSTA.el.$container.append(items);
      });
  
      INSTA.el.$more.text('more');

      if(!INSTA.config.isFirstLoad)
      {
        top  = $(window).scrollTop();
        yPos = top + 200;

        $('html, body').animate({ scrollTop: yPos }, 500);
      }

      if(pagUrl === undefined){ INSTA.el.$more.fadeOut(500); }
    },
    events: function() {
      $(window).scroll(function(){
        var $this = $(this),
            top   = $this.scrollTop();
      });

      INSTA.el.$more.on('click', function(){
        INSTA.clickEventHandler();
      });

      if(INSTA.config.isModal)
      {
        INSTA.el.$items.live('click', function(){
          var $this = $(this),
              id    = $this.attr('id'),
              imgId = $this.attr('data-img-id'),
              img   = $this.attr('data-img-url');
              caption = $this.attr('data-caption-text');

          INSTA.modalOpenHandler(img, imgId, caption);
        });

        INSTA.el.$close.on('click', function(){
          INSTA.modalCloseHandler();
        });
      }
    },
    clickEventHandler: function() {
      INSTA.el.$more.text('loading');
      INSTA.getData();
    },
    modalOpenHandler: function(img, imgId, caption) {
      var scrollTop = $(window).scrollTop();
      INSTA.el.$modal.css('top', scrollTop);

      $('#loader').show();
      INSTA.el.$modalOverlay.fadeIn(100, function(){
        INSTA.el.$modal.fadeIn(200);
      });

      //window.location = '#' + imgId;

      INSTA.el.$modal.find('#modalContent').append("<img class='insta-img' style='display:none;' src=" + img + " alt='image'/>");
      INSTA.el.$modal.find('#caption').append("<p>" + caption + "</p>");

      INSTA.el.$modal.find('.insta-img').load(function(){
        INSTA.setContent();
      });
    },
    modalCloseHandler: function() {
      INSTA.el.$modal.fadeOut(300, function(){
        INSTA.el.$modalOverlay.fadeOut(100);
        INSTA.el.$modal.find('img').remove();
        $('#caption').find('p').remove();
        $('#loader').show();
      });
    },
    setContent: function() {
      $('#loader').hide();
      $('.insta-img').show();    
    }
  }

  //--------------------------------------
  // Surprise Mutha Fucka
  //--------------------------------------

	INSTA.init();

})(jQuery);













