/*
 parameters
 <NavBar title={}  height={} background={} />
 */


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
    gotoHandler: function (link) {
        location.href = encodeURI(link);
    },
    render: function () {
        let jiemo_style_footer_fixed = {
            width: "720px",
            height: "110px",
            position: "fixed",
            left: "0",
            right: "0",
            bottom: "0",
            background: "#393f5a",
            borderTop: "1px solid #f0f0f0",
            zIndex:"100"
        };

        return (
            <div className="jiemo_style_footer_fixed" style={jiemo_style_footer_fixed}>
                <a className={this.props.index == 1 ? "jiemo_style_footer_item1 active" : "jiemo_style_footer_item1"} onClick={() => this.gotoHandler("/static/loan/home/index.html")}></a>
                <a className={this.props.index == 2 ? "jiemo_style_footer_item2 active" : "jiemo_style_footer_item2"} onClick={() => this.gotoHandler("/static/loan/bill/index.html")}></a>
                <a className={this.props.index == 3 ? "jiemo_style_footer_item3 active" : "jiemo_style_footer_item3"} onClick={() => this.gotoHandler("/static/loan/user/index.html")}></a>
            </div>
        )
    }
});
