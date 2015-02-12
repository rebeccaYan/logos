(function () {
    var _cfg = {
        height: 0,
        sectionOffsets: [],
        moduleOffsets: [],
        num: 2
    };
    
    /*初始化*/
    init();
    listen();   
    
    /*监听*/
    function listen() {
        listenBodyScroll();
        listenMenuClick();
        listenSectionClick();
        listenProductHover();
        listenWindowResize();
    }
    
    /*监听scroll*/
    function listenBodyScroll() {
        $(window).scroll(function () {
            var top = $(this).scrollTop();
            if (top >= _cfg.height * _cfg.num) {
                $('.sidebar, .mobile-nav-wrap').css({position: 'fixed'});
            } else {
                $('.sidebar, .mobile-nav-wrap').css({position: 'absolute'});
            }
            
            
            //处理menu的被选情况
            var baseHeight = top + _cfg.height * 0.49;
            var modOffsets = _cfg.moduleOffsets;
            for(var i in modOffsets) {
                if (modOffsets[i].top <= baseHeight && baseHeight < (modOffsets[i].top + modOffsets[i].height)) {
                    $('#menu li>a').removeClass('active');
                    $('#menu li>a[data-module=' + i + ']').addClass('active');
                }
            }
            
            //处理section2中cell的效果
            if ( top >= _cfg.height * 0.2) {
                showCell();
            }
            
        });
        
    }

    /*监听menu的点击*/
    function listenMenuClick() {
        $('#menu').on('click', 'li>a', function () {
            var $self = $(this),
                module = $self.data('module');

            //切换侧边栏样式
            $self.addClass('active');
            $self.parent().siblings().children().removeClass('active');

            //侧边栏点击锚点平滑滚动 
            $("body").animate({
                scrollTop: _cfg['moduleOffsets'][module]['top'] + 'px'
            }, {
                duration: 500,
                easing: "swing"
            });
        });
    }
    
    /*监听翻页*/
    function listenSectionClick() {
        $('.arrow-down').on('click', function () {
            var section = $(this).closest('.section').next().attr('id');

            //侧边栏点击锚点平滑滚动 
            $("body").animate({
                scrollTop: _cfg['sectionOffsets'][section].top + 'px'
            }, {
                duration: 500,
                easing: "swing",
                start: showCell
            });
        });
        $('.arrow-up').on('click', function () {
            var section = $(this).closest('.section').prev().attr('id');

            //侧边栏点击锚点平滑滚动 
            $("body").animate({
                scrollTop: _cfg['sectionOffsets'][section].top + 'px'
            }, {
                duration: 500,
                easing: "swing",
                start: showCell
            });
        });
    }
    
    function showCell() {
        var timeSet = [1.2, 0.1, 0.8, 0.5, 0.2, 0.3];
        $('.section2 .cell').each(function (index) {
           $(this).css({
               'opacity': 1,
               'transition-delay': timeSet[index] + 's'
           }); 
        });
    }
    
    /*监听产品悬浮*/
    function listenProductHover() {
        $('#main').find('.pro-right').hover(function () {
            $(this).addClass('pro-active');
            $(this).siblings().removeClass('pro-active');
        }, function () {
            $(this).removeClass('pro-active');
            $(this).siblings().addClass('pro-active');
        });
    }
    
    //监听window大小
    function listenWindowResize() {
        window.onresize = window.reload = function () {
            init();
        };
    }
    
    
    /*初始化页面*/
    function init() {
        initHeight();
        initOffsetInfo();
        initMenuPosition();
        initSection2();
    }

    /*初始化元素高度*/
    function initHeight() {
        _cfg.height = window.innerHeight || document.body.availHeight;
        $('.section:lt(2)').css({
            'min-height': _cfg.height
        });
        $('.module').css({
            'min-height': _cfg.height
        });
    }

    /*初始化偏移量*/
    function initOffsetInfo() {
        $('#main').children().each(function () {
            _cfg['moduleOffsets'][$(this).attr('id')] = {
                top: $(this).offset().top,
                height: $(this).outerHeight()
            };
        });
        
        $('body').children().each(function () {
            _cfg['sectionOffsets'][$(this).attr('id')] = {
                top: $(this).offset().top,
                height: $(this).outerHeight()
            };
        });
    }
    
    /*初始化menu位置*/
    function initMenuPosition() {
        if (_cfg.height * _cfg.num < window.scrollY) {
            $('.sidebar').css({position: 'fixed'});
        }
    }
    
    function initSection2() {
        $('.section2 .arrow-down').css({
           bottom: (_cfg.sectionOffsets.section2.height - _cfg.height + 5) + 'px' 
        });
    }
})();