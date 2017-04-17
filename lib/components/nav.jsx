/*
 A 包装了 <a></a>
 */
(function () {

    class Nav extends React.Component {
        constructor(props) {
            super(props)
            this.tap_handler = props.onTouchStart
            this.state = {
                waves: []
            }
        }
        tapHandler = (event) => {
            let p0 = event.currentTarget, p1 = event.changedTouches[0]
            let waves = this.state.waves
            waves.push({
                left: p1.pageX - p0.offsetLeft,
                top: p1.pageY - p0.offsetTop
            })
            this.setState({ waves: waves })
            this.tap_handler && this.tap_handler()
        }
        render() {
            let { wave } = this.state
            let style = Object.assign({},
                {display: 'block', position: 'relative', overflow: 'hidden' },
                this.props.style);

            return <a {...this.props} style={style} onTouchStart={this.tapHandler} >
                {this.state.waves.map((i, index) =>
                    <Wave top={i.top} left={i.left} key={index} />)}
                {this.props.children}
            </a>
        }
    }

    class Wave extends React.Component {
        constructor() {
            super()
            this.state = {
                opacity: 1,
                scale: 1,
                dead: false
            }
        }
        componentDidMount() {
            setTimeout(() => this.setState({ scale: 3}), 30)
            setTimeout(() => this.setState({ opacity: 0 }), 200)
            setTimeout(() => this.setState({ dead: true }), 400)
        }
        render() {
            let { props } = this, radius = 80
            let style = {
                position: 'absolute',
                top: props.top - radius / 2,
                left: props.left - radius / 2,
                width: radius,
                height: radius,
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.15)',
                transition: 'all 400ms ease-out',
                transform: `scale(${this.state.scale})`,
                opacity: this.state.opacity
            }

            return this.state.dead ? null : <div style={style}></div>
        }
    }

    window.Nav = Nav;
})()
