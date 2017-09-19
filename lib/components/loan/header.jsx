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


        let _style_header_arrow = {
            display: "block",
            width: "24px",
            height: "42px",
            position: "absolute",
            background:"url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAABACAMAAACnZz6fAAAAilBMVEUAAABqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPCO4MWrAAAALXRSTlMABOz05vv4Dz4o8N8ZC9WEdlMU2s/Kxb+ilpCKfm1lWUxGMiIep5s2LrlgXa00eCvYAAABKElEQVRIx4XWWZKCQBBFUSzAARBFHFFBBRW12f/2un0dwR838/sEQVblUB7HqPBdxWT+6rrOMdl1fxERmWy7byyIbETuo2GyWovsgSSpyANIk4sc4F/qWOQIZBZjRiKByBJIa5ObEzkDeUZfEZZApr7IB8hVZJwBuYxFLkAyEf8KpApFpkDeIhGRUsfinkDO/+QGZCkSzICcbHIUiWsghUjeADmIpAn0615kvQJyF9kQ+RHZTsyMdkQ8Vd1r7lE4fYbNov8dOy0h83gQPfpjNu8iF7KuveHsBmoDaoxrtQVi17yiDLl3FB/sQe5lngn2bLFnlD3rKkaR0BtIP3tLRO3AgIZdwOiEqLYXT7/jCkRJCosQFiouZl7wys5+KASe9eCQYVT4LvsFjlpBPth8nNUAAAAASUVORK5CYII=') no-repeat center",
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
