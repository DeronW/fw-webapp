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
        return {
            height: height,
            lineHeight: lineHeight,
            background: this.props.background || 'white',
        }
    },

    render: function () {
        let jiemo_style_footer_fixed = {
			width: "720px",
			height: "110px",
			position: "fixed",
			left: "0",
			right: "0",
			bottom: "0",
            background:"#fff",
            borderTop:"1px solid #f0f0f0"
        };

		return (
                <div className="jiemo_style_footer_fixed" style={jiemo_style_footer_fixed}>
                    <a className={this.props.index==1 ? "jiemo_style_footer_item1 active" : "jiemo_style_footer_item1"}  onClick={ () => gotoHandler("/static/mall/shopping-cart/index.html", true) }></a>
                    <a className={this.props.index==2 ? "jiemo_style_footer_item2 active" : "jiemo_style_footer_item2"} onClick={ () => gotoHandler("/static/mall/shopping-cart/index.html", true) }></a>
					<a className={this.props.index==3 ? "jiemo_style_footer_item3 active" : "jiemo_style_footer_item3"} onClick={ () => gotoHandler("/static/mall/shopping-cart/index.html", true) }></a>
					<a className={this.props.index==4 ? "jiemo_style_footer_item4 active" : "jiemo_style_footer_item4"} onClick={ () => gotoHandler("/static/mall/shopping-cart/index.html", true) }></a>
                </div>
        )
    }
});
