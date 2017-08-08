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
            background: 'rgba(0,0,0,0.2)'
        },
        alert_panel: {
            display: "table",
            position: "absolute",
            top: "50%",
            left: "50%",
            marginLeft: "-288px",
            marginTop: "-101px",
            width: "576px",
            borderRadius: "8px",
            background: "white"
        },
        text: {
            margin: "30px auto",
            lineHeight: "40px",
            color: "#555555",
            padding: "0 36px",
            maxWidth: "576px",
            fontSize: "28px",
            textAlign: "center"
        },
        btn: {
            display: "block",
            width: "516px",
            height: "74px",
            lineHeight: "74px",
            textAlign: "center",
            color: "white",
            background: "#6aa4f0",
            borderRadius: '6px',
            margin: '0 auto 30px',
            fontSize: "34px"
        }
    }
}

class Alert extends Component {
    static defaultProps = {
        text: '好像出了点问题!?',
        confirmBtnText: '确定'
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
                <div className="_style_alert_text"
                     style={styles.text}>{this.props.text}</div>
                <a style={styles.btn} onClick={this.hideHandler}>{this.props.confirmBtnText}</a>
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
