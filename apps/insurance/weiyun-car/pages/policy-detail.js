import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import Header from '../components/header'

import styles from '../css/policy-detail.css'


let model = {
    CheSun: {
        name: '车辆损失险',
        hasBujimian: true,
        options: [{
            name: '不投保',
            value: 0
        }, {
            name: '投保',
            value: 1
        }]
    },
    Sanzhe: {
        name: '第三者责任险',
        hasBujimian: true,
        options: [{
            name: '不投保',
            value: 0
        }, {
            name: '5万',
            value: 50000
        }, {
            name: '10万',
            value: 100000
        }, {
            name: '15万',
            value: 150000
        }, {
            name: '20万',
            value: 200000
        }, {
            name: '30万',
            value: 300000
        }, {
            name: '50万',
            value: 500000
        }, {
            name: '100万',
            value: 1000000
        }]
    },
    SiJi: {
        name: '司机座位险',
        hasBujimian: true,
        options: [{
            name: '不投保',
            value: 0
        }, {
            name: '1万',
            value: 10000
        }, {
            name: '2万',
            value: 20000
        }, {
            name: '3万',
            value: 30000
        }, {
            name: '4万',
            value: 40000
        }, {
            name: '5万',
            value: 50000
        }, {
            name: '10万',
            value: 100000
        }, {
            name: '20万',
            value: 200000
        }]
    },
    ChengKe: {
        name: '乘客座位险',
        hasBujimian: true,
        options: [{
            name: '不投保',
            value: 0
        }, {
            name: '1万',
            value: 10000
        }, {
            name: '2万',
            value: 20000
        }, {
            name: '3万',
            value: 30000
        }, {
            name: '4万',
            value: 40000
        }, {
            name: '5万',
            value: 50000
        }, {
            name: '10万',
            value: 100000
        }, {
            name: '20万',
            value: 200000
        }]
    },
    DaoQiang: {
        name: '盗抢险',
        hasBujimian: true,
        options: [{
            name: '不投保',
            value: 0
        }, {
            name: '投保',
            value: 1
        }]
    },
    HuaHen: {
        name: '划痕险',
        hasBujimian: true,
        options: [{
            name: '不投保',
            value: 0
        }, {
            name: '2000',
            value: 2000
        }, {
            name: '5000',
            value: 5000
        }, {
            name: '1万',
            value: 10000
        }, {
            name: '2万',
            value: 20000
        }]
    },
    Boli: {
        name: '玻璃单独破碎险',
        hasBujimian: false,
        options: [{
            name: '不投保',
            value: 0
        }, {
            name: '国产',
            value: 1
        }, {
            name: '进口',
            value: 2
        }]
    },
    ZiRan: {
        name: '自燃损失险',
        hasBujimian: true,
        options: [{
            name: '不投保',
            value: 0
        }, {
            name: '投保',
            value: 1
        }]
    },
    SheShui: {
        name: '涉水行驶损失险',
        hasBujimian: true,
        options: [{
            name: '不投保',
            value: 0
        }, {
            name: '投保',
            value: 1
        }]
    },
    HcSanFangTeYue: {
        name: '第三方特约险',
        options: [{
            name: '不投保',
            value: 0
        }, {
            name: '投保',
            value: 1
        }]
    }
};

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Select extends React.Component {
    render() {
        let hasValidData = this.props.value || this.props.value == '0';
        let maskText = hasValidData ? this.props.options.find((opt) => opt.value === this.props.value).name : this.props.placeholder;
        let gen_options = opt => <option styleName="native-option" key={opt.name} value={opt.value}>{ opt.name }</option>
        return (
            <div styleName="select-widget">
                <div styleName="select-mask" style={{ color: hasValidData ? "#333" : "#999" }}>{ maskText }</div>
                <select styleName="native-select" onChange={this.props.handleChange}>
                    <option selected disabled hidden>ocupy</option> {/* helpful to fire change event whtn choose the real first option */}
                    { this.props.options.map(gen_options) }
                </select>
            </div>
        )
    }
}

