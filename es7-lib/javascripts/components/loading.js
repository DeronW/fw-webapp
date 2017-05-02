import React, { Component } from 'react'

class CircleLoading extends Component {
    constructor() {
        super()
        this.state = {
            rotate: 0
        }
    }

    componentDidMount() {
        setTimeout(() => this.setState({ rotate: 360 }), 50)
        this._timer = setInterval(() =>
            this.setState({ rotate: this.state.rotate + 360 }), 1000)
    }

    componentWillUnmount() {
        clearInterval(this._timer)
        this.props.unMountHandler && this.props.unMountHandler();
    }

    render() {
        let _style_loader = {
            position: 'relative',
            borderTop: '14px solid rgba(255, 255, 255, 0.2)',
            borderRight: '14px solid rgba(255, 255, 255, 0.2)',
            borderBottom: '14px solid rgba(255, 255, 255, 0.2)',
            borderLeft: '14px solid #ffffff',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            top: '50%',
            left: '50%',
            transition: 'all 1s linear',
            transform: `translate(-50%,-50%) rotate(${this.state.rotate}deg)`,
        }

        let _style_small_loader = {
            position: 'fixed',
            borderTop: '8px solid rgba(255, 255, 255, 0.2)',
            borderRight: '8px solid rgba(255, 255, 255, 0.2)',
            borderBottom: '8px solid rgba(255, 255, 255, 0.2)',
            borderLeft: '8px solid #e8e8e8',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            top: '20px',
            right: '30px',
            transition: 'all 1s linear',
            transform: `rotate(${this.state.rotate}deg)`,
        }

        let _style_bg = {
            zIndex: 99,
            position: 'fixed',
            right: 0,
            bottom: 0,
            borderRadius: '30px',
            width: '160px',
            height: '160px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            background: 'rgba(0,0,0,0.3)'
        }

        return <div>
            <div className="_style_bg" style={_style_bg}>
                <div className="_style_loader" style={_style_loader}></div>
            </div>
            <div className="_style_small_loader" style={_style_small_loader}></div>
        </div>
    }
}

export default CircleLoading
