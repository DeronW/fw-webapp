import React from 'react'
import CSSModules from 'react-css-modules'

import { Browser } from '../../lib/helpers'
import { Header } from '../../lib/components'

import styles from '../css/mortgage-success.css'


function gotoHandler(link) {
    if (link.indexOf('://') < 0) link = location.protocol + '//' + location.hostname + link;
    location.href = encodeURI(link);
}

const MortgageSuccess = CSSModules(props => (
    <div>
        <Header title="房产抵押贷款" history={props.history} />
        <div styleName="success-mask">
            {!Browser.inWeixin && !Browser.inApp &&
                <div styleName="close-icon" onClick={() => { gotoHandler('/static/loan/products/index.html#/') }}></div>
            }
            <div styleName="success-container">
                <div styleName="success-tip-1">您已成功申请</div>
                <img src={require('../images/mortgage-success/success.png')}></img>
                <div styleName="success-tip-2">审核专员预计在<span>1个工作日内</span>联系您</div>
            </div>
        </div>
    </div>
), styles)

export default MortgageSuccess
