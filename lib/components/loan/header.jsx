/*
 parameters
 <Header title={} title_img={} height={} background={} sub_text={} sub_url={} />
 */

class Header extends React.Component {
    static defaultProps = {
        show_back: true
    }

    constructor(props) {
        super(props);
        let height = parseInt(this.props.height) || 100;

        this.state = {
            height: height,
            background: this.props.background || 'white',
            title: this.props.title,
            title_img: this.props.title_img
        };

        this.backClickHandler = this.backClickHandler.bind(this);
    }

    backClickHandler = () => {
        this.props.back_handler
            ? this.props.back_handler()
            : window.history.back();
    }

    // componentDidMount() {
    //
    //     NativeBridge.setTitle(this.props.title);
    // }

    render() {
        let fontSize = '36px';
        if (this.props.title && this.props.title.length > 7)
            fontSize = '32px';
        let _style_header_fixed = {
            transform: 'translate3d(0, 0, 0)',
            position: "fixed",
            top: "0px",
            left: "0px",
            right: "0px",
            height: this.state.height + 'px',
            textAlign: "center",
            lineHeight: this.state.height + 'px',
            background: this.state.background,
            zIndex: '9',
            textShadow: "0 0 8px white",
            fontSize: fontSize,
            color: "#333"
        };

        // let _style_header_arrow = {
        //     display: "block",
        //     position: "absolute",
        //     width: this.state.height + "px",
        //     height: this.state.height + "px",
        //     lineHeight: this.state.height + "px",
        //     fontFamily: "serif",
        //     fontSize: fontSize,
        //     fontWeight: 'bold',
        //     color: "#6aa4f0",
        //     overflow: "hidden",
        //     borderRadius: '50%',
        //     left: "0px",
        //     top: "0px"
        // };

        let _style_header_arrow = {
            display: "block",
            width: "24px",
            height: "42px",
            position: "absolute",
            background:"url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAABACAYAAACQuc6tAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgTWFjaW50b3NoIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhDMUQ2MjE1NUFFNDExRTdBNTBFOTdFREIxMjY2RDhDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhDMUQ2MjE2NUFFNDExRTdBNTBFOTdFREIxMjY2RDhDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEMxRDYyMTM1QUU0MTFFN0E1MEU5N0VEQjEyNjZEOEMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEMxRDYyMTQ1QUU0MTFFN0E1MEU5N0VEQjEyNjZEOEMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5Bu7+2AAADvElEQVR42sSaWUiUURTH76gttGJYWRGVELYRSUiEhUub7VQUFT1oC1Fg2kNGFFYPhdGC0eJDJWFCu+2r7Qs9RBQRLVAUQWH7akSl9j90Pvq6nDFn/L4zB36o984MP+7c5dzzGZhf9tFEKJqANWAm+AkWxERIpBkoByNcbRsjIdMCHAXpVnu0tkxrcAKkCH1bNWViwRmQLPTtAwVRSiJtwYUgImVgOqjWkIkHl0A/oW8byCIR+sNvmc4s0kvo2wLmOiJ+y3QFl0Gi0LcO5IBad6NfMt1ZpJvQtwosskUo/FhNPcF50EHoWwpWB3uj1zJ9QQVoZ7XX8misr+vNXsr0B2dBG0Ekhyes0ZAZCE7xDuuOal4xO+rzIV7IpIJjoKUgksWbmtGQGQYO8ynsjh9gBtgfyoc1RGY0OACaCiKT+WQOKcLdZyZyPmKLfAPjwxEJd2Smgl3Ce6vAWHAx3KEOdWScCWmLfAKZDREJVYaWaAllZFb7B57I1xq6LOsrkwuKQcBqfwuGgJtebFb1kVkMigSRSt5jbnu1hf9PZjkoFNpfgDRw38uDra7VVMijYsczkAGeen3cSzL0dWwAeULfY54jz/1IgmIEkWJeOXY8AEPBS79SQ7cMLdntvJfYcZeX72s/E+YY189SME14zS2+hr7z+xpBEo3Bbj5v7LgBRvIO63tEcU4qiVzhEVERcWRmC+0VPCJfNC/iJFMjtDdSuOCJMlKiTLvraSGn9V1mBdgj9KXw1xWrKVPN+Wqp0J/MF7I4LRknk8/mqoAdSXx5j9eSMTyR6RjYLLyuNwt10pJx3/7WCq9N5L2ni5aME/lcLbAjgasLCZoyFMsYO2hkroIemjJOLSVfqKV05DnUR1PG8PzJEYTa89UkSVPGmL/1N/voiON9KFlTxvAelG1cBUEO2qHPgUGaMoZ3adqtf1ntrfgsS9eUMXyOTeFqgzuag+Pm34cTKlWIQ2AC+G61U53mCBijKUNxEozjMog76DnSQTBJU8bJCEeBr1Y75dV7zZ9nAmoyho+HTCFXjuYJn6UpQ3Gdb5rvBaGSIJdC32Sc+xUJvQlyS83VlKG4w/lzpSBUFKSQ4JuM4TJJGpdNpMpGgaYMxSMwmMsndqw0QR5m+Hk3ovpNKpdR7FjCZZeAlozhOg4JPRT6FnI2ENCSMVzPoTl0T+ibx9lAtJYMxSs+0aVi5Cyw0yg/ZKcybQanGgOsPkpLnmhf7um/QIYbuYA9R73SgPhs5NJ+TSRkKKr4tN/Ev9NXmPdbgAEAHq21H+AZySMAAAAASUVORK5CYII=') no-repeat center",
            backgroundSize:"100% 100%",
            top: "29px",
            left: "34px"
        }

        let _style_header_arm_up = {
            position: "absolute",
            width: "4px",
            height: this.state.height / 3 + "px",
            WebkitTransform: "rotate(45deg)",
            transform: "rotate(45deg)",
            top: "25px",
            left: "50px",
            background: "#6aa4f0"
        };
        let _style_header_arm_down = {
            position: "absolute",
            width: "4px",
            height: this.state.height / 3 + "px",
            WebkitTransform: "rotate(135deg)",
            transform: "rotate(135deg)",
            top: "45px",
            left: "50px",
            background: '#6aa4f0'
        };

        let title = this.state.title;
        if (this.state.title_img)
            title = <img src={this.state.title_img} style={{
                display: 'block',
                margin: '0 auto',
                width: "182px",
                position: "relative",
                top: "30px"
            }} />;

        let link = null;
        if (this.props.sub_text) {
            link = <a href={this.props.sub_url} style={{
                display: 'block',
                position: 'absolute',
                fontSize: '30px',
                right: '20px',
                color: '#555',
                top: '0'
            }}>{this.props.sub_text}</a>
        }

        var ua = navigator.userAgent;
        // 如果页面在app中打开, 则不显示网页的头部导航
        if (ua.indexOf('EasyLoan888') >= 0 && this.props.enable !== 'force')
            return null;

        // 如果在微信中打开, 除了个别页面外, 也不显示头部导航
        let show_header_titles = [''];
        if (ua.indexOf('MicroMessenger') >= 0 && show_header_titles.indexOf(title) < 0)
            return null;
        if ($FW.Browser.inApp())
            return null;
        if ($FW.Browser.inWeixin())
            return null;

        let back_arrow = <Nav className="_style_header_arrow" style={_style_header_arrow}
            onClick={this.backClickHandler}>
            {/*<div className="_style_header_arm_up" style={_style_header_arm_up}></div>*/}
            {/*<div className="_style_header_arm_down" style={_style_header_arm_down}></div>*/}
        </Nav>

        return <div style={{ height: this.state.height + 'px' }}>
            <div className="_style_header_fixed" style={_style_header_fixed}>
                {this.props.show_back && back_arrow}
                {title}
                {link}
            </div>
        </div>
    }
}
