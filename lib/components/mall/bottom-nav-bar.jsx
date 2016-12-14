/*
 parameters
 <NavBar title={}  height={} background={} />
 */

function gotoHandler(link, need_login) {
    if (link.indexOf('://') < 0) {
        link = location.protocol + '//' + location.hostname + link;
    }
    if ($FW.Browser.inApp()) {
        NativeBridge.goto(link, need_login)
    } else {
        location.href = encodeURI(link);
    }
}

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
        return {
            height: height,
            lineHeight: lineHeight,
            background: this.props.background || 'white',
			index:1
        }
    },
    goClickHandler: function (arg) {
		this.setState({index: arg});
    },
    render: function () {
        let fontSize = '36px';
        let inIOS = navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
        let inApp = navigator.userAgent.indexOf('FinancialWorkshop') >= 0;
        if (this.props.title && this.props.title.length > 7) fontSize = '32px';
        let _style_footer_fixed = {
            background: "url('/static/mall/new-home/images/fixed-nav.png') no-repeat",
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
			background: "url('/static/mall/new-home/images/nav.png') no-repeat 0px 0px",
			position: "absolute"
		}

		var _style_footer_item2 = {
		    width: "42px",
			height: "70px",
			backgroundPosition: "-145px 0px",
			top: "60px",
			left: "195px",
			display: "block",
			background: "url('/static/mall/new-home/images/nav.png') no-repeat -145px 0px",
			position: "absolute"

		}

		var _style_footer_item3 = {
			width: "65px",
			height: "70px",
			backgroundPosition: "-422px 0px",
			top: "60px",
			left: "472px",
			display: "block",
			background: "url('/static/mall/new-home/images/nav.png') no-repeat -422px 0px",
			position: "absolute"
		}

		var _style_footer_item4 = {
		    width: "87px",
			height: "70px",
			backgroundPosition: "-560px 0px",
			top: "60px",
			left: "610px",
			display: "block",
			background: "url('/static/mall/new-home/images/nav.png') no-repeat -560px 0px",
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

        if (inIOS && inApp) {

        }

        let title = this.state.title;

		return (
                <div className="_style_footer_fixed" style={_style_footer_fixed}>
                    <a className={this.state.index==1 ? "_style_footer_item1 active" : "_style_footer_item1"} style={_style_footer_item1} onClick={ () => gotoHandler("/static/mall/new-home/index.html") }></a>
                    <a className={this.state.index==2 ? "_style_footer_item2 active" : "_style_footer_item2"}  style={_style_footer_item2} onClick={ () => gotoHandler("/static/mall/product-category/index.html") }></a>
					<a className="_back_to_index"      style={_back_to_index}      onClick={ () => $FW.Browser.inApp() ? NativeBridge.close() : location.href = 'http://m.9888.cn'}></a>
					<a className={this.state.index==3 ? "_style_footer_item3 active" : "_style_footer_item3"}  style={_style_footer_item3} onClick={ () => gotoHandler("/static/mall/shopping-cart/index.html", true) }></a>
					<a className={this.state.index==4 ? "_style_footer_item4 active" : "_style_footer_item4"}  style={_style_footer_item4} onClick={ () => gotoHandler("/static/mall/new-user/index.html", true) }></a>
                </div>
        )
    }
});
