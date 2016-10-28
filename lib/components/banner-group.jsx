/*
 <BannerGroup />

 parameters

 */

const BannerGroup = React.createClass({

    propTypes: {
        startIndex: React.PropTypes.number,
        autoPlay: React.PropTypes.number,
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

        this._onAnimate = false;
        this._onTouching = false;

        let images = this.props.images || [];

        let loop = true;
        if (this.props.loop === false || images.length <= 1) loop = false;

        let autoPlay = this.props.autoPlay || 0;
        autoPlay = images.length <= 1 ? false : (autoPlay < 3000 ? 3000 : autoPlay);

        return {
            index: this.props.startIndex || 1,
            images: images,
            autoPlay: autoPlay,
            loop: loop,
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

    componentWillUnmount: function () {
        clearInterval(this._auto_timer);
        clearInterval(this._timer);
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
        this.resetTimer();
    },

    resetTimer: function () {
        if (!this.state.autoPlay) return;
        clearInterval(this._auto_timer);
        this._auto_timer = setInterval(function () {
            if (!this._onTouching && !this._onAnimate) this.animateTo(this.state.index + 1)
        }.bind(this), this.state.autoPlay)
    },

    animateTo: function (targetIndex) {
        let ti = targetIndex;
        let lastIndex = this.state.images.length;
        let targetLeft = -this.state.width * ti;
        let step = (targetLeft - this.state.left) / 15.0;
        this._onAnimate = true;

        this._timer = setInterval(function () {
            if (Math.abs(this.state.left - targetLeft) <= Math.abs(step * 1.5)) {
                clearInterval(this._timer);

                if (ti == 0) {
                    ti = lastIndex;
                    targetLeft = -this.state.width * ti;
                } else if (ti == lastIndex + 1) {
                    ti = 1;
                    targetLeft = -this.state.width * ti;
                }
                if (this.state.index != ti) this.props.afterIndexChange && this.props.afterIndexChange(ti);

                this._onAnimate = false;
                this.setState({left: targetLeft, index: ti});
            } else {
                this.setState({left: this.state.left + step})
            }
        }.bind(this), 20)
    },

    touchStartHandler: function (event) {
        if (this._onTouching) return;
        this._touch.startX = event.changedTouches[0].pageX;
        this._touch.originLeft = this.state.left;
        this._onTouching = true;
        clearInterval(this._timer);
    },

    touchMoveHandler: function (event) {
        let left = this._touch.originLeft + event.changedTouches[0].pageX - this._touch.startX;
        this.setState({left: left});
        event.preventDefault();
        event.stopPropagation();
    },

    touchEndHandler: function (event) {
        this._onTouching = false;

        let delta = event.changedTouches[0].pageX - this._touch.startX;

        let ti = this.state.index;
        let lastIndex = this.state.images.length;

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

        this.animateTo(ti);
    },

    imageClickHandler: function (index) {
        this.props.onImageClick && this.props.onImageClick(index);
    },

    getDotStyle: function (active) {
        let bg = active ? 'white' : 'hsla(0, 0%, 100%, .25)';
        return {
            display: 'inline-block',
            width: '10px',
            height: '10px',
            background: bg,
            borderRadius: '50%',
            marginRight: '18px'
        };
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
            imitateFirst = image(this.state.images[this.state.images.length - 1], 99);
            imitateLast = image(this.state.images[0], 100)
        }

        let dot = (_, index) => {
            let active = index + 1 == this.state.index;
            return <div className={active ? "dot active" : "dot"} style={this.getDotStyle(active)} key={index}></div>
        };

        return (
            <div className={this.props.className + " global-banner-group"} style={style}>
                <div style={{
                    width: this.state.width * (this.state.images.length + 2),
                    position: 'absolute',
                    height: '100%',
                    left: this.state.left
                }}
                     onTouchStart={this.touchStartHandler}
                     onTouchMove={this.touchMoveHandler}
                     onTouchEnd={this.touchEndHandler}
                >
                    {imitateFirst}
                    {this.state.images.map(image)}
                    {imitateLast}
                </div>
                <div className="dots" style={{
                    position: 'absolute',
                    bottom: '0',
                    height: '30px',
                    width: '100%',
                    textAlign: 'center'
                }}>
                    {this.state.images.map(dot)}
                </div>
            </div>
        )
    }
});