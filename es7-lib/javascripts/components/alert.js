import React, { Component } from 'react'
import { unmountComponentAtNode } from 'react-dom'

/*
 parameters
 <Alert title={'这个是标题'} confirm_text={'CONFIRM'} show_callback={} hide_callback={} />

 title 显示标题
 header Show big header text
 confirm_text 是否显示确认按钮, 及其提示文字
 show_callback 显示之后的回调
 hide_callback 隐藏之后的回调
 */

class Alert extends Component {
    static defaultProps = {
        title: '好像出了点问题!?'
    }

    constructor() {
        super();
        this.state = {
            show: true
        };
    }

    hideHandler = () => {
        unmountComponentAtNode(document.getElementById(this.props.id));
    }

    componentWillUnmount() {
        this.props.unMountAlert && this.props.unMountAlert();
    }

    render() {
        let fontSize = '40px';

        let style_pop = {
            position: "fixed",
            top: "0px",
            bottom: "0px",
            width: "100%",
            zIndex: '99',
            fontSize: fontSize
        };
        let style_bg = {
            position: "absolute",
            top: "0px",
            left: "0px",
            right: "0px",
            bottom: "0px",
            background: "black",
            opacity: "0.3"
        };
        let _alert_style_panel = {
            display: "table",
            margin: "50% auto 0",
            position: "relative",
            width: window.innerWidth * 0.8 + "px",
            borderRadius: "8px",
            background: "white"
        };
        let style_close = {
            display: "none",
            position: "absolute",
            top: "-20px",
            right: "-20px",
            width: "40px",
            height: "40px",
            fontSize: "35px",
            background: 'white',
            borderRadius: '50%',
            textAlign: 'center',
            lineHeight: '40px',
            border: '5px solid #aaa',
            fontWeight: 'bold'
        };
        let style_text = {
            textAlign: "left",
            margin: "30px auto",
            lineHeight: "40px",
            color: "#555555",
            padding: "0 36px",
            maxWidth: "576px",
            fontSize: "28px"
        };
        let style_one_big = {
            display: "block",
            width: "516px",
            height: "74px",
            lineHeight: "74px",
            textAlign: "center",
            color: "white",
            background: "#f9655a",
            borderRadius: '4px',
            margin: '0 auto 30px',
            fontSize: "34px"
        };
        let style_header = {
            width: "538px",
            height: "88px",
            fontSize: "32px",
            color: "#333333",
            lineHeight: "88px",
            borderBottom: "1px solid #d8d8d8",
            backgroundColor: "#eee",
            paddingLeft: "38px",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px"
        };
        let title_index = {
            width: "36px",
            display: "inline-block",
            float: "left"
        };
        let title_content = {
            width: "468px",
            display: "inline-block",
            float: "left"
        };
        let title_wrap = {
            clear: "both",
            overflow: "hidden"
        };

        if (!this.state.show) return null;

        let title = this.props.title;
        let header = <div style={style_header}>{this.props.header}</div>;

        return <div style={style_pop}>
            <div style={style_bg} onClick={this.hideHandler}></div>
            <div className="_alert_style_panel" style={_alert_style_panel}>
                <div style={style_close} onClick={this.hideHandler}>&times;</div>
                {header}
                <div style={style_text}>{title}</div>
                <a style={style_one_big} onClick={this.hideHandler}>{this.props.confirm_text}</a>
            </div>
        </div>
    }
}

export default Alert
