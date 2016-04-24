;(function(){
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
}

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

window.ReactSwipe = React.createClass({
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

        let child = (element, index) => React.cloneElement(element, {style: styles.child});

        return (
            <div {...this.props} className={this.props.containerClassName}
                style={objectAssign({}, styles.container, this.props.containerStyles)} >
                <div className={this.props.wrapperStyles}
                    style={objectAssign({}, styles.wrapper, this.props.wrapperStyles)}>
                    {this.props.children.map(child)}
                </div>
            </div>
        )
    },

    next: function () {
        this.swipe.next();
    },

    prev: function () {
        this.swipe.prev();
    }
});

})();
