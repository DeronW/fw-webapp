import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'

import { BrowserFactory } from 'fw-javascripts'

import Header from '../components/header'

import styles from '../css/policy-quotation.css'

@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class PolicyQuotation extends React.Component {

    state = { selected: null }; // 人保2  太平洋1  平安0

    selectFirm = (firmNo) => {
        let selected = this.state.selected === firmNo ? null : firmNo;
        this.setState({ selected: selected });
    }

    submitHandler = () => {
        this.props.history.replace('/customer-info')
    }

    render() {
        let checkIconUrlDict = {
            unchecked: " url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAMAAABgOjJdAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABI1BMVEUAAADY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2Njf39/o6Ojy8vL4+Pj8/Pzi4uLw8PD////s7Ozd3d339/fe3t76+vrx8fHg4ODp6en09PT5+fn9/f3q6urh4eHj4+Pu7u7a2tr7+/vv7+/z8/Pr6+v19fX+/v4AAAA/aJiFAAAAQXRSTlMALnSt0+vv1C8GY9JH2wWR/pQKubpKB95oadc1enu13N3x8t/gt3+AOgFwceRUoMgQwwmipVfmWQzhAkCGvvzlQRTAwUoAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAABX0lEQVQ4y4WU51ICQRAGR4xgBAlmAbMiiDlrAwcs6AEqUYH3fwtRCw/x7uifO11TM1XzrYjBkGN4ZHRsdHzYMSEmOF2TGEy6nP3C1DQkkiktnU5rqWQCpqf+1Gdm58hklUE2A+6eNp55SKq/5GDe8zuCl/yT6kfL4+12cfOsq//oz7h/BB9oygwNfF+CP0BOmZMj4O8YC2SUFRkWO8YSBUujwJLIMkVlTZFlWaFkY5RYlTVebIwX1mSdVxtDJygh3myMN0ICyg6Q8IAeYdlAtzF0NmVrwC5bsk3ZxiizI7tUbIwKu7IXJGUppAjuiexTtTSqHHwdaYSahVAj8n2qh9TNF9brHP6cYZRiw0RoFIl2wxAj8b+LniD2G4ejOPX+Wd7rxI+MSB2fQPWjp/5RhVNPbyzl7BwqzVajrdqNVrMC5xf90b50XPVk/8pxafI/XN/c3kXuuX+4u328Np4/Ae7a77Vd7S9GAAAAAElFTkSuQmCC')",
            checked: " url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAiCAMAAADmrkDzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABblBMVEUAAABKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKofmUx/vj8P7S6P5rsvqn0fz////f7v6q0/zx+P+t1fyiz/xcqvq32v3G4f13uPpLofmx1vyp0vzQ5/37/f+Dv/u02P2m0fz2+/+GwPuhzvy62/39/v+JwvtMovmezfxPpPnK5P2NxPu+3f3+//+by/xOo/nH4v2SxvvB3/2XyfzE4P1Novn+/v+Rxvu73P2Lw/tLovmv1fz8/v/y+P+FwPtQpPkAAABsq3wqAAAAQnRSTlMAH2Sdw9viZSACU8H+Oc4Dgv0Gq7Cvh0JBBNcFYdEvd7LZ2vDz4bqEPj94DupfrA/SFs+xAWjvFO3uhQlRlfRSDBGtT3+6AAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAYxJREFUOMt9lFdXAjEQhUcRFKUpVqRYQJSiYAEVQQ2WWLFiV+wFe//5Jlmy7WS9L3Mz852cJDuzAIqqqk01Zou5xlRbBwJZ6xtsiMvWUG/VA3YH0sph19SdrkakV6PLqQBNbiSSu0neoRmJ1cJ3aUVGapWANpshYWunQIcHGcvTSQgv+k9eQvjEpfzc/AIJPgC/GFjEGC9R44eAEFgmAF6hLgBdImCVAniN2i7oZqn1wsamXN/aZsAOW/RAL4u7GBf3OLDPgANp1QtSPCSp4pEEFBhwzHeEIAsnNHl6RlyJWXzOgSCEWLy4ZMgVKl1Tc3MrHyoEfZK5u2fIQ5kBj8q1+iBccXdPmOsmr7p4GPq5fS5XgJdX9dMMgDXEvXQEehiVLKSjI/Kq9EaBd83rRsi3jcbk5cfn1/ePBohFaQvFVZnfkvYDxaU2FHc61WClk4cSBkBiiI9DclgIDCeVkYqKJmYkqh7L0bGUrp4aG9WNdjo8rqpPTKYF/4fMVNaRI9WcIzudAUPNzM7oMn9NEuT0NSkwNAAAAABJRU5ErkJggg==')"
        };
        return (
            <div styleName="fake-body">
                <Header title="保费报价" history={this.props.history} />

                <div styleName="quotation-container">
                    <div styleName="quotation-item">
                        <div styleName="check-box" style={{ background: `${this.state.selected === 2 ? checkIconUrlDict.checked : checkIconUrlDict.unchecked} #fff no-repeat center` }}
                            onClick={() => { this.selectFirm(2) }}></div>
                        <div styleName="quotation-entry">
                            <div styleName="firm-name renbao">人保车险</div>
                            <div styleName="price-container">
                                <div styleName="discount-price">￥3000.99</div>
                                <div styleName="origin-price">官网报价3999.00</div>
                                {/* <div styleName="discount-price">￥{discountPrice}</div>
                                <div styleName="origin-price">官网报价{originPrice}</div> */}
                            </div>
                        </div>
                    </div>
                    <div styleName="quotation-item">
                        <div styleName="check-box" style={{ background: `${this.state.selected === 1 ? checkIconUrlDict.checked : checkIconUrlDict.unchecked} #fff no-repeat center` }}
                            onClick={() => { this.selectFirm(1) }}></div>
                        <div styleName="quotation-entry">
                            <div styleName="firm-name taipingyang">太平洋车险</div>
                            <div styleName="price-container">
                                <div styleName="discount-price">￥3000.99</div>
                                <div styleName="origin-price">官网报价3999.00</div>
                                {/* <div styleName="discount-price">￥{discountPrice}</div>
                                <div styleName="origin-price">官网报价{originPrice}</div> */}
                            </div>
                        </div>
                    </div>
                    <div styleName="quotation-item">
                        <div styleName="check-box" style={{ background: `${this.state.selected === 0 ? checkIconUrlDict.checked : checkIconUrlDict.unchecked} #fff no-repeat center` }}
                            onClick={() => { this.selectFirm(0) }}></div>
                        <div styleName="quotation-entry">
                            <div styleName="firm-name pingan">平安车险</div>
                            <div styleName="price-container">
                                <div styleName="discount-price">￥3000.99</div>
                                <div styleName="origin-price">官网报价3999.00</div>
                                {/* <div styleName="discount-price">￥{discountPrice}</div>
                                <div styleName="origin-price">官网报价{originPrice}</div> */}
                            </div>
                        </div>
                    </div>
                </div>

                <a styleName="next-btn" onClick={this.submitHandler}>下一步</a>
            </div>
        )
    }
}

export default PolicyQuotation
