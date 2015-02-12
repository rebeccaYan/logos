$(function () {   
    var _cfg = {
        height:window.innerHeight,
        offsets: {},
        num: 2
    };
    //设置section高度
    $('.section:lt(2)').css({
        'height': _cfg.height
    });
    $('.module').css({
        'min-height': _cfg.height
    });
    
    //获取偏移量
    $('#main').children().each(function () {
        _cfg['offsets'][$(this).attr('id')] = $(this).offset().top;
    });
    
    //初始判断
    if (_cfg.height * _cfg.num < window.scrollY) {
        $('.sidebar').css({position: 'fixed'});
    }
    
    /*
     * 监听
     */
    /*监听侧边栏*/
    $('#menu').on('click', 'li>a', function () {
        var $self = $(this),
            module = $self.data('module');

        //切换侧边栏样式
        $self.addClass('active');
        $self.parent().siblings().children().removeClass('active');

        //侧边栏点击锚点平滑滚动 
        $("body").animate({
            scrollTop: (_cfg['offsets'][module] + _cfg.height * _cfg.num) + 'px'
        }, {
            duration: 500,
            easing: "swing"
        });
    });
    
    $('.arrow-down').on('click', function () {
        var len = $(this).closest('.section').prevAll().length + 1;
        
        //侧边栏点击锚点平滑滚动 
        $("body").animate({
            scrollTop: (_cfg.height * len) + 'px'
        }, {
            duration: 500,
            easing: "swing"
        });
    });
    

    //监听合作流程中的点击
    $('#main').find('.pro-right').hover(function () {
        $(this).addClass('pro-active');
        $(this).siblings().removeClass('pro-active');
    }, function () {
        $(this).removeClass('pro-active');
        $(this).siblings().addClass('pro-active');
    });

    //监听列表图标
    $('.show-mobile-nav').click(function () {
        $('.sidebar').toggleClass('mobile-nav-active'); 
    });  

    //侧边栏
    $('.sidebar').waypoint(function (direction) {
       if (direction === 'down') {
           if (_cfg.height * _cfg.num < window.scrollY) {
               $(this).css({position: 'fixed'});
           } else {
               $(this).css({position: 'absolute'});
           } 
       } else if (direction === 'up') {
           if (_cfg.height * _cfg.num < window.scrollY) {
               $(this).css({position: 'fixed'});
           } else {
               $(this).css({position: 'absolute'});
           } 
       }
    }, {
        offset: '-5px'
    });
    
    
    
    //滚动效果
    var $menu = $('#menu');
    $('#main').children(':not(:first-child)').each( function(i) {
        var $el = $( this ),
            current = $el.attr('id'),
            next = $el.next().attr('id'),
            prev = $el.prev().attr('id');

        $el.waypoint( function( direction ) {
            if( direction === 'down' && current ) {
                $menu.find('li>a').removeClass('active');
                $menu.find('li>a[data-module=' + current + ']').addClass('active');
            }
            else if( direction === 'up' && prev ){
                $menu.find('li>a').removeClass('active');
                $menu.find('li>a[data-module=' + prev + ']').addClass('active');
            }
        }, { offset: 0} );
    } );    
 });


