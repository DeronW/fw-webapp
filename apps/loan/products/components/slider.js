import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/components/slider.css'
import { observer, inject } from 'mobx-react'

@inject('fxh') @observer @CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Slider extends React.Component {

    constructor(props) {
        super(props)
        this.isDown = false
        this.width = 0
        this.offsetLeft = 0
        this.marginLeft = 0
        this.sliderWidth = 0
        this.touchMoveFn = null
        this.touchUpFn = null
        this.state={
            loanNum:(this.props.fxh.data.borrowBtnStatus == 1 || this.props.fxh.data.borrowBtnStatus == 101) ? 10000 : this.props.fxh.data.canBorrowAmount,
            show_tip:true
        }
    }
    // componentWillReceiveProps(nextProps) {
    //     this.setState({loanNum:nextProps.canBorrowAmount})
    // }
    componentDidMount() {
        const bar = this.refs.bar
        const selectedBar = this.refs.selectedBar
        const slider = this.refs.slider
        const style = getComputedStyle(bar)
        const sliderStyle = getComputedStyle(slider)
        const defaultValue = this.props.defaultValue || this.props.start || 0

        this.width = parseInt(style.width, 10)
        this.sliderWidth = parseInt(sliderStyle.width, 10)
        this.offsetLeft = this.getOffsetLeft(bar) + this.marginLeft
        slider.style.left = this.getTickValue(defaultValue) - parseInt(sliderStyle.width) / 2 + 'px'
        selectedBar.style.width = this.getTickValue(defaultValue) + 'px'

    }

    handletouchStart(event) {
        event.stopPropagation()
        this.isDown = true
        const BODY = document.body
        BODY.style.cursor = 'default'
        this.touchMoveFn = this.handletouchMove.bind(this)
        this.touchUpFn = this.handletouchEnd.bind(this)
        BODY.addEventListener('touchmove', this.touchMoveFn)
        BODY.addEventListener('touchend', this.touchUpFn)
    }

    handletouchMove(event) {
        const slider = this.refs.slider
        const selectedBar = this.refs.selectedBar
        const bar = this.refs.bar

        this.offsetLeft = this.getOffsetLeft(bar) + this.marginLeft
        if (this.isDown) {
            let left = event.touches[0].pageX - this.offsetLeft - this.sliderWidth / 4
            if (left <= 0) {
                left = 0
                selectedBar.style.width = left + 'px'
            } else if (left >= (this.width - this.sliderWidth / 2)) {
                left = this.width - this.sliderWidth / 2
                selectedBar.style.width = this.width + 'px'
            } else {
                selectedBar.style.width = left + 'px'
            }
            slider.style.left = left + 'px'
            let lowestLoanNum = this.props.lowestLoan;
            let canBorrowAmount = this.props.canBorrowAmount;
            let leftValue = parseInt(left);
            let loanNum = Math.round((lowestLoanNum + parseInt((canBorrowAmount - lowestLoanNum) * leftValue / 548)) / 100) * 100;
            this.setState({loanNum:loanNum},this.props.fxh.watchSliderNum(this.state.loanNum))
            if (loanNum != canBorrowAmount) {
                this.setState({ show_tip: false });
            } else {
                this.setState({ show_tip: true});
            }
        }
    }

    handletouchEnd() {
        const selectedBar = this.refs.selectedBar
        if (typeof selectedBar == 'undefined') {
            return
        }
        const BODY = document.body
        this.isDown = false
        BODY.removeEventListener('touchmove', this.touchMoveFn)
        BODY.removeEventListener('touchend', this.touchUpFn)
    }

    getOffsetLeft(el) {
        let left = 0
        let offsetParent = el
        while (offsetParent != null && offsetParent != document.body) {
            left += offsetParent.offsetLeft
            offsetParent = offsetParent.offsetParent
        }
        return left
    }

    getValue(currWidth) {
        const end = this.props.end
        const start = this.props.start || 0
        const v = Math.abs(end - start)
        const width = this.width
        const value = v * currWidth / width + start
        let digit = 0
        if (end <= 10) {
            digit = 1
        }
        return value.toFixed(digit)
    }

    getTickValue(value) {
        const end = this.props.end
        const start = this.props.start || 0
        const v = Math.abs(end) - Math.abs(start)
        v == 0 ? 1 : v
        const width = this.width
        return width / v * (value-start)
    }

    render() {
        return (
            <div ref="container" styleName="bfd-slider">
                <div ref="bar" styleName="bfd-slider__bar">
                    <div ref="slider" styleName="bfd-slider__slider" onTouchStart={this.handletouchStart.bind(this)}></div>
                    <div ref="selectedBar" styleName="bfd-slider__bar--selected"></div>
                </div>
                <div styleName="loan-num">{this.state.loanNum}</div>
                <div styleName="max-loan-title">{this.state.show_tip?"最高借款额度(元)":"借款额度(元)"}</div>
                <div styleName="start-point"></div>
                <div styleName="end-point"></div>
                <div styleName="start-point-num">{this.props.lowestLoan}</div>
                <div styleName="end-point-num">{this.props.canBorrowAmount}</div>
            </div>
        )
    }
}

export default Slider
