import React from 'react'
import CSSModules from 'react-css-modules'

import { Header } from '../../lib/components'

import styles from '../css/identification-result.css'


@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class IdentificationResult extends React.Component {

    state = {
        result: 'success', // 'success', 'fail'
        imgData: '' // 活体检测生成的最佳照片
    }

    render() {
        const { history } = this.props,
            { result } = this.state;

        return <div styleName={result}>
            <Header title="人脸识别" history={history}/>
            <div styleName="result">
                <div styleName="tip">
                    <i></i>
                    { result === 'success' ? "认证成功" : "认证失败" }
                </div>
                <div styleName="id-img">
                    <img src={require('../images/identification-result/success-bg.png')} />
                </div>
            </div>
            <div styleName="exit-btn">{ result === 'success' ? '完成身份认证' : '重新进行身份认证'}</div>
        </div>
    }

}

export default IdentificationResult
