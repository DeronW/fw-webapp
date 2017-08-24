import React, { Component } from 'react'
import { unmountComponentAtNode } from 'react-dom'
import PropTypes from 'prop-types'

function getStyles() {

    return {
        root_panel: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)'
        },
        alert_panel: {
            display: "table",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: 'translate(-50%, -50%)',
            width: "600px",
            padding:"30px",
            borderRadius: "10px",
            background: "white",
            minHeight:"370px"
        },
        text_container:{
            width:"100%",
            position:"absolute",
            left:0,
            right:0,
            bottom:"113px",
            minHeight:"300px",
            display:"table"
        },
        text: {
            // width:"100%",
            // margin: "0 auto 30px",
            lineHeight: "50px",
            color: "#555555",
            // width: "100%",
            fontSize: "30px",
            textAlign: "center",
            display:"table-cell",
            verticalAlign:"middle",
            padding:"0 30px"
        },
        btn: {
            display: "block",
            // width: "100%",
            height: "83px",
            lineHeight: "83px",
            textAlign: "center",
            color: "white",
            background: "#6aa4f0",
            borderRadius: '4px',
            fontSize: "34px",
            position:"absolute",
            left:"30px",
            right:"30px",
            bottom:"30px"
        },
        left: {
            // width:"100%",
            // margin: "0 auto 30px",
            lineHeight: "50px",
            color: "#555555",
            // width: "100%",
            fontSize: "30px",
            // textAlign: "center",
            display:"table-cell",
            verticalAlign:"middle",
            padding:"0 30px"
        }
    }
}

class Alert extends Component {
    static defaultProps = {
        text: '好像出了点问题!?',
        confirmBtnText: '知道了'
    }

    hideHandler = () => {
        unmountComponentAtNode(this.props.mountedNode);
    }

    componentWillUnmount() {
        this.props.unMountAlert && this.props.unMountAlert();
    }

    render() {

        let styles = getStyles()

        return <div style={styles.root_panel}>
            <div style={styles.alert_panel}>
                <div style={styles.text_container}>
                    <div className="_style_alert_text"
                        style={Number(this.props.text.length) > 30 ? styles.left : styles.text}>{this.props.text}</div>
                </div>
                <a style={ styles.btn } onClick={this.hideHandler}>{this.props.confirmBtnText}</a>
            </div>
        </div>
    }
}

Alert.propTypes = {
    text: PropTypes.string, // 显示标题
    confirmBtnText: PropTypes.string, // 大按钮显示文案
    mountedNode: PropTypes.object, // document node to be mounted
    unMountAlert: PropTypes.func // 组件卸载时的回调函数
}


export default Alert
