import React from 'react'
import CSSModules from 'react-css-modules'

import Post from '../helpers'

import styles from '../css/captcha.css'


@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Captcha extends React.Component {

    state = {
        imgUrl: '',
        token: '',
        inputStr: ''
    }

    componentDidMount() {
        this.getCaptcha();
    }

    getCaptcha = () => {
        Post('/api/userBase/v1/verifyNum.json').then(data => {
            this.setState({
                imgUrl: data.url,
                token: data.verifyToken
            })
        })
    }

    handleInput = (e) => {
        this.setState({ inputStr: e.target.value })
    }

    render() {
        let { imgUrl, inputStr } = this.state;
        return (
            <div styleName="container">
                <i styleName="icon"></i>
                <input styleName="input-field"
                    value={inputStr}
                    placeholder="请输入图形验证码"
                    onChange={this.handleInput} />
                <img styleName="img-btn" onClick={this.getCaptcha} src={imgUrl} />
            </div>
        )
    }
}

export default Captcha
