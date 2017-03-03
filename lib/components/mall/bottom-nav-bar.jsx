
const BottomNavBar = React.createClass({
    getInitialState: function () {
        let height = parseInt(this.props.height) || 100;
        let lineHeight = parseInt(this.props.height) || 100;

        let inIOS = navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
        let inApp = navigator.userAgent.indexOf('FinancialWorkshop') >= 0;

        if (inIOS && inApp) {
            height += 22;
            lineHeight = 152;
        }

        let match_url = w => location.pathname.indexOf(`/static/mall/${w}`) >= 0;

        let tab = {
            home: location.pathname === '/' || match_url('home'),
            category: match_url('product'),
            cart: match_url('cart'),
            user: match_url('user')
        }

        return {
            height: height,
            lineHeight: lineHeight,
            tab: tab,
            background: this.props.background || 'white'
        }
    },

    exitHandler: function () {
        $FW.Browser.inApp() ?
            NativeBridge.toNative('app_back_native') :
            location.href = 'https://m.9888.cn';
    },

    render: function () {
        let {tab} = this.state;

        let _style_footer_fixed = {
            // background: "url(images/global-bottom-nav-bg.png) no-repeat",
            background: 'white',
            width: "720px",
            height: "100px",
            fontSize: '22px',
            position: "fixed",
            left: "0",
            right: "0",
            bottom: "0"
        };

        let _style_footer_item_base = {
            backgroundRepeat: 'no-repeat',
            display: "block",
            width: "100px",
            color: '#ef3837',
            textAlign: 'center',
            top: "15px",
            position: "absolute"
        }

        let gray_filter = {
            filter: 'grayscale(100%)',
            WebkitFilter: 'grayscale(100%)'
        }
        let _style_footer_item_home = Object.assign({
            height: "80px",
            left: "28px",
        }, _style_footer_item_base, tab.home ? {} : gray_filter);

        let _style_footer_item_category = Object.assign({
            width: "42px",
            height: "70px",
            left: "160px",
        }, _style_footer_item_base, tab.category ? {} : gray_filter);

        let _style_footer_item_cart = Object.assign({
            width: "65px",
            height: "70px",
            right: "160px",
        }, _style_footer_item_base, tab.cart ? {} : gray_filter);

        let _style_footer_item_user = Object.assign({
            width: "87px",
            height: "70px",
            right: "28px",
        }, _style_footer_item_base, tab.user ? {} : gray_filter);

        let _back_to_index = {
            display: "block",
            width: "96px",
            height: "96px",
            padding: '10px',
            position: "absolute",
            top: "31px",
            left: "50%",
            transform: "translateX(-50%)",
            WebkitTransform: "translateX(-50%)",
            background: 'white',
            position: 'relative',
            top: '-22px',
            borderRadius: '50%'
        }

        let _back_to_index_icon = {
            width: '96px',
            height: '96px',
            borderRadius: '50%',
            background: '#ef3837 url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAA5CAMAAABeWLbbAAAAq1BMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Nr6iZAAAAOHRSTlMA9+7y+rfHOD+jdkQt0+TDM+ocXPy7Bd/Xqo5VIhDNlBWmC2u/soZQOycDcgeuxoB7aGFKKgG8mjV7IaIAAANeSURBVEjH7ZbbmppADIADigJSFUG0rCCyHnbVdY9t8/5P1iSzI0fb1a+X/S9gIsMPCWQEbiQ6uK5XhP0h1ul+h0/usYqpTqGRBZpJF4mRo/lucvwEikenyjPsXNdd0oy5694fgUnVCQWJKPs6fEvnBSuADqJh0ISQrmTuaYItd51DiSUSM30TfNgUQsSOGPqSBY/GNEOK8Axl9h0kAhBeabgEwWoa+jyB8KHKW1EzuP+LQV1ul3RLDAFmSGzrhmmbIUbiG0Qby7KkgLRfcvKEcdQGVGpsM/CvZgZCh6eWX4OVVNIqs20YgiB430PTANnAtj0gxnaFj7pBUxjq6CQYTq1uGBoFyJTinjbMims0DZteQciGUrw8G2LrjkpjvbDhpixmFob5AjFuN2wdZ9AwvDpOUDJMEF8cxEgZir5QhhPtX2uGFY0OJUOGmA7RSMRQ6k33EH12llEYzs20LxnmKKzFUKwPyWLBBjCki7RB30JaroNM8gFqBkpjw9FI5muDHhy+YKDQ0i9wGBUGOYzJFYYIiUPJsJF+/6phSIRcS9kT55iwWg0WHfFlivS9+SdGQMxM8wkgNc0plcw0U95ofGsP//mXRN6gwUN2xfnbDrYxfYSv8WODFzA/9ByXFqx1BJDYVR6AucOLTLXhG0cTAAdrTFQnXyRMaoZdT6MS7xx1b/vfFZvQGH0OUyQ+qoaCXyrNDLRhBUK0fjo/gQckvHbDfq0FdYObRtAwTBzHUR81TgxCPheBn0Bh6N0J84CfjS3jrTbs8EwXmImvBWdDwZjiuAjFkB9cV87Zum8LwjZUCh4HSd3g6ZyZZh022ODndQbPrSD/w9cZiHFMADzT1jZuMcjIhwHHg5sMmfru63Ep4SbDL36mUR7SLr7N0JHyx9wz+U2GnfrRpO0J2gyz/C8Gbrch2Bw9VA2nAWMnFB47gQQvLYaEdy6c5HlUDSs4c59e7s2l1PHIddxeMkQH37tokPwt2HIdjyUD97o5Vax9nH8OvzVWmOydt4/AbbYGbbhmlZM6ztTNjbXB/PNKawGxOPV63EMjeY/eYC2ed1orkYh5RXm6JPAXUKwwveiZtwBk646pqIKjqvfit6awWajDAbHLAPIg6FM8CO5ygCwg3o/nlfNx3MBL4Gv8BiXsRv1VM+PXAAAAAElFTkSuQmCC") no-repeat center center'
        }

        let _image_icon_style = {
            width: '44px',
            height: '44px',
            display: 'block',
            margin: '0 auto 6px'
        }

        let _image_icon_back = {
            background: 'red'
        }

        return (
            <div className="_style_footer_fixed" style={_style_footer_fixed}>
                <a style={_style_footer_item_home} href={tab.home ? '' : "/"}>
                    <img style={_image_icon_style} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUI0QzFGMjVGMjhDMTFFNkIzM0VCQjBDMUE4ODkyNEQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUI0QzFGMjZGMjhDMTFFNkIzM0VCQjBDMUE4ODkyNEQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5QjRDMUYyM0YyOEMxMUU2QjMzRUJCMEMxQTg4OTI0RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5QjRDMUYyNEYyOEMxMUU2QjMzRUJCMEMxQTg4OTI0RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtOho88AAANoSURBVHja7Jl9aE1xGMfP2bXrZa5JEiNthpKbvEctb8N0mSImUtSyltC81MxS6yp5zSKW8lJEWYjUZggxtkj+YFqoUVoWeV3Nnbi+T75nHadzjl06557Vfeqz596d3+7ve5/7O8/LnRqNRpWuZElKF7MuJ7ib/Pg0dYrdmmFgGwiBQQ5o+A6eg5PgEGi3Wti3rv63YBsLgruy1sGgJYPRYB+YB+bbibY7En5wimKvgJFAdQA/hTaD2WDzv55h+XjGgZcgD7xwKMJyJGrAaiApaweYFqvgVaAAtFHsNxfup+tgF/CBcyCts4LHgiN8vA48djEJbAc3wECKTv6b4FRwHvQCx8AJl7PWD7ACvAFZYI+dYLkBToNM8Aisj1OqfQeWMlMU8bGp4BKQCz6AJS6dWyurB5v4+DgYZRQ8GITBT7ASvPJAUTsMzoAAKDcKzubdWQWqPVSJ1zLtzWRQOwRPpL/vsdbhC7jEbLFVL3gh/VUP9jt76XP1gofQP7P5Qzkyk8CATmwyQveadiaVdAHoYbPmCX2aXnAz/XCbBuU2eMAbcobNBuXsvl6zWlpZPtOn9Cm3tM7RxDLp3+oFazdamPnYaCVM5FKqe4KjoI/JujlgA1OivPZ+RttoQ9mdyV4fgfS3W0zWqdTUoVETLDW8FSwGF8AERjUDHABlbEzy+BFJ53YPzAXdQX8KvcxNpH8+C3qDWrCcbzCFe2gtazX7FrGdrGzp3Fs0XOT6VmpUVJnp2MBLdCotel8pmRvZwckLXrOInMJyXsDyLnf4LJviEGKEixhxn0WmkEDVSAOfZOiWxoCDoIn5r4VvYjLFKjzD40Epox0Bn9m0LOLZlDf4lZ/AGnAHvOeResiyP51itXOfxb1auHcTtQTZfirGCOstqjtD8TDT/SXCqn7M1wn3jGARmRjzE4ITgs1NqlcFS3KEvoK/95zgHPAUFFKgn76Qv8/xkuAMTrgBJv4gy3WQzwO8nu4VwcW6aXsZaOAA2cDnlbxe7BXBIfoyi+thw7q4C9a+oWm0uN6oG3Q9Idin6+isvhxRLDqxRB5OCHZKcBt9ahw0pdC3xyJYa0JliOznolgZz3YbNPxhVqO1fE97k+NOfoxN9/+u0aJbGkuEZSLOpo+4GGHZq44Dca3ZAjXxn1CH7ZcAAwC4hMgDcaPlXgAAAABJRU5ErkJggg==" />
                    首页</a>
                <a className="_style_footer_item_category" style={_style_footer_item_category}
                    href={tab.category ? '' : "/static/mall/product-category/index.html"}>
                    <img style={_image_icon_style} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUI0QzFGMjFGMjhDMTFFNkIzM0VCQjBDMUE4ODkyNEQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUI0QzFGMjJGMjhDMTFFNkIzM0VCQjBDMUE4ODkyNEQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5QjRDMUYxRkYyOEMxMUU2QjMzRUJCMEMxQTg4OTI0RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5QjRDMUYyMEYyOEMxMUU2QjMzRUJCMEMxQTg4OTI0RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhnlT34AAAHsSURBVHja7JjNSwJBGMZdszqEEdjXJYrtGnRQoiCpQwcJOnXIvqCb+A/UtUuHOnS2c2AKnQwCzwZGFBHdgig69EVBJkUEtT0LjyCy6m647ggz8ONl33lmfXYc351R0TTN1UhNkYalYWnYYcNvY6MZhHFB/B11ZI+DxQm36BNamvAYiIIiP4Hb1WBNGpaGpWFpWAzD+ufMgxR4Bhpjinm3SIZVcALiYAZ0Md/F6zj7VREM6yaywA/uQBT0g1bGKPN+6lQnDev3ToJukAZDIEaD34wx5tPUJat5stNwGATADZgD+TK6PPtvqQ9bNZzhj8IKGYP7LDNuglyVh8tRVzzO1hlWDHIBxkOT9yjohiuJ7NxedjI+mdQ/MvqcWsMvjD0m9b2Mr04ZPmWcNqkv6C6cMrzLuAraqmjbwVrJuLobTnCW9ZfBPvCW0XlZfweoTzhl+Jc1Vd8zhMAliIA+0MIYYT5EXZjjLB3za218kDPor6A54+S9cy1/FjpwzK/75ucajIAFcADu+Wp+4PUi+5vBBNixWoftWh57pFyb5a5tCZyDbdE38Ff8Fn7AFphqhBOH/npeB02sFmojHJE2WAZ9RiXOI6BhvWytsOx92bW9rMV2tLh9AL2+ToqyJJR/D5T/wEvD0rA0XLH9CTAAmRipa3KpD60AAAAASUVORK5CYII=" />
                    品类
                </a>
                <a className="_back_to_index" style={_back_to_index} onClick={this.exitHandler}>
                    <div className="_back_to_index_icon" style={_back_to_index_icon}></div>
                </a>
                <a className="_style_footer_item_cart" style={_style_footer_item_cart}
                    href={tab.cart ? '' : "/static/mall/cart/index.html"}>
                    <img style={_image_icon_style} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUZCRUExNTJGMjhBMTFFNkIzM0VCQjBDMUE4ODkyNEQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUI0QzFGMUVGMjhDMTFFNkIzM0VCQjBDMUE4ODkyNEQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxRkJFQTE1MEYyOEExMUU2QjMzRUJCMEMxQTg4OTI0RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxRkJFQTE1MUYyOEExMUU2QjMzRUJCMEMxQTg4OTI0RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpLgeW0AAALdSURBVHja7JlNSFVBFMfvLSvCKBGpyKVZaWG1U6hFVJpCq5AybVEtciFFuAlqU2FfiwSrnQtB0T6oXVhg0Rdk0EItsoyiXRAIipbEo17/Q/8Lw+Dr3rlPZ96FBn6cO+/yzvtzOHPmzDw/nU57SRoLvISNvOBhoqryGcx25d0MuAmOgZT+xYKXg84jvFh7txQcBidyNSUqga/QwM+rk5LDr2nLkyL4M5gCxaAo5xbdLOM3eAuqQAV4rL7EIrUuVhZ6WFkbon0E0g4YB1K9jkaJsIxhxxlQyFIrrAQXwyI8okTat8xCsAo0U0NzlJ3uDXO5DCyyHF353W+gX4l2qOBpVoslYIOjtNhJ+yJqLxEsvC2OBNfS9kcVHORxhQOxkse7+fwgquCgUmx2IFj2gALwCYwlIcK1anSjCv4CJlliVlsWvEfNX5MGfshBWkhwtoKfalsQVbCLtKjhBvKUhwkjwcMOSludng5xImwrJaSc7dIXnIlgaTN/gfXc9WyUs0Lusu/jCJ5hHZTubqMFwcGx7GE2x3ybC28v7f1sBNvqKWr4GxPgSS5HeAVoArc4vwK+m5zpglEKLilNyA4eX+Zz3KFgz1SwVIVBNiA2GvZXoBN0cW4s+ALFSi08Ar66Pub7mW4veYyXpmc5WJMLYuWYn+clYKgXj2FVYoC200FraXxVJeM062EdU8L2RcpzU8Gyj0sy3/P+3rNZX2NxNo4PYB8XX3DJcRCMsvSMch7nsqRB83NIe78tzsahj0bQo8zlkqWXP9Br4Kce9Gl+uvncY1zWMpQ5Ge/o/BS4Bo7LnRcjVK6v6n/4klulTeAMaAct4DLTsCyTnzh/ypTS3gA/wHXOSwz9rKW9Sj8dnK/LpkrMNj7SSmSX0aqfm/ppBfngJOdjcy34PG0bK0cb5+cM/ZxV/E2zDVD9z5ngPq5uybUUc/cAuG3o5y7Yz+NXiv4awxau//+f0HkefwQYAO6f2ih8185sAAAAAElFTkSuQmCC" />
                    购物车
                </a>
                <a className="_style_footer_item_user" style={_style_footer_item_user}
                    href={tab.user ? '' : "/static/mall/user/index.html"}>
                    <img style={_image_icon_style} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUZCRUExNEVGMjhBMTFFNkIzM0VCQjBDMUE4ODkyNEQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUZCRUExNEZGMjhBMTFFNkIzM0VCQjBDMUE4ODkyNEQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxRkJFQTE0Q0YyOEExMUU2QjMzRUJCMEMxQTg4OTI0RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxRkJFQTE0REYyOEExMUU2QjMzRUJCMEMxQTg4OTI0RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsU9wKUAAAJHSURBVHja7JhNKDVRGMfnujfehCx97XhLFmKFHYlcC8pC3qWXUJJYUZKPYktZet93aY1SrmKjrh1ZSend+Nr5uEmSxv/kPzrGDDP3uucO5qlfZ+7c88z5nzPPOc85E9B1XftMFvAF+4LfEHxZUy3/VwdmQQXIUKTnDuyBUbAlbuRGd15USLNxbAAboEqhWI1tVbHtBqsKdoKnQBAsgCzxJhQh2ppn21NuQkK8mnSQA2KKwzQbXFPDD6chkc4yloJ5FZPCw3FIeNa+heAwOCVh1f52k864GbDwEQ3l8/oMFLhs04n/c/tOJ53jDqv2j0dwtzQCA3H4D0uj2KVC8BrY5/X/OPwNn30+S8kqsS3tN9xarekZSgSvsuxiGnVqQYaU/AwlgiN8paVgxIWfqFtC34hKwWLCDIEHMAkGHfgMsu4DfXWVgoVtgl5ez4Eo+AWKQIgU8V6UdYT10TcuCyW4jv4Bx+AfqCZ2JpJEJ1hPpMFEBWsUUMyRbAWVII//nYNdsAyWwG2yjkj6B2UyLYE5kpTU7G8vfcG+4K8u+HlZM3318cyyZtwwljerEW7y0IC2vBcSokczHhI8bdZoFtzO1CryflYKhWaCE1AOOuwEh9gjo2c3KRR8K2mZlPc8suDf4Cc4AoseCIe/1FJCba8E97OcAPceEHxPLcJ6rASXSqdir5hxjCqzEnzAcgwUpjo/UMM4fx9aJY5mFCsuT8EqTJwB25A4VswjLEKhXnv6XH/lAaEXDIlGDuTrE8en2kv4gpNkjwIMAJL6nASKPFTbAAAAAElFTkSuQmCC" />
                    我的商城
                </a>
            </div>
        )
    }
});
