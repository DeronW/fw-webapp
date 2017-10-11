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
        placeholder: '未实名',
    },
    creditCard: {
        name: '信用卡',
        inputType: 'number',
    },
    email: {
        name: '邮箱',
        inputType: 'email',
    },
    address: {
        name: '姓名',
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
        validator: v => {
            if (v.match(/\d/)) return showToast('联系人姓名不可包含数字!')
            if (v.length < 2) return showToast('联系人姓名字符长度需在2位以上!')
        },
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
        validator: v => {
            if (isPhoneNum(v)) return showToast('联系人手机格式不正确!')
        }
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


const isPhoneNum = str => /^1[3|4|5|7|8]\d{9}$/.test(String(str));


@inject('user_info')
@observer
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class InputInfoItem extends React.Component {
    /* props:
        name        | !string,
        type        | string,
        placeholder | string,
        validator   | function,
    */
    render() {
        const { user_info, name, type, placeholder, validator } = this.props;
        return <div styleName=""></div>
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

        const genInfoItem = name => {
            const itemData = TAB_MODEL[name];
            if (itemData.option) return <SelectInfoItem {...itemData} />
            if (!itemData.option) return <InputInfoItem {...itemData} />
        }

        return <div>
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

            {/* { currentTab == '1' && <div>
                <div styleName="info-item-grp">
                    { ['name', 'idCard', 'creditCard', 'email'].map(genInfoItem) }
                </div>
                <div styleName="info-item-grp">
                    { ['city', 'address'].map(genInfoItem) }
                </div>
                <div styleName="info-item-grp">
                    { ['marriage'].map(genInfoItem) }
                </div>
            </div> }

            { currentTab == '2' && <div>
                <div styleName="info-item-grp">
                    { ['ecName', 'ecRelationship', 'ecPhone'].map(genInfoItem) }
                </div>
            </div> }

            { currentTab == '3' && <div>
                { ['income', 'workExperience'].map(genInfoItem) }
            </div> } */}

        </div>
    }

}

export default UserInfo