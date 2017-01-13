
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
            background: "url('/static/mall/home/images/fixed-nav.png') no-repeat",
            width: "720px",
            height: "143px",
            position: "fixed",
            left: "0",
            right: "0",
            bottom: "0"
        };

        let _style_footer_item_base = {
            backgroundImage: "url('/static/mall/home/images/nav.png')",
            backgroundRepeat: 'no-repeat',
            display: "block",
            position: "absolute"
        }

        let _style_footer_item_home = Object.assign({
            width: "46px",
            height: "70px",
            top: "60px",
            left: "51px",
        }, _style_footer_item_base,
            tab.home ?
                { backgroundPosition: '0 -70px' } :
                { backgroundPosition: "0px 0px" });

        let _style_footer_item_category = Object.assign({
            width: "42px",
            height: "70px",
            top: "60px",
            left: "195px",
        }, _style_footer_item_base,
            tab.category ?
                { backgroundPosition: '-145px -70px' } :
                { backgroundPosition: "-145px 0px" });

        let _style_footer_item_cart = Object.assign({
            width: "65px",
            height: "70px",
            top: "60px",
            left: "472px",
        }, _style_footer_item_base,
            tab.cart ?
                { backgroundPosition: '-422px -70px' } :
                { backgroundPosition: "-422px 0px" });

        let _style_footer_item_user = Object.assign({
            width: "87px",
            height: "70px",
            top: "60px",
            left: "610px",
        }, _style_footer_item_base,
            tab.user ?
                { backgroundPosition: '-560px -70px' } :
                { backgroundPosition: "-560px 0px" });

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
                <a style={_style_footer_item_home} href={tab.home ? null : "/"}> </a>
                <a className="_style_footer_item_category" style={_style_footer_item_category}
                    href={tab.category ? null : "/static/mall/product-category/index.html"}>
                </a>
                <a className="_back_to_index" style={_back_to_index} onClick={this.exitHandler}> </a>
                <a className="_style_footer_item_cart" style={_style_footer_item_cart}
                    href={tab.cart ? null : "/static/mall/cart/index.html"}>
                </a>
                <a className="_style_footer_item_user" style={_style_footer_item_user}
                    href={tab.user ? null : "/static/mall/user/index.html"}>
                </a>
            </div>
        )
    }
});
