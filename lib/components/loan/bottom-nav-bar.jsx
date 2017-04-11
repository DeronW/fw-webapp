/*
 parameters
 <NavBar title={}  height={} background={} />
 */

class BottomNavBar extends React.Component {
    constructor(props) {

        super(props);
        let height = parseInt(this.props.height) || 100;
        let lineHeight = parseInt(this.props.height) || 100;
        this.state = {
            height: height,
            lineHeight: lineHeight,
            background: this.props.background || 'white'
        };
    }

    render() {
        let jiemo_style_footer_fixed = {
            width: "720px",
            height: "110px",
            position: "fixed",
            left: "0",
            right: "0",
            bottom: "0",
            background: "#393f5a",
            borderTop: "1px solid #f0f0f0",
            zIndex: "100"
        };

        let { index } = this.props;

        return (
            <div className="jiemo_style_footer_fixed" style={jiemo_style_footer_fixed}>
                <a className={`jiemo_style_footer_item1 ${index === 1 && 'active'}`}
                    href="/static/loan/home/index.html">
                    <span className="icon-lendmoney"></span>
                    <p className="footer-text">借钱</p>
                </a>
                <a className={`jiemo_style_footer_item2 ${index === 2 && 'active'}`}
                    href="/static/loan/bill/index.html"></a>
                <a className={`jiemo_style_footer_item3 ${index === 3 && 'active'}`}
                    href="/static/loan/user/index.html"></a>
                <a className={`jiemo_style_footer_item4 ${index === 4 && 'active'}`}
                    href="/static/loan/user/index.html"></a>
                <a className={`jiemo_style_footer_item5 ${index === 5 && 'active'}`}
                    href="/static/loan/user/index.html"></a>
                <div className="domebox"></div>
            </div>
        )
    }
}
