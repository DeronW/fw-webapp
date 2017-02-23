/*
 parameters
 <Header title={} title_img={} height={} background={} />
 */

const Header = React.createClass({
    propTypes: {
        show_back_btn: React.PropTypes.bool,
        title_img: React.PropTypes.string,
        background: React.PropTypes.string,
        title: React.PropTypes.string.isRequired
    },
    getDefaultProps: function () {
        return {}
    },
    getInitialState: function () {
        return {
            background: this.props.background || 'white',
            title: this.props.title,
            title_img: this.props.title_img,
            show_back_btn: this.props.show_back_btn !== false
        }
    },
    backClickHandler: function () {
        if (this.props.back_handler) {
            this.props.back_handler()
        } else {
            history.go(-1);
            //App里面后退不起作用 判断在App环境当中关掉当前webview
            setTimeout(() => NativeBridge.isReady && NativeBridge.close(), 300)
        }
    },
    render: function () {
        let {title, background, title_img} = this.state, height = 100, lineHeight = 100;
        let IOS_DELTA = 22;

        // compatible with iPhone state bar, move down 22px
        let inIOSAPP = false;
        if ($FW.Browser.inIOS() && $FW.Browser.inApp()) {
            height += IOS_DELTA;
            lineHeight += IOS_DELTA * 2.4;
            inIOSAPP = true;
        }

        let fontSize = title && title.length > 7 ? '36px' : '32px';

        let _style_header_fixed = {
            transform: 'translate3d(0, 0, 0)',
            position: "fixed",
            top: "0px",
            left: "0px",
            right: "0px",
            height: height + 'px',
            textAlign: "center",
            lineHeight: lineHeight + 'px',
            background: background,
            zIndex: '9',
            textShadow: "0 0 8px white",
            fontSize: fontSize,
            borderBottom: "1px solid #d8d8d8",
            color: "#333"
        };

        var _style_header_arrow = {
            display: "block",
            position: "absolute",
            width: height + "px",
            height: height + "px",
            lineHeight: height + "px",
            fontFamily: "serif",
            fontSize: fontSize,
            fontWeight: 'bold',
            color: "#536f95",
            overflow: "hidden",
            left: "0px",
            top: "0px",
            backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTFDQkQyMDM5RjUzMTFFNkJFNEE5MTVDMEU3MEVDMjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTFDQkQyMDQ5RjUzMTFFNkJFNEE5MTVDMEU3MEVDMjkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFMUNCRDIwMTlGNTMxMUU2QkU0QTkxNUMwRTcwRUMyOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFMUNCRDIwMjlGNTMxMUU2QkU0QTkxNUMwRTcwRUMyOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pj+ASv8AAAG1SURBVHja7NvBKkRhFMBxM2GjrL0BHoCylBdQbHgAC1l4FKVs7NmMrEUsFQ9AnsBadhbjqFGTWEm+c+7vX6fpbqY785s7d+bON73hcDihduoBASIgQAQEiIAAERAgngUgAgJEQIAICBABASIgAgJEQIAICBABASIgAgLkN23uH/3ZfQ8Odpt8zP2OvPBmYtZGt03XBZC5mLuYq5iL1nd2sgMY1zGLo+15R0g7GG8xO0DawdiOOQfSDsYgw873YQCB0QGQEhhVQMpgVAAphZEdpBxG5m/q32FsxZxlf//twwACowhIeYxMIJ3AyHJSn425iVmojpHlCFkaw/josCpGFpD7mMex7b2YDSD/10vM6hjKdMxJVZQsJ/XnrqBk+tjbCZRsXwzLo2S8dFIaJevV3rIomS+/l0TJ/gNVOZQKP+GWQqmyyOE7lNOMKJWWAX1FmcqIUm2hXHqUiktJU6NUXWz9E8o6kLZQjoG0gfIw2n5qfYer/4PqE2U5ZiXmFkgbvcZcZthR/1MHIiBABASIgAARECBAgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAhI+70LMACHPyRoayPenAAAAABJRU5ErkJggg==')",
            backgroundRepeat: "no-repeat"
        };

        var _img_style = {
            display: 'block',
            margin: '0 auto',
            width: "182px",
            position: "relative",
            top: "30px"
        }

        if (inIOSAPP) {
            _img_style.top = 30 + IOS_DELTA +　'px';
            _style_header_arrow.top = IOS_DELTA + 'px';
        }

        if (title_img) title = <img src={title_img} style={_img_style} />;

        let back_btn = (<div className="_style_header_arrow" style={_style_header_arrow}
            onClick={this.backClickHandler}> </div>);

        return (
            <div style={{ height: height + 'px' }}>
                <div className="_style_header_fixed" style={_style_header_fixed}>
                    {this.state.show_back_btn && back_btn}
                    {title}
                </div>
            </div>
        )
    }
});
