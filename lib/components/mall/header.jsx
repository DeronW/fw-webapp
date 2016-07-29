/*
 parameters
 <Header title={} title_img={} height={} background={} />
 */

'use strict';

const Header = React.createClass({
    getInitialState: function () {
        let height = parseInt(this.props.height) || 100;
        let lineHeight = parseInt(this.props.height) || 100;
        let inIOS = navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
        let inApp = navigator.userAgent.indexOf('FinancialWorkshop') >= 0;
        // compatible with iPhone state bar, move down 22px
        if(inIOS && inApp) {
            height += 22;
            lineHeight = 152;
        }
        return {
            height: height,
            lineHeight: lineHeight,
            background: this.props.background || 'white',
            title: this.props.title,
            title_img: this.props.title_img,
            show_back_btn: this.props.show_back_btn !== false
        }
    },
    backClickHandler: function () {
        this.props.back_handler ? this.props.back_handler() : history.back();
        //App里面后退不起作用 判断在App环境当中关掉当前webview
        NativeBridge.isReady && NativeBridge.close();
    },
    render: function () {
        let fontSize = '40px';
        let inIOS = navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
        let inApp = navigator.userAgent.indexOf('FinancialWorkshop') >= 0;
        if(this.props.title && this.props.title.length > 7) fontSize  = '32px';
        let _style_header_fixed = {
            transform: 'translate3d(0, 0, 0)',
            position: "fixed",
            top: "0px",
            left: "0px",
            right: "0px",
            height: this.state.height + 'px',
            textAlign: "center",
            lineHeight: this.state.lineHeight + 'px',
            background: this.state.background,
            zIndex: '9',
            textShadow: "0 0 8px white",
            fontSize: fontSize,
            borderBottom: "1px solid #d8d8d8"
        };

        var _style_header_arrow = {
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
        var _style_header_arm_down = {
            position: "absolute",
            width: "6px",
            height: this.state.height / 4 + "px",
            WebkitTransform: "rotate(135deg)",
            transform: "rotate(135deg)",
            top: "44px",
            left: "50px",
            background: '#536f95'
        };
        var _img_style = {
            display: 'block',
            margin: '0 auto',
            width: "182px",
            position: "relative",
            top: "30px"
        }

        if(inIOS && inApp){
            _img_style = {
                display: 'block',
                margin: '0 auto',
                width: "182px",
                position: "relative",
                top: "52px"
            };
            _style_header_arrow = {
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
                top: "22px"
            };
            _style_header_arm_down = {
                position: "absolute",
                width: "6px",
                height: this.state.height / 4 + "px",
                WebkitTransform: "rotate(135deg)",
                transform: "rotate(135deg)",
                top: "49px",
                left: "50px",
                background: '#536f95'
            };
        }

        let title = this.state.title;
        if (this.state.title_img)
            title = <img src={this.state.title_img} style={_img_style}/>;

        let back_btn = (<div className="_style_header_arrow" style={_style_header_arrow} onClick={this.backClickHandler}>
            <div className="_style_header_arm_up" style={_style_header_arm_up}></div>
            <div className="_style_header_arm_down" style={_style_header_arm_down}></div>
        </div>);

        return (
            <div style={{height: this.state.height + 'px'}}>
                <div className="_style_header_fixed" style={_style_header_fixed}>
                    {this.state.show_back_btn ? back_btn : null}
                    {title}
                </div>
            </div>
        )
    }
});