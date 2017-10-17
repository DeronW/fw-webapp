import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import { showToast } from 'fw-components'

import { Header } from '../../lib/components'

import styles from '../css/user-info.css'


const TAB_MODEL = {
    // 基本信息
    realName: {
        name: '姓名',
        placeholder: '未实名',
    },
    idCard: {
        name: '身份证号',
        type: 'number',
        placeholder: '未实名',
    },
    creditCard: {
        name: '信用卡',
        type: 'number',
    },
    email: {
        name: '邮箱',
        type: 'email',
    },
    address: {
        name: '现居住地',
    },
    marriage: {
        name: '婚姻',
        options: {
            '1': '未婚',
            '2': '已婚，无子女',
            '3': '已婚，有子女'
        },
    },
    // 紧急联系人
    ecName: {
        name: '紧急联系人',
    },
    ecRelationship: {
        name: '联系人关系',
        options: {
            '0': '父母',
            '1': '配偶',
            '2': '子女',
            '3': '兄弟姐妹',
            '4': '同事',
            '5': '同学',
            '6': '朋友'
        },
    },
    ecPhone: {
        name: '联系人手机',
        type: 'tel',
    },
    // 工作信息
    income: {
        name: '税后月收入',
        options: {
            '0': '3000元以下',
            '1': '3000-5000元',
            '2': '5001-10000元',
            '3': '10001-20000元',
            '4': '20000元以上'
        },
    },
    workExperience: {
        name: '工作年限',
        options: {
            '0': '1年以下',
            '1': '1-5年',
            '2': '6-10年',
            '3': '10年以上'
        },
    },

}


@inject('user_info')
@observer
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class InputItem extends React.Component {
    /* props:
        field       | !string,
        name        | !string,
        type        | string,
        placeholder | string,
    */

    handleChange = e => {
        const { user_info, field } = this.props;
        user_info.inputHandler(field, e.target.value);
    }

    render() {
        const { user_info, field, name, type, placeholder } = this.props,
            value = user_info.data[field];
        return <div styleName="item">
            <div styleName="item-name">{name}</div>
            <input styleName="item-value"
                type={type || "text"}
                placeholder={placeholder || "请填写"}
                value={value}
                onChange={this.handleChange} />
        </div>
    }
}


@inject('user_info')
@observer
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class SelectItem extends React.Component {
    /* props:
        field       | !string,
        name        | !string,
        options     | !object,
        placeholder | string,
    */

    state = { expandOptions: false }

    toggleExpand = () => this.setState({ expandOptions: !this.state.expandOptions })

    handleChange = v => () => {
        const { user_info, field } = this.props;
        user_info.inputHandler(field, v);
        this.toggleExpand();
    }

    _genOptions = optValue => {
        const { user_info, field, options } = this.props,
            optName = options[optValue],
            value = user_info.data[field];
        return <div key={optName}
            styleName={value == optValue ? "selected-option" : "option"}
            onClick={this.handleChange(optValue)}>
            {optName}
        </div>
    }

    render() {

        const { user_info, field, name, options, placeholder } = this.props,
            value = user_info.data[field],
            valueName = options[value];

        const { expandOptions } = this.state;

        return <div>
            <div styleName="item">
                <div styleName="item-name">{name}</div>
                <i styleName="expand-icon"></i>
                <div style={{ color: value ? '#333' : '#999' }}
                    styleName="item-value"
                    onClick={this.toggleExpand}>
                    {valueName || '请选择'}
                </div>
            </div>
            { expandOptions && <div styleName="select-options">
                { Object.keys(options).map(this._genOptions) }
            </div> }
        </div>
    }
}


@inject('user_info')
@observer
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class UserInfo extends React.Component {

    state = {
        currentTab: '1'
    }

    componentDidMount() {
        document.title = '个人信息'
    }

    switchTab = tab => () => this.setState({ currentTab: tab })

    render() {

        const { history } = this.props;
        const { currentTab } = this.state;

        const genInfoItem = field => {
            const itemData = TAB_MODEL[field];
            if (itemData.options) return <SelectItem key={field} field={field} {...itemData} />
            if (!itemData.options) return <InputItem key={field} field={field} {...itemData} />
        }

        return <div styleName="bg">
            <Header title="个人信息" history={history} />

            <div styleName="tab-grp">
                <div key="1" onClick={this.switchTab('1')}
                    styleName={currentTab == '1' ? "tab-item-active" : "tab-item"}>
                    基本信息
                </div>
                <div key="2" onClick={this.switchTab('2')}
                    styleName={currentTab == '2' ? "tab-item-active" : "tab-item"}>
                    紧急联系人
                </div>
                <div key="3" onClick={this.switchTab('3')}
                    styleName={currentTab == '3' ? "tab-item-active" : "tab-item"}>
                    工作信息
                </div>
            </div>

            { currentTab == '1' && <div>
                <div styleName="item-grp">
                    { ['realName', 'idCard', 'creditCard', 'email'].map(genInfoItem) }
                </div>
                <div styleName="item-grp">
                    { ['address'].map(genInfoItem) }
                </div>
                <div styleName="item-grp">
                    { ['marriage'].map(genInfoItem) }
                </div>
            </div> }

            { currentTab == '2' && <div>
                <div styleName="item-grp">
                    { ['ecName', 'ecRelationship', 'ecPhone'].map(genInfoItem) }
                </div>
            </div> }

            { currentTab == '3' && <div>
                <div styleName="item-grp">
                    { ['income', 'workExperience'].map(genInfoItem) }
                </div>
            </div> }

        </div>
    }

}

export default UserInfo