@inject('basic_info','car_info', 'policy_detail') @observer @CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class PolicyDetail extends React.Component {

    changeHandler = field => e => {
        this.props.policy_detail.setFormData(field, e.target.value)
    }

    render() {
        let { basic_info, car_info, policy_detail } = this.props;

        let gen_input_field = (fieldName) => {
            let field = model[fieldName],
                bujimainFieldName = field.hasBujimian ? `BuJiMian${fieldName}` : null;

            let valueInStore = policy_detail[fieldName],
                bjmValueInStore = policy_detail[bujimainFieldName];

            let bjmIconUrlDict = {
                disabled: " url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAMAAABgOjJdAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABF1BMVEUAAADY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2Njb29zg4OHl5efo6Orp6ezq6u3d3d7k5Obr6+7i4uPb29vn5+ro6Ovi4uTc3Nzg4OLl5ejp6evm5ujh4eLc3N3j4+TZ2dnj4+Xd3d3h4eMAAACCbBtXAAAAQXRSTlMALnSt0+vv1C8GY9JH2wWR/pQKubpKB95oadc1enu13N3x8t/gt3+AOgFwceRUoMgQwwmipVfmWQzhAkCGvvzlQRTAwUoAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAABXUlEQVQ4y4WUezsCQRSHjxJC6OJOcr+lXEMq3lrbNmoLIfX9v4fiYZPd8f458z7nOTNzfiPiMOTzDwdGAqN+35i4EByfwGFiPDgoTIagWDLuzbJ5b5SKEJr8tT81PYNVUQ4VC8J9ZSJRKKnfPEA08tNCjGpNDVKrEvuuEqZqq7/YVcJfwizUlBs1mO0Jc/PUlTt15ue6xgKW8sJisWssUfE0KiyJLNNQ3jRYlhUeNcYjqxLnSWM8EZc1bI1hk5B1yhqjzLqA0gGy8U+NDdnkWWM8syXbNDVGk23Z4UVjvLAre7xqjFf2ZD+B4SkYJPZFDrRve9gb0iRvHsIbyc9RPaLlfvF2i6OvMUzRMF0Es0HqOwxpin+r2EXSP3E4PqH1PiC8tzg5diJ1egZW/6GNbubOI/2xlIsMtDvNXj9ms9OGzOVgtK98133Zv/ZdufwP2ZtcPlmgcJvP3WWd5Q+ksfEQD1fnoAAAAABJRU5ErkJggg==')",
                unchecked: " url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAMAAABgOjJdAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABI1BMVEUAAADY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2Njf39/o6Ojy8vL4+Pj8/Pzi4uLw8PD////s7Ozd3d339/fe3t76+vrx8fHg4ODp6en09PT5+fn9/f3q6urh4eHj4+Pu7u7a2tr7+/vv7+/z8/Pr6+v19fX+/v4AAAA/aJiFAAAAQXRSTlMALnSt0+vv1C8GY9JH2wWR/pQKubpKB95oadc1enu13N3x8t/gt3+AOgFwceRUoMgQwwmipVfmWQzhAkCGvvzlQRTAwUoAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAABX0lEQVQ4y4WU51ICQRAGR4xgBAlmAbMiiDlrAwcs6AEqUYH3fwtRCw/x7uifO11TM1XzrYjBkGN4ZHRsdHzYMSEmOF2TGEy6nP3C1DQkkiktnU5rqWQCpqf+1Gdm58hklUE2A+6eNp55SKq/5GDe8zuCl/yT6kfL4+12cfOsq//oz7h/BB9oygwNfF+CP0BOmZMj4O8YC2SUFRkWO8YSBUujwJLIMkVlTZFlWaFkY5RYlTVebIwX1mSdVxtDJygh3myMN0ICyg6Q8IAeYdlAtzF0NmVrwC5bsk3ZxiizI7tUbIwKu7IXJGUppAjuiexTtTSqHHwdaYSahVAj8n2qh9TNF9brHP6cYZRiw0RoFIl2wxAj8b+LniD2G4ejOPX+Wd7rxI+MSB2fQPWjp/5RhVNPbyzl7BwqzVajrdqNVrMC5xf90b50XPVk/8pxafI/XN/c3kXuuX+4u328Np4/Ae7a77Vd7S9GAAAAAElFTkSuQmCC')",
                checked: " url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAiCAMAAADmrkDzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABblBMVEUAAABKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKofmUx/vj8P7S6P5rsvqn0fz////f7v6q0/zx+P+t1fyiz/xcqvq32v3G4f13uPpLofmx1vyp0vzQ5/37/f+Dv/u02P2m0fz2+/+GwPuhzvy62/39/v+JwvtMovmezfxPpPnK5P2NxPu+3f3+//+by/xOo/nH4v2SxvvB3/2XyfzE4P1Novn+/v+Rxvu73P2Lw/tLovmv1fz8/v/y+P+FwPtQpPkAAABsq3wqAAAAQnRSTlMAH2Sdw9viZSACU8H+Oc4Dgv0Gq7Cvh0JBBNcFYdEvd7LZ2vDz4bqEPj94DupfrA/SFs+xAWjvFO3uhQlRlfRSDBGtT3+6AAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAYxJREFUOMt9lFdXAjEQhUcRFKUpVqRYQJSiYAEVQQ2WWLFiV+wFe//5Jlmy7WS9L3Mz852cJDuzAIqqqk01Zou5xlRbBwJZ6xtsiMvWUG/VA3YH0sph19SdrkakV6PLqQBNbiSSu0neoRmJ1cJ3aUVGapWANpshYWunQIcHGcvTSQgv+k9eQvjEpfzc/AIJPgC/GFjEGC9R44eAEFgmAF6hLgBdImCVAniN2i7oZqn1wsamXN/aZsAOW/RAL4u7GBf3OLDPgANp1QtSPCSp4pEEFBhwzHeEIAsnNHl6RlyJWXzOgSCEWLy4ZMgVKl1Tc3MrHyoEfZK5u2fIQ5kBj8q1+iBccXdPmOsmr7p4GPq5fS5XgJdX9dMMgDXEvXQEehiVLKSjI/Kq9EaBd83rRsi3jcbk5cfn1/ePBohFaQvFVZnfkvYDxaU2FHc61WClk4cSBkBiiI9DclgIDCeVkYqKJmYkqh7L0bGUrp4aG9WNdjo8rqpPTKYF/4fMVNaRI9WcIzudAUPNzM7oMn9NEuT0NSkwNAAAAABJRU5ErkJggg==')"
            };
            let bjmIconUrl = !valueInStore ? bjmIconUrlDict.disabled : (bjmValueInStore ? bjmIconUrlDict.checked : bjmIconUrlDict.unchecked);

            let isThisFieldEnabled = (fieldName === 'HcSanFangTeYue' && !this.props.policy_detail.CheSun) ? false : true; // 必须投保车损险才能投保第三方特约险

            return (
                isThisFieldEnabled ?
                <div key={fieldName} styleName="input-field">
                    <div styleName="input-field-name">{field.name}</div>
                    <div styleName="right-els">
                        { field.hasBujimian &&
                            <div styleName="bujimian-input"
                                style={{ background: `${bjmIconUrl} #fff no-repeat left`, color: valueInStore ? "#666" : "#999"}}
                                onClick={this.changeHandler(bujimainFieldName)}>
                                不计免赔
                            </div>
                        }
                        <Select
                            style={{ float: "right"}}
                            placeholder="请选择"
                            value={valueInStore}
                            options={field.options}
                            handleChange={this.changeHandler(fieldName)}/>
                    </div>
                </div>
                : null
            )
        }

        return (
            <div styleName="fake-body">
                <Header title="险种明细" history={this.props.history} />
                <div styleName="car-info-container">
                    <div styleName="car-info">
                        <div styleName="car-info-item">
                            车牌号码
                            <span>ssf{`${basic_info.carNoArea}${basic_info.licenseNo}`}</span>
                        </div>
                        <div styleName="car-info-item">
                            车主信息
                            <span>sdfs{basic_info.carOwnersName}</span>
                        </div>
                        <div styleName="car-info-item">
                            车辆型号
                            <span>sdfsd{car_info.moldName}</span>
                        </div>
                        <div styleName="car-info-item">
                            车架号
                            <span>sdfs{car_info.carVin}</span>
                        </div>
                        <div styleName="car-info-item">
                            发动机号
                            <span>sf{car_info.engineNo}</span>
                        </div>
                        <div styleName="car-info-item-expire">
                            <div styleName="left-els">
                                交强险到期日:
                                <span> {car_info.forceExpireDate}</span>
                            </div>
                            <div styleName="right-els">
                                商业险到期日:
                                <span> {car_info.businessExpireDate}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div styleName="input-field-grp">
                    <div styleName="input-field">
                        <div styleName="left-els">投保方案</div>
                        <div styleName="right-els">默认为去年投保方案</div>
                    </div>
                    <div styleName="input-field">
                        <div styleName="left-els">交强险+车船税</div>
                        <div styleName="right-els">必选险种</div>
                    </div>
                </div>

                <div>
                    <div styleName="policy-class">基本险</div>
                    <div styleName="input-field-grp">
                        { ['CheSun', 'Sanzhe', 'SiJi', 'ChengKe', 'DaoQiang'].map(gen_input_field) }
                    </div>
                    <div styleName="policy-class">附加险</div>
                    <div styleName="input-field-grp">
                        { ['HuaHen', 'Boli', 'ZiRan', 'SheShui', 'HcSanFangTeYue'].map(gen_input_field) }
                    </div>
                </div>

                <div styleName="next-btn-area">
                    <div styleName={policy_detail.valid ? "next-btn" : "next-btn btn-disabled"}
                        onClick={ policy_detail.submit(this.props.history) }>查询保费</div>
                </div>
            </div>
        )
    }
}

export default PolicyDetail
