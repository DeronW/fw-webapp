/*
 parameters
 <Header title={} title_img={} height={} background={} sub_text={} sub_url={} />
 */

'use strict';

const Header = React.createClass({
    getInitialState: function () {
        let height = parseInt(this.props.height) || 100;
        return {
            height: height,
            background: this.props.background || 'white',
            title: this.props.title,
            title_img: this.props.title_img
        }
    },
    backClickHandler: function () {
        alert(this.props.back_handler);
        this.props.back_handler ? this.props.back_handler() : window.history.back();
    },
    render: function () {
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
            width: "6px",
            height: this.state.height / 4 + "px",
            WebkitTransform: "rotate(45deg)",
            transform: "rotate(45deg)",
            top: "30px",
            left: "50px",
            background: "#536f95"
        };
        let _style_header_arm_down = {
            position: "absolute",
            width: "6px",
            height: this.state.height / 4 + "px",
            WebkitTransform: "rotate(135deg)",
            transform: "rotate(135deg)",
            top: "44px",
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
                         }}/>;

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

        return (
            <div style={{height: this.state.height + 'px'}}>
                <div className="_style_header_fixed" style={_style_header_fixed}>
                    <div className="_style_header_arrow" style={_style_header_arrow} onClick={this.backClickHandler}>
                        <div className="_style_header_arm_up" style={_style_header_arm_up}></div>
                        <div className="_style_header_arm_down" style={_style_header_arm_down}></div>
                    </div>
                    {title}
                    {link}
                </div>
            </div>
        )
    }
});