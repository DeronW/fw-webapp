import { Component } from 'react'


class Header extends Component {
    static defaultProps = {
        show_back: true,
        sub_text: null,
        sub_url: null
    }

    constructor(props) {
        super(props);
        let height = parseInt(this.props.height) || 100;

        this.state = {
            height: height,
            title: this.props.title,
        };

        this.backClickHandler = this.backClickHandler.bind(this);
    }

    backClickHandler = () => {
        this.props.back_handler
            ? this.props.back_handler()
            : window.history.back();
    }

    componentDidMount() {
        NativeBridge.setTitle(this.props.title);
    }

    render() {
        let fontSize = '40px';
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
            background: 'white',
            zIndex: '9',
            textShadow: "0 0 8px white",
            fontSize: fontSize,
            color: "#333"
        };

        let _style_header_arrow = {
            display: "block",
            position: "absolute",
            width: this.state.height + "px",
            height: this.state.height + "px",
            lineHeight: this.state.height + "px",
            fontFamily: "serif",
            fontSize: fontSize,
            fontWeight: 'bold',
            color: "#6aa4f0",
            overflow: "hidden",
            borderRadius: '50%',
            left: "0px",
            top: "0px"
        };

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

        let ua = navigator.userAgent;
        // 如果在微信中打开, 不显示头部导航
        let show_header_titles = [''];
        if (ua.indexOf('MicroMessenger') >= 0)
            return null;

        let back_arrow = <Nav className="_style_header_arrow" style={_style_header_arrow}
            onClick={this.backClickHandler}>
            <div className="_style_header_arm_up" style={_style_header_arm_up}></div>
            <div className="_style_header_arm_down" style={_style_header_arm_down}></div>
        </Nav>

        return <div style={{ height: this.state.height + 'px' }}>
            <div className="_style_header_fixed" style={_style_header_fixed}>
                {this.props.show_back && back_arrow}
                {this.state.title}
                {link}
            </div>
        </div>
    }
}

export default Header
