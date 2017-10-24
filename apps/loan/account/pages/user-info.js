import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import { showToast } from 'fw-components'

import { Header, CitySelector } from '../../lib/components'

import styles from '../css/user-info.css'


const TAB_MODEL = {
    // 基本信息
    realName: {
        name: '姓名',
        placeholder: '未实名',
        disabled: true,
    },
    idCard: {
        name: '身份证号',
        placeholder: '未实名',
        disabled: true,
    },
    creditCard: {
        name: '信用卡',
        type: 'number',
    },
    email: {
        name: '邮箱',
        type: 'email',
    },
    city: {
        name: '所在城市',
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
        field           | ! string,
        value           | ! string,
        changeHandler   | ! function
    */

    _MODEL = TAB_MODEL[this.props.field]

    handleChange = e => this.props.changeHandler(this.props.field, e.target.value)

    render() {
        const { field, value } = this.props,
            { name, type, placeholder, disabled } = this._MODEL;
        return <div styleName="item">
            <div styleName="item-name">{name}</div>
            <input styleName="item-value"
                type={type || "text"}
                disabled={!!disabled}
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
        field           | ! string,
        value           | ! string,
        changeHandler   | ! function
    */

    _MODEL = TAB_MODEL[this.props.field];

    _OPTIONS_CNT = this._MODEL.options ? Object.keys(this._MODEL.options).length : null;

    state = {
        expandFlag: this.props.field != 'city',
        expandIconDeg: 45,
        optionsContainerHeight: 0,
        optionsOpacity: 0
    }

    _animationExpandIcon = () => {
        const frame = 60,
            initialDeg = this.state.expandIconDeg,
            deltaSign = (90 - initialDeg) / 45; // either 1 (to expand) or -1 (to fold)

        const interval = setInterval(() => {
            this.setState({ expandIconDeg: this.state.expandIconDeg + deltaSign * 10 }, () => {
                if (this.state.expandIconDeg == initialDeg + 90 * deltaSign) {
                    clearInterval(interval);
                }
            })
        }, 1000 / frame)
    }

    _animationoptionsContainerHeight = () => {
        const frame = 60,
            optionsContainerHeightTotal = 90 * this._OPTIONS_CNT,
            initialHeight = this.state.optionsContainerHeight,
            deltaSign = initialHeight == 0 ? 1 : -1; // either 1 (to grow) or -1 (to pinch)

        const interval = setInterval(() => {
            this.setState({ optionsContainerHeight: this.state.optionsContainerHeight + deltaSign * optionsContainerHeightTotal / 9 }, () => {
                if (this.state.optionsContainerHeight == optionsContainerHeightTotal || this.state.optionsContainerHeight == 0) {
                    clearInterval(interval);
                }
            })
        }, 1000 / frame)
    }

    _animationOptionsOpacity = () => {
        const initialOpacity = this.state.optionsOpacity;

        if (initialOpacity == 100 ) {
            this.setState({ optionsOpacity: 0 })
        } else {
            const frame = 60,
                delta = 10,
                timeout = 100;
            setTimeout(() => {
                const interval = setInterval(() => {
                    const { optionsOpacity } = this.state;
                    this.setState({ optionsOpacity: optionsOpacity + delta }, () => {
                        if (this.state.optionsOpacity == 100 || this.state.optionsOpacity == 0) {
                            clearInterval(interval)
                        }
                    })
                }, 1000 / frame)
            }, timeout)
        }
    }

    toggleExpand = () => {
        const { expandFlag } = this.state;

        if (this.props.field == 'city') {
            this.setState({ expandFlag: !expandFlag })
        } else {
            this._animationExpandIcon();
            this._animationoptionsContainerHeight();
            this._animationOptionsOpacity();
        }
    }

    handleChange = v => {
        this.props.changeHandler(this.props.field, v)
        this.toggleExpand();
    }

    _genOptions = optValue => {
        const { field, value } = this.props,
            { options } = this._MODEL,
            optName = options[optValue];
        return <div key={optName}
            style={{ opacity: this.state.optionsOpacity / 100 }}
            styleName={value == optValue ? "selected-option" : "option"}
            onClick={() => this.handleChange(optValue)}>
            {optName}
        </div>
    }

    render() {

        const { field, value } = this.props,
            { name, options } = this._MODEL;

        const { expandFlag, expandIconDeg, optionsContainerHeight } = this.state;

        const selectOptionsContainerStyle = {
                height: optionsContainerHeight
            },
            expandIconStyle = {
                WebkitTransform: `rotate(${expandIconDeg}deg)`,
                transform: `rotate(${expandIconDeg}deg)`
            };

        const selectOptions = field == 'city' ? (
            <CitySelector selected={value} changeHandler={v => this.handleChange(v)} closeHandler={this.toggleExpand} />
        ) : (
            <div style={selectOptionsContainerStyle} styleName="select-options-container">
                <div styleName="select-options">
                    { Object.keys(options).map(this._genOptions) }
                </div>
            </div> )

        const selectedValue = field == 'city' ? value : options[value];

        return <div styleName="item-container">
            <div styleName="item">
                <div styleName="item-name">{name}</div>
                <div styleName="expand-icon" onClick={this.toggleExpand}>
                    <i style={expandIconStyle} styleName="fake-arrow"></i>
                </div>
                <div style={{ color: selectedValue ? '#333' : '#999' }}
                    styleName="item-value"
                    onClick={this.toggleExpand}>
                    {selectedValue || '请选择'}
                </div>
            </div>
            { expandFlag && selectOptions }
        </div>
    }
}


@inject('user_info')
@observer
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class UserInfo extends React.Component {

    state = {
        currentTab: '1',
        showSubmitBtn: false
    }

    componentDidMount() {
        document.title = '个人信息';
        this.props.user_info.fetchUserInfo();
    }

    componentWillUnmount() {
        if (this.state.showSubmitBtn) this.props.user_info.setDataFromCache();
    }

    switchTab = tab => () => {
        if (this.state.showSubmitBtn) return showToast('请先提交当前页信息!')
        this.setState({ currentTab: tab })
    }

    enableSubmitBtn = () => this.setState({ showSubmitBtn: true })

    disableSubmitBtn = () => this.setState({ showSubmitBtn: false })

    handleChange = (field, v) => {
        const { user_info } = this.props;
        user_info.inputHandler(field, v);
        this.enableSubmitBtn();
    }

    handleSubmit = () => {
        this.props.user_info.submitUserInfo().then(() => {
            showToast('信息已提交');
            this.disableSubmitBtn();
        }, e => {
            showToast(e.message);
        })
    }

    render() {

        const { history, user_info } = this.props;
        const { currentTab, showSubmitBtn } = this.state;

        const genInfoItem = field => {
            const value = user_info.data[field];
            if (TAB_MODEL[field].options || field == 'city') return <SelectItem key={field} field={field} value={value} changeHandler={this.handleChange} />
            if (!TAB_MODEL[field].options) return <InputItem key={field} field={field} value={value} changeHandler={this.handleChange} />
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
                    { ['city', 'address'].map(genInfoItem) }
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

            { showSubmitBtn && <div styleName="submit-btn" onClick={this.handleSubmit}>提交</div> }

        </div>
    }

}

export default UserInfo