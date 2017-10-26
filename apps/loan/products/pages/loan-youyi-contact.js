import React from 'react'
import {render} from 'react-dom'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Components} from 'fw-javascripts'
import {Header} from '../../lib/components'
import {Storage, NativeBridge, Browser} from '../../lib/helpers'

import styles from '../css/loan-youyi-contact.css'

const relationships = {
    '0': '父母',
    '1': '配偶',
    '2': '子女',
    '3': '兄弟姐妹',
    '4': '同事',
    '5': '同学',
    '6': '朋友'
}

@inject('contact')
@observer
@CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})
export default class LoopLoanContact extends React.Component {
    state = {
        deletePhoneShow1: false,
        deleteNameShow1: false,
        inputPhoneValue1: "",
        inputNameValue1: "",
        deletePhoneShow2: false,
        deleteNameShow2: false,
        inputPhoneValue2: "",
        inputNameValue2: "",
        value: "",
        value2: "",
        popShow: false,
        pop2Show: false
    }
    componentDidMount() {}
    handleChange = (index) => {
        this.setState({value: index, popShow: false});

    }
    handleChange2 = (index) => {
        this.setState({value2: index, pop2Show: false});

    }

    genOptions = optKey => {
        let {history} = this.props;
        let {value} = this.state;
        let optName = relationships[optKey];
        return <div key={optName} styleName={value == optKey
            ? 'selected-option'
            : 'unselected-option'} onClick={() => this.handleChange(optKey)}>
            {optName}
        </div>
    }
    genOptions2 = optKey => {
        let {history} = this.props;
        let {value2} = this.state;
        let optName = relationships[optKey];
        return <div key={optName} styleName={value2 == optKey
            ? 'selected-option'
            : 'unselected-option'} onClick={() => this.handleChange2(optKey)}>
            {optName}
        </div>
    }
    inputPhoneHandler1 = e => {
        let v = parseInt(e.target.value) || '';
        v = String(v).substr(0, 11)
        this.setState({inputPhoneValue1: v})
        if (this.state.inputPhoneValue1) {
            this.setState({deletePhoneShow1: true})
        }
    }
    inputNameHandler1 = e => {
        this.setState({inputNameValue1: e.target.value})
        if (this.state.inputNameValue1) {
            this.setState({deleteNameShow1: true})
        }
    }
    clearPhone1 = () => {
        this.setState({deletePhoneShow1: false, inputPhoneValue1: ""});
    }
    clearName1 = () => {
        this.setState({deleteNameShow1: false, inputNameValue1: ""});
    }
    inputPhoneHandler2 = e => {
        let v = parseInt(e.target.value) || '';
        v = String(v).substr(0, 11)
        this.setState({inputPhoneValue2: v})
        if (this.state.inputPhoneValue2) {
            this.setState({deletePhoneShow2: true})
        }
    }
    inputNameHandler2 = e => {
        this.setState({inputNameValue2: e.target.value})
        if (this.state.inputNameValue2) {
            this.setState({deleteNameShow2: true})
        }
    }
    clearPhone2 = () => {
        this.setState({deletePhoneShow2: false, inputPhoneValue2: ""});
    }
    clearName2 = () => {
        this.setState({deleteNameShow2: false, inputNameValue2: ""});
    }
    choose1 = () => {
        let {contact} = this.props;
        this.setState({popShow: true})

    }
    choose2 = () => {
        let {contact} = this.props;
        this.setState({pop2Show: true})
    }
    render() {
        let {history} = this.props;
        let {
            inputPhoneValue1,
            inputNameValue1,
            deletePhoneShow1,
            deleteNameShow1,
            inputPhoneValue2,
            inputNameValue2,
            deletePhoneShow2,
            deleteNameShow2,
            popShow,
            pop2Show,
            value,
            value2
        } = this.state;

        const selectOptions = <div styleName="option-grp">
            {Object.keys(relationships).map(this.genOptions)}
        </div>
        const selectOptions2 = <div styleName="option-grp">
            {Object.keys(relationships).map(this.genOptions2)}
        </div>
        const selectPop = <div>
            <div styleName="modal"></div>
            <div styleName="pop-content">
                <div styleName="select-label">选择联系人关系</div>
                {selectOptions}
            </div>

        </div>
        const selectPop2 = <div>
            <div styleName="modal"></div>
            <div styleName="pop-content">
                <div styleName="select-label">选择联系人关系</div>
                {selectOptions2}
            </div>

        </div>
        return <div styleName="bg">
            <Header title="亲密联系人" history={history}/>
            <div styleName="content">
                <div styleName="contact-item">
                    <span styleName="title">亲密联系人1</span>
                    <div styleName="sub-cover">
                        <div styleName="item-detail">
                            <div styleName="text">手机号</div>
                            <input type="text" placeholder="输入手机号" styleName="input" onChange={this.inputPhoneHandler1} value={inputPhoneValue1}/> {inputPhoneValue1 && <b styleName="delete" onClick={this.clearPhone1}>&times;</b>}
                        </div>
                        <div styleName="item-detail">
                            <div styleName="text">姓名</div>
                            <input type="text" placeholder="输入姓名" styleName="input" onChange={this.inputNameHandler1} value={inputNameValue1}/> {inputNameValue1 && <b styleName="delete" onClick={this.clearName1}>&times;</b>}
                        </div>
                        <div styleName="item-select">
                            <div styleName="text">关系</div>
                            {!value && <span styleName="s-text">选择关系</span>}
                            {value && <span styleName="c-text">{relationships[value]}</span>}
                            <img styleName="arrow" src={require("../images/loan-youyi-contact/entry.png")} onClick={this.choose1}/>
                        </div>
                    </div>
                </div>

                <div styleName="contact-item">
                    <span styleName="title">亲密联系人2</span>
                    <div styleName="sub-cover">
                        <div styleName="item-detail">
                            <div styleName="text">手机号</div>
                            <input type="text" placeholder="输入手机号" styleName="input" onChange={this.inputPhoneHandler2} value={inputPhoneValue2}/> {inputPhoneValue2 && <b styleName="delete" onClick={this.clearPhone2}>&times;</b>}
                        </div>
                        <div styleName="item-detail">
                            <div styleName="text">姓名</div>
                            <input type="text" placeholder="输入姓名" styleName="input" onChange={this.inputNameHandler2} value={inputNameValue2}/> {inputNameValue2 && <b styleName="delete" onClick={this.clearName2}>&times;</b>}
                        </div>
                        <div styleName="item-select">
                            <div styleName="text">关系</div>
                            {!value2 && <span styleName="s-text">选择关系</span>}
                            {value2 && <span styleName="c-text">{relationships[value2]}</span>}
                            <img styleName="arrow" src={require("../images/loan-youyi-contact/entry.png")} onClick={this.choose2}/>
                        </div>
                    </div>
                </div>
            </div>

            {<div styleName="submit-btn-container">
                <a styleName="submit-btn">确定</a>
        </div>}
            {/* {inputPhoneValue1&&inputPhoneValue2&&inputNameValue1&&inputNameValue2&&relationships[value1]&&relationships[value2]<div styleName="heghlight-submit-btn-container">
                <a styleName="submit-btn">确定</a>
        </div>} */}
            {popShow && selectPop}
            {pop2Show && selectPop2}

        </div>
    }
}
