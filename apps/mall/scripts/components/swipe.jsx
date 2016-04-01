'use strict';
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
    if (val === null || val === undefined) {
        throw new TypeError('Object.assign cannot be called with null or undefined');
    }
    return Object(val);
}

function objectAssign(target, source) {
    var from;
    var to = toObject(target);
    var symbols;

    for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);

        for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
                to[key] = from[key];
            }
        }

        if (Object.getOwnPropertySymbols) {
            symbols = Object.getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
                if (propIsEnumerable.call(from, symbols[i])) {
                    to[symbols[i]] = from[symbols[i]];
                }
            }
        }
    }

    return to;
};

var styles = {
    container: {
        overflow: 'hidden',
        visibility: 'hidden',
        position: 'relative'
    },

    wrapper: {
        overflow: 'hidden',
        position: 'relative'
    },

    child: {
        float: 'left',
        width: '100%',
        position: 'relative',
        transitionProperty: 'transform'
    }
};

const ReactSwipe = React.createClass({
    displayName: 'ReactSwipe',

    // https://github.com/thebird/Swipe#config-options
    propTypes: {
        startSlide: React.PropTypes.number,
        slideToIndex: React.PropTypes.number,
        shouldUpdate: React.PropTypes.func,
        speed: React.PropTypes.number,
        auto: React.PropTypes.number,
        continuous: React.PropTypes.bool,
        disableScroll: React.PropTypes.bool,
        stopPropagation: React.PropTypes.bool,
        callback: React.PropTypes.func,
        transitionEnd: React.PropTypes.func,
        containerStyles: React.PropTypes.object,
        wrapperStyles: React.PropTypes.object,
        reinitSwipeOnUpdate: React.PropTypes.bool
    },

    componentDidMount: function () {
        this.swipe = Swipe(ReactDOM.findDOMNode(this), objectAssign({}, this.props));
    },

    componentWillUnmount: function () {
        this.swipe.kill();
        delete this.swipe;
    },

    shouldComponentUpdate: function () {
        return false;
    },

    render: function () {
        return React.createElement('div', React.__spread({}, {
                style: objectAssign({}, styles.container, this.props.containerStyles),
                className: this.props.containerClassName
            }, this.props),
            React.createElement('div', {
                style: objectAssign({}, styles.wrapper, this.props.wrapperStyles),
                className: this.props.wrapperClassName
            }, React.Children.map(this.props.children, function (child) {
                return React.cloneElement(child, {
                    style: styles.child
                });
            }))
        );
    },

    next: function () {
        this.swipe.next();
    },

    prev: function () {
        this.swipe.prev();
    }
});


'use strict';

var Carousel = React.createClass({
    getInitialState: function () {
        return {cur_index: 0}
    },

    changeCurrentIndex: function (index) {
        this.setState({cur_index: index})
    },

    render: function () {
        return (
            <div className="banner-carousel">
                <ReactSwipe wrapperClassName={'wrap'} auto={3000} speed={1000} callback={this.changeCurrentIndex}>
                    <div>'PANE 1'</div>
                    <div>'PANE 2'</div>
                    <div>'PANE 3'</div>
                    <div>'PANE 3'</div>
                </ReactSwipe>

                <div className="points">
                    <div className={this.state.cur_index == 0 ? "on" : ''}></div>
                    <div className={this.state.cur_index == 1 ? "on" : ''}></div>
                    <div className={this.state.cur_index == 2 ? "on" : ''}></div>
                    <div className={this.state.cur_index == 3 ? "on" : ''}></div>
                </div>
            </div>
        );
    }
});

ReactDOM.render(<Carousel />, document.getElementById('cnt'));