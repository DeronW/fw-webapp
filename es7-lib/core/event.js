let eventMap = {}

const Event = {
    slideDownRefresh: function () {
        if (eventMap['slide_down_refresh'])
            throw ('duplicated event listener on slide down');

        var _start_y, _end_y, threshold = 200;
        var fnMove = function (event) {

            if (_start_y == null && document.body.scrollTop < 1)
                _start_y = event.targetTouches[0].clientY;

            if (_start_y) {

                var y = event.targetTouches[0].clientY,
                    delta;
                if (_end_y == null || y > _end_y) {
                    _end_y = y;
                    delta = Math.min(_end_y - _start_y, threshold);
                }

                if (delta) {
                    upper.style.height = delta / threshold * 80 + 'px';
                    upper.style.paddingTop = delta - 50 + 'px';
                    document.body.style.paddingTop = delta + 'px';
                    if (delta >= threshold) {
                        upper.innerText = '松开刷新'
                    }
                }
            }
        };
        var fnEnd = function (event) {
            if (_end_y - _start_y > threshold) {
                location.reload();
            } else {
                upper.style.height = '0px';
                upper.style.paddingTop = '0px';
                document.body.style.paddingTop = '0px';
            }
            _start_y = null, _end_y = null;
        };

        eventMap['slide_down_refresh'] = [fnMove, fnEnd];

        var upper = document.createElement('div'),
            body = document.body;
        upper.id = '_id_slide_down_refresh_div';
        upper.innerText = '下拉刷新';
        upper.setAttribute('style', 'height: 0; overflow: hidden; position: absolute; top: 0; width: 100%;line-height: 50px; text-align: center; font-size: 26px; color: #555;')
        body.insertBefore(upper, body.childNodes[0]);
        //document.body.addEventListener('touchmove', fnMove);
        //document.body.addEventListener('touchend', fnEnd);
    },

    cancelSlideDownRefresh: function () {
        document.body.removeEventListener('touchmove', eventMap['slide_down_refresh'][0]);
        document.body.removeEventListener('touchend', eventMap['slide_down_refresh'][1]);
        document.body.removeChild(document.getElementById('_id_slide_down_refresh_div'));
    },

    touchBottom: function (cb) {
        if (eventMap['touch_bottom_fn'])
            throw ('duplicated event listener on slide up');

        var fn = function () {
            //判断滚动条滚到了网页最底部
            if (window.innerHeight + document.body.scrollTop + document.documentElement.scrollTop + 50 > document.body.scrollHeight) {
                if (eventMap['touch_bottom'] == 'running') return;
                eventMap['touch_bottom'] = 'running';
                cb(function () {
                    eventMap['touch_bottom'] = 'ready';
                })
            }
        };
        eventMap['touch_bottom_fn'] = fn;
        window.addEventListener("scroll", fn, false);
    },
    cancelTouchBottom: function () {
        window.removeEventListener('scroll', eventMap['touch_bottom_fn'])
    }
}

module.exports = Event