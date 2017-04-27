import React from 'react'

class CircleLoading extends React.Component {
    componentWillUnmount() {
        this.props.unMountHandler && this.props.unMountHandler();
    }

    render() {
        let _style_loader = {}
        let _style_loading_info = {}
        let _style_bg = {}

        return <div>
            <div className="_style_loader"></div>
            <div className="_style_loading_info">全力加载中</div>
            <div className="_style_bg"></div>
        </div>
    }
}

export default CircleLoading
