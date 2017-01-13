
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
            home: location.pathname === '/',
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

    gotoHandler: function (link, need_login) {
        if (link.indexOf('://') < 0) {
            link = location.protocol + '//' + location.hostname + link;
        }
        if ($FW.Browser.inApp()) {
            NativeBridge.goto(link, need_login)
        } else {
            location.href = encodeURI(link);
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
            background: "url('/static/mall/home/images/fixed-nav.png') no-repeat",
            width: "720px",
            height: "143px",
            position: "fixed",
            left: "0",
            right: "0",
            bottom: "0"
        };

        var _style_footer_item1 = {
            width: "46px",
            height: "70px",
            backgroundPosition: "0px 0px",
            top: "60px",
            left: "51px",
            display: "block",
            background: "url('/static/mall/home/images/nav.png') no-repeat 0px 0px",
            position: "absolute"
        }

        var _style_footer_item2 = {
            width: "42px",
            height: "70px",
            backgroundPosition: "-145px 0px",
            top: "60px",
            left: "195px",
            display: "block",
            background: "url('/static/mall/home/images/nav.png') no-repeat -145px 0px",
            position: "absolute"
        }

        var _style_footer_item3 = {
            width: "65px",
            height: "70px",
            backgroundPosition: "-422px 0px",
            top: "60px",
            left: "472px",
            display: "block",
            background: "url('/static/mall/home/images/nav.png') no-repeat -422px 0px",
            position: "absolute"
        }

        var _style_footer_item4 = {
            width: "87px",
            height: "70px",
            backgroundPosition: "-560px 0px",
            top: "60px",
            left: "610px",
            display: "block",
            background: "url('/static/mall/home/images/nav.png') no-repeat -560px 0px",
            position: "absolute"
        }

        var _back_to_index = {
            display: "block",
            width: "96px",
            height: "96px",
            position: "absolute",
            top: "31px",
            left: "312px"
        }

        return (
            <div className="_style_footer_fixed" style={_style_footer_fixed}>
                <a className={`_style_footer_item1 ${tab.home ? 'active' : null}`}
                    style={_style_footer_item1} href={tab.home ? null : "/"}> </a>
                <a className={`_style_footer_item2 ${tab.category ? 'active' : null}`}
                    style={_style_footer_item2}
                    href={tab.category ? null : "/static/mall/product-category/index.html"}>
                </a>
                <a className="_back_to_index" style={_back_to_index} onClick={this.exitHandler}> </a>
                <a className={`_style_footer_item3 ${tab.cart ? 'active' : null}`}
                    style={_style_footer_item3}
                    href={tab.cart ? null : "/static/mall/cart-shopping/index.html"}>
                </a>
                <a className={`_style_footer_item4 ${tab.user ? 'active' : null}`}
                    style={_style_footer_item4}
                    href={tab.user ? null : "/static/mall/user/index.html"}>
                </a>
            </div>
        )
    }
});
