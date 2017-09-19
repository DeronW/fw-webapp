/*
 parameters
 <Header title={} title_img={} height={} background={} sub_text={} sub_url={} />
 */

class Header extends React.Component {

    constructor(props) {
        super(props)

        let height = parseInt(props.height) || 100;

        this.state = {
            height: height,
            background: props.background || 'white',
            title: props.title,
            title_img: props.title_img,
            show_back_btn: props.show_back_btn !== false
        }
    }

    backClickHandler = () => {
        this.props.back_handler ? this.props.back_handler() : window.history.back();
    }

    render() {
        let fontSize = '40px';
        if (this.props.title && this.props.title.length > 7) fontSize = '32px';
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
            borderBottom: "1px solid #d8d8d8"
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
            color: "#536f95",
            overflow: "hidden",
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
            background: "#536f95"
        };
        let _style_header_arm_down = {
            position: "absolute",
            width: "4px",
            height: this.state.height / 3 + "px",
            WebkitTransform: "rotate(135deg)",
            transform: "rotate(135deg)",
            top: "45px",
            left: "50px",
            background: '#536f95'
        };

        let title = this.state.title;
        if (this.state.title_img)
            title = <img src={this.state.title_img}
                style={{
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

        let back_btn;
        if (this.state.show_back_btn) {
            back_btn = <div className="_style_header_arrow" style={_style_header_arrow} onClick={this.backClickHandler}>
                <div className="_style_header_arm_up" style={_style_header_arm_up}></div>
                <div className="_style_header_arm_down" style={_style_header_arm_down}></div>
            </div>
        }

        return <div style={{ height: this.state.height + 'px' }}>
            <div className="_style_header_fixed" style={_style_header_fixed}>
                {back_btn}
                {title}
                {link}
            </div>
        </div>
    }
}
