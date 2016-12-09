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
        if (inIOS && inApp) {
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
        this.props.back_handler ? this.props.back_handler() : history.go(-1);
        //App里面后退不起作用 判断在App环境当中关掉当前webview
        setTimeout(()=> NativeBridge.isReady && NativeBridge.close(), 850)
    },
    render: function () {
        let fontSize = '36px';
        let inIOS = navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
        let inApp = navigator.userAgent.indexOf('FinancialWorkshop') >= 0;
        if (this.props.title && this.props.title.length > 7) fontSize = '32px';
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
            top: "0px",
            backgroundImage:"url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTFDQkQyMDM5RjUzMTFFNkJFNEE5MTVDMEU3MEVDMjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTFDQkQyMDQ5RjUzMTFFNkJFNEE5MTVDMEU3MEVDMjkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFMUNCRDIwMTlGNTMxMUU2QkU0QTkxNUMwRTcwRUMyOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFMUNCRDIwMjlGNTMxMUU2QkU0QTkxNUMwRTcwRUMyOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pj+ASv8AAAG1SURBVHja7NvBKkRhFMBxM2GjrL0BHoCylBdQbHgAC1l4FKVs7NmMrEUsFQ9AnsBadhbjqFGTWEm+c+7vX6fpbqY785s7d+bON73hcDihduoBASIgQAQEiIAAERAgngUgAgJEQIAICBABASIgAgJEQIAICBABASIgAgLkN23uH/3ZfQ8Odpt8zP2OvPBmYtZGt03XBZC5mLuYq5iL1nd2sgMY1zGLo+15R0g7GG8xO0DawdiOOQfSDsYgw873YQCB0QGQEhhVQMpgVAAphZEdpBxG5m/q32FsxZxlf//twwACowhIeYxMIJ3AyHJSn425iVmojpHlCFkaw/josCpGFpD7mMex7b2YDSD/10vM6hjKdMxJVZQsJ/XnrqBk+tjbCZRsXwzLo2S8dFIaJevV3rIomS+/l0TJ/gNVOZQKP+GWQqmyyOE7lNOMKJWWAX1FmcqIUm2hXHqUiktJU6NUXWz9E8o6kLZQjoG0gfIw2n5qfYer/4PqE2U5ZiXmFkgbvcZcZthR/1MHIiBABASIgAARECBAgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAhI+70LMACHPyRoayPenAAAAABJRU5ErkJggg==')",
            backgroundRepeat:"no-repeat"
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
        var _style_header_arm_down = {
            position: "absolute",
            width: "4px",
            height: this.state.height / 3 + "px",
            WebkitTransform: "rotate(135deg)",
            transform: "rotate(135deg)",
            top: "45px",
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

        if (inIOS && inApp) {
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
                top: "22px",
                backgroundImage:"url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTFDQkQyMDM5RjUzMTFFNkJFNEE5MTVDMEU3MEVDMjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTFDQkQyMDQ5RjUzMTFFNkJFNEE5MTVDMEU3MEVDMjkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFMUNCRDIwMTlGNTMxMUU2QkU0QTkxNUMwRTcwRUMyOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFMUNCRDIwMjlGNTMxMUU2QkU0QTkxNUMwRTcwRUMyOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pj+ASv8AAAG1SURBVHja7NvBKkRhFMBxM2GjrL0BHoCylBdQbHgAC1l4FKVs7NmMrEUsFQ9AnsBadhbjqFGTWEm+c+7vX6fpbqY785s7d+bON73hcDihduoBASIgQAQEiIAAERAgngUgAgJEQIAICBABASIgAgJEQIAICBABASIgAgLkN23uH/3ZfQ8Odpt8zP2OvPBmYtZGt03XBZC5mLuYq5iL1nd2sgMY1zGLo+15R0g7GG8xO0DawdiOOQfSDsYgw873YQCB0QGQEhhVQMpgVAAphZEdpBxG5m/q32FsxZxlf//twwACowhIeYxMIJ3AyHJSn425iVmojpHlCFkaw/josCpGFpD7mMex7b2YDSD/10vM6hjKdMxJVZQsJ/XnrqBk+tjbCZRsXwzLo2S8dFIaJevV3rIomS+/l0TJ/gNVOZQKP+GWQqmyyOE7lNOMKJWWAX1FmcqIUm2hXHqUiktJU6NUXWz9E8o6kLZQjoG0gfIw2n5qfYer/4PqE2U5ZiXmFkgbvcZcZthR/1MHIiBABASIgAARECBAgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAhI+70LMACHPyRoayPenAAAAABJRU5ErkJggg==')",
                backgroundRepeat:"no-repeat"
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

        let back_btn = (
            <div className="_style_header_arrow" style={_style_header_arrow} onClick={this.backClickHandler}>
                {/*<div className="_style_header_arm_up" style={_style_header_arm_up}></div>
                <div className="_style_header_arm_down" style={_style_header_arm_down}></div>*/}
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