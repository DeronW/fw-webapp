import React from 'react'
import CSSModules from 'react-css-modules'

import { Post } from '../helpers'

import styles from '../css/captcha.css'


@CSSModules(styles)
class Captcha extends React.Component {

    state = {
        imgUrl: '',
        token: '',
        inputStr: ''
    }

    componentDidMount() {
        this.getCaptcha();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.timeStamp !== this.props.timeStamp) this.getCaptcha();
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
        this.props.changeHandler(e.target.value, this.state.token);
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
                <div styleName="img-container" onClick={this.getCaptcha}>
                    <img src={imgUrl} />
                </div>
            </div>
        )
    }
}

export default Captcha
