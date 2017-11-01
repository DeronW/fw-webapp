import React from 'react'
import CSSModules from 'react-css-modules'

import styles from '../css/components/turntable.css'


/* props:
    amountMin       | !number
    amountMax       | !number
    loanStatus      | !string
    changeHandler   | !function
*/
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Turntable extends React.Component {

    //       r       gap     h
    // ----------->|<--->|<----->|
    _MEASURE = {
        r: 222,
        gap: 15,
        h: 36,
        R: 222 + 15 + 36, // r + gap + h
        cnt: 65,
        ang: 256,
        deltaAng: 256 / (65 - 1), // ang / (cnt - 1)
        colorNode: [
            [255, 194, 63],
            [249, 78, 148],
            [124, 99, 235]
        ],
        loanStep: 500,
    }

    _introStartTime = null;

    state = {
        glowingCnt: -1,
        introAnimationFinished: false,
        touchStartFlag: false,
    }

    componentDidMount() {
        setTimeout(() => {
            window.requestAnimationFrame(this.introAnimate(2))
        }, 300)

        document.querySelector("body").addEventListener("touchmove", function(e) {
            if (e.target.className.indexOf('turntable') > -1) e.preventDefault()
        }, false);
    }

    introAnimate = glowingStep => timestamp => {
        const { cnt } = this._MEASURE;

        if (!this._introStartTime) this._introStartTime = timestamp;

        this.setState({ glowingCnt: this.state.glowingCnt + glowingStep }, () => {
            if (this.state.glowingCnt < cnt && this.state.glowingCnt > -1) {
                window.requestAnimationFrame(this.introAnimate(glowingStep));
            } else {
                this._introStartTime = null;
                if (glowingStep > 0) {
                    setTimeout(() => {
                        window.requestAnimationFrame(this.introAnimate(-1));
                    }, 400)
                } else {
                    this.setState({ introAnimationFinished: true })
                }
            }
        })
    }

    getTouchInfo = (touchX, touchY) => {
        const { ang, R } = this._MEASURE;

        const x = touchX,
            turntableTop = document.getElementById('turntable').getBoundingClientRect().top,
            turntableWidth = document.getElementById('turntable').getBoundingClientRect().width,
            y = touchY - turntableTop;

        let distance = Math.sqrt((R-y)*(R-y) + (x-turntableWidth/2)*(x-turntableWidth/2));
        let alpha;

        if (x > turntableWidth/2) {
            alpha = ang/2 + Math.acos((R-y)/distance)/Math.PI*180;
        } else {
            alpha = ang/2 - Math.acos((R-y)/distance)/Math.PI*180;
        }

        return { alpha: alpha, distance: distance }
    }

    isTouchWithinRange = (touchX, touchY) => {
        const { ang, R, h } = this._MEASURE,
            { touchStartFlag } = this.state;

        const tolerant = touchStartFlag ? [40, 200] : [40, 40]

        const { alpha, distance } = this.getTouchInfo(touchX, touchY);

        return alpha >= 0 && alpha <= ang && distance >= R-h-tolerant[1] && distance <= R+h+tolerant[0]
    }

    handleTouchStart = e => {
        const [ touchX, touchY ] = [ e.changedTouches[0].clientX, e.changedTouches[0].clientY ];

        if (!this.state.touchStartFlag && this.isTouchWithinRange(touchX, touchY) ) {
            this.setState({ touchStartFlag: true })
        }
    }

    handleTouchMove = e => {
        // if (!this.state.touchStartFlag && this.isTouchWithinRange(touchX, touchY) ) {
        //     this.setState({ touchStartFlag: true })
        // }
        if (!this.state.touchStartFlag || !this.state.introAnimationFinished) return

        const { ang, cnt } = this._MEASURE;

        const turntableRect = document.getElementById('turntable').getBoundingClientRect(),
             [ touchX, touchY ] = [ e.changedTouches[0].clientX, e.changedTouches[0].clientY ];

        // if (this.isTouchWithinRange(touchX, touchY)) {
            const { alpha } = this.getTouchInfo(touchX, touchY);
            this.setState({ glowingCnt: Math.min(cnt, Math.max(-1, Math.round(alpha/ang*cnt)))}, () => {
                this.props.changeHandler(this.calLoanAmount());
            })
        // } else {
        //     this.setState({ touchStartFlag: false })
        // }
    }

    handleTouchEnd = () => this.setState({ touchStartFlag: false })

    calLoanAmount = () => {
        const { loanStep } = this._MEASURE;

        let amount;

        const { cnt } = this._MEASURE,
            { introAnimationFinished, glowingCnt } = this.state,
            amountMax = Number(this.props.amountMax),
            amountMin = Number(this.props.amountMin);

        if (!introAnimationFinished) {
            amount = amountMax;
        } else (
            amount = amountMin + Math.max(0, Math.round(glowingCnt/cnt*(amountMax-amountMin)/loanStep)*loanStep)
        )

        return amount
    }

    _genStickColor = index => {
        const { cnt, colorNode } = this._MEASURE;

        const gradientCnt = Math.floor(cnt / 2);

        let color = Array(3);

        if (index < cnt / 2 ) {
            for (let i = 0; i < color.length; i++) {
                color[i] = Math.round(index*(colorNode[1][i] - colorNode[0][i])/gradientCnt + colorNode[0][i])
            }
        } else {
            for (let i = 0; i < color.length; i++) {
                color[i] = Math.round((index-gradientCnt+1)*(colorNode[2][i] - colorNode[1][i])/gradientCnt + colorNode[1][i])
            }
        }

        return color
    }

    _genStickGrp = () => {
        const { h, R, cnt, ang, deltaAng } = this._MEASURE,
            { glowingCnt } = this.state;

        let stickGrp = [];

        for (let i = 0; i < cnt; i++) {

            const rotateDeg = i * deltaAng - ang / 2,
                color = this._genStickColor(i);

            const style = {
                height: `${h}px`,
                transformOrigin: `0 ${R}px`,
                transform: `rotate(${rotateDeg}deg)`,
                backgroundColor: i > glowingCnt ? '#ececec' : `rgb(${color[0]}, ${color[1]}, ${color[2]})`
            };

            stickGrp.push(<div key={`stick-${i}`} style={style} styleName="stick"></div>)
        }

        return stickGrp
    }

    render() {
        const { r, gap, h, R, cnt, ang, deltaAng } = this._MEASURE;

        const { glowingCnt, introAnimationFinished } = this.state;

        const style = {
            turntable: {
                paddingTop: `${h + gap}px`,
            },
            amountDisk: {
                width: `${r*2}px`,
                height: `${r*2}px`,
            },
            glowingTail: {
                top: `-6px`,
                transformOrigin: `194px ${r + 6}px`,
                transform: `rotate(${-ang/2 + 1.5 + Math.min(cnt-1, glowingCnt)*deltaAng}deg)`, // 1.5 for offset
                opacity: `${Math.max(0, glowingCnt)/10}`
            },
        }

        return <div>
            <div id="turntable" styleName="turntable" style={style.turntable}
                onTouchStart={this.handleTouchStart}
                onTouchMove={this.handleTouchMove}
                onTouchEnd={this.handleTouchEnd}>
                <div styleName="stick-grp">
                    { this._genStickGrp() }
                </div>
                <div styleName="amount-disk" style={style.amountDisk}>
                    <div styleName="loan-amount">{this.calLoanAmount()}</div>
                    <div styleName="loan-amount-tip">最大借款额度(元)</div>
                    <div styleName="glowing-tail" style={style.glowingTail}></div>
                </div>
            </div>
        </div>
    }
}

export default Turntable