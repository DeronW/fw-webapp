import React from 'react'
import { render } from 'react-dom'
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
// @inject('Contact')
@observer
@CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})
class SelectItem extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            value:"0"
        }
    }
    handleChange = (index,history) => {
        this.setState({value: index});

    }

    genOptions = optKey => {
        let {history} = this.props;
        let {value} = this.state;
            let optName = relationships[optKey];
        return <div key={optName}
            styleName={value == optKey ? 'selected-option' : 'unselected-option'}
            onClick={() => this.handleChange(optKey,history)}>
            {optName}
        </div>
    }
    render(){
        let {history} = this.props;
        let relations_array = [];

        const selectOptions = <div styleName="option-grp">
                    { Object.keys(relationships).map(this.genOptions) }
                </div>
        return <div styleName="cover">
            <div styleName="self">
                <div styleName="select-label">选择联系人关系</div>
                {selectOptions}
            </div>
        </div>
    }
}

// @inject('Contact')
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
        selectShow:false
    }
    componentDidMount() {}
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
    choose = history => {
        // this.setState({selectShow:true})
        // history.push(`/loan-youyi-contact#1`)
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
            deleteNameShow2
        } = this.state;
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
                            <span styleName="s-text">选择关系</span>
                        <img styleName="arrow" src={require("../images/loan-youyi-contact/entry.png")} onClick={this.choose(history)}/>
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
                            <span styleName="s-text">选择关系</span>
                            <img styleName="arrow" src={require("../images/loan-youyi-contact/entry.png")} alt=""/>
                        </div>
                    </div>
                </div>
            </div>

            <div styleName="submit-btn-container">
                <a styleName="submit-btn">确定</a>
            </div>
            {<SelectItem history={history} />}

        </div>
    }
}
