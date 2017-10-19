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
        field           | !string,
        value           | !string,
        changeHandler   | !function
    */

    _MODEL = TAB_MODEL[this.props.field]

    handleChange = e => this.props.changeHandler(this.props.field, e.target.value)

    render() {
        const { field, value } = this.props,
            { name, type, placeholder } = this._MODEL;
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
        field           | !string,
        value           | !string,
        changeHandler   | !function
    */

    _MODEL = TAB_MODEL[this.props.field]

    state = { expandOptions: false, expandIconDeg: 45, optionsHeight: 0, optionOpacity: 0 }

    toggleExpand = () => {
        const { expandOptions } = this.state;


        if (this.props.field != 'city') {
            if (expandOptions) {
                const interval1 = setInterval(() => {
                    const { expandOptions, expandIconDeg } = this.state;
                    this.setState({ expandIconDeg: expandIconDeg - 10 }, () => {
                        if (this.state.expandIconDeg == 45 || this.state.expandIconDeg == 135) {
                            clearInterval(interval1);
                            this.setState({ expandOptions: !expandOptions })
                        }
                    })
                }, 17)
                const interval2 = setInterval(() => {
                    const { optionsHeight } = this.state,
                        optionsHeightTotal = 90 * Object.keys(this._MODEL.options).length;
                    this.setState({ optionsHeight: optionsHeight - optionsHeightTotal / 9 }, () => {
                        if (this.state.optionsHeight == optionsHeightTotal || this.state.optionsHeight == 0) clearInterval(interval2)
                    })
                }, 17)
                // setTimeout(() => {
                    const interval3 = setInterval(() => {
                        const { optionOpacity } = this.state;
                        this.setState({ optionOpacity: optionOpacity - 100 / 2 }, () => {
                            if (this.state.optionOpacity == 100 || this.state.optionOpacity == 0) clearInterval(interval3)
                        })
                    }, 10)
                // }, 100)
            } else {
                this.setState({ expandOptions: !expandOptions }, () => {
                    if (this.props.field != 'city') {
                        const interval1 = setInterval(() => {
                            const { expandOptions, expandIconDeg } = this.state;
                            this.setState({ expandIconDeg: expandOptions ? (expandIconDeg + 10) : (expandIconDeg - 10) }, () => {
                                if (this.state.expandIconDeg == 45 || this.state.expandIconDeg == 135) clearInterval(interval1)
                            })
                        }, 17)
                        const interval2 = setInterval(() => {
                            const { expandOptions, optionsHeight } = this.state,
                                optionsHeightTotal = 90 * Object.keys(this._MODEL.options).length;
                            this.setState({ optionsHeight: expandOptions ? (optionsHeight + optionsHeightTotal / 9) : (optionsHeight - optionsHeightTotal / 9) }, () => {
                                if (this.state.optionsHeight == optionsHeightTotal || this.state.optionsHeight == 0) clearInterval(interval2)
                            })
                        }, 17)
                        setTimeout(() => {
                            const interval3 = setInterval(() => {
                                const { optionOpacity } = this.state;
                                this.setState({ optionOpacity: optionOpacity + 100 / 10 }, () => {
                                    if (this.state.optionOpacity == 100 || this.state.optionOpacity == 0) clearInterval(interval3)
                                })
                            }, 20)
                        }, 100)
                    }
                })
            }
        } else {
            this.setState({ expandOptions: !expandOptions })
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
            style={{ opacity: this.state.optionOpacity / 100 }}
            styleName={value == optValue ? "selected-option" : "option"}
            onClick={() => this.handleChange(optValue)}>
            {optName}
        </div>
    }

    render() {

        const { field, value } = this.props,
            { name, options } = this._MODEL;

        const { expandOptions, expandIconDeg, optionsHeight } = this.state;

        const selectOptionsContainerStyle = {
            height: optionsHeight
        }

        const selectOptions = field == 'city' ? (
            <CitySelector selected={value} changeHandler={v => this.handleChange(v)} closeHandler={this.toggleExpand} />
        ) : (
            <div style={selectOptionsContainerStyle} styleName="select-options-container">
                <div styleName="select-options">
                    { Object.keys(options).map(this._genOptions) }
                </div>
            </div> )

        const selectedValue = field == 'city' ? value : options[value];

        const expandIconStyle = {
            WebkitTransform: `rotate(${expandIconDeg}deg)`,
            transform: `rotate(${expandIconDeg}deg)`
        }

        return <div>
            <div styleName="item">
                <div styleName="item-name">{name}</div>
                <div styleName="expand-icon" onClick={this.toggleExpand}>
                    <i style={expandIconStyle} styleName="fake-arrow"></i>
                </div>
                <div style={{ color: value ? '#333' : '#999' }}
                    styleName="item-value"
                    onClick={this.toggleExpand}>
                    {selectedValue || '请选择'}
                </div>
            </div>
            { expandOptions && selectOptions }
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
        document.title = '个人信息'
    }

    switchTab = tab => () => this.setState({ currentTab: tab })

    enableSubmitBtn = () => this.setState({ showSubmitBtn: true })

    disableSubmitBtn = () => this.setState({ showSubmitBtn: false })

    changeHandler = (field, v) => {
        const { user_info } = this.props;
        user_info.inputHandler(field, v);
        this.enableSubmitBtn();
    }

    render() {

        const { history, user_info } = this.props;
        const { currentTab, showSubmitBtn } = this.state;

        const genInfoItem = field => {
            const value = user_info.data[field];
            if (TAB_MODEL[field].options || field == 'city') return <SelectItem key={field} field={field} value={value} changeHandler={this.changeHandler} />
            if (!TAB_MODEL[field].options) return <InputItem key={field} field={field} value={value} changeHandler={this.changeHandler} />
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

            { showSubmitBtn && <div styleName="submit-btn" onClick={user_info.submitUserInfo}>提交</div> }

        </div>
    }

}

export default UserInfo