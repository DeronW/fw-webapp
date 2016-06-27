/*
 <BannerGroup />

 parameters

 */

const BannerGroup = React.createClass({

    propTypes: {
        startIndex: React.PropTypes.number,
        speed: React.PropTypes.number,
        auto: React.PropTypes.number,
        loop: React.PropTypes.bool,
        className: React.PropTypes.string,
        afterIndexChange: React.PropTypes.func,
        onImageClick: React.PropTypes.func,
        images: React.PropTypes.array
    },

    getInitialState: function () {
        this._touch = {
            originLeft: 0,
            startX: null,
            startAt: null
        };
        this._timer = null;

        return {
            index: this.props.startIndex || 1,
            loop: this.props.loop,
            show: false,
            left: 0,
            width: 0,
            height: 0
        };
    },

    componentDidMount: function () {
        this.initHandler();
        window.addEventListener('resize', this.initHandler)
    },

    initHandler: function () {
        let elem = ReactDOM.findDOMNode(this);
        let w = elem.offsetWidth;
        this.setState({
            show: true,
            width: w,
            height: elem.offsetHeight,
            left: -1 * w * this.state.index
        });
    },

    touchStartHandler: function (event) {
        this._touch.startX = event.changedTouches[0].pageX;
        this._touch.originLeft = this.state.left;
        clearInterval(this._timer);
    },

    touchMoveHandler: function (event) {
        let left = this._touch.originLeft + event.changedTouches[0].pageX - this._touch.startX;
        this.setState({left: left})
    },
    touchEndHandler: function (event) {
        let _this = this;

        let delta = event.changedTouches[0].pageX - this._touch.startX;

        let ti = this.state.index;
        let lastIndex = this.props.images.length;

        if (Math.abs(delta) > this.state.width / 8) {
            if (delta > 0) {
                if (this.state.index > 1) {
                    ti = this.state.index - 1
                } else if (this.state.loop) {
                    ti = 0
                }
            } else {
                if (this.state.index < lastIndex || this.state.loop)
                    ti = this.state.index + 1
            }
        }

        let targetLeft = -this.state.width * ti;

        let step = (targetLeft - this.state.left) / 15.0;

        this._timer = setInterval(function () {
            if (Math.abs(_this.state.left - targetLeft) <= Math.abs(step * 1.5)) {
                clearInterval(_this._timer);

                if (ti == 0) {
                    ti = lastIndex;
                    targetLeft = -_this.state.width * ti;
                } else if (ti == lastIndex + 1) {
                    ti = 1;
                    targetLeft = -_this.state.width * ti;
                }
                if (_this.state.index != ti) _this.props.afterIndexChange && _this.props.afterIndexChange(ti);

                _this.setState({left: targetLeft, index: ti});
            } else {
                _this.setState({left: _this.state.left + step})
            }
        }, 20)

    },

    imageClickHandler: function (index) {
        this.props.onImageClick && this.props.onImageClick(index);
    },

    render: function () {
        let _this = this;

        let style = {
            overflow: 'hidden',
            visibility: this.state.show ? 'visible' : 'hidden',
            position: 'relative',
            transform: 'translate3d(0, 0, 0)'
        };

        let image = (img, index) => {
            return (
                <img key={index}
                     onClick={() => _this.imageClickHandler(index) }
                     className={index + 1 == this.state.index ? 'active' : null}
                     style={{
                        display: 'block',
                        float: 'left',
                        width: _this.state.width + 'px'
                    }} src={img}/>
            )
        };

        let imitateStyle = {width: this.state.width + 'px', height: '100%', float: 'left'};
        let imitateFirst = <div style={imitateStyle}></div>;
        let imitateLast = <div style={imitateStyle}></div>;
        if (this.state.loop) {
            imitateFirst = image(this.props.images[this.props.images.length - 1], 99);
            imitateLast = image(this.props.images[0], 100)
        }

        return (
            <div className={this.props.className + " global-banner-group"}
                 style={style}
            >
                <div style={{
                    width: this.state.width * (this.props.images.length + 2),
                    position: 'absolute',
                    height: '100%',
                    left: this.state.left
                }}
                     onTouchStart={this.touchStartHandler}
                     onTouchMove={this.touchMoveHandler}
                     onTouchEnd={this.touchEndHandler}
                >
                    {imitateFirst}
                    {this.props.images.map(image) }
                    {imitateLast}
                </div>
            </div>
        )
    }
});