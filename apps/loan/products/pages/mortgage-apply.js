import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import { Header } from '../../lib/components'

import styles from '../css/mortgage-apply.css'

const Model = {
    'phone': { name: '手机号' },
    'realName': { name: '姓名' },
    'amount': {
        name: '抵押金额',
        options: [ '100万-200万', '200万-300万', '300万-400万', '400万-500万', '500万-1000万' ]
    },
    'duration': {
        name: '抵押年限',
        options: [ '半年以下', '半年-1年', '1年-10年', '10年-25年', '25年以上' ]
    },
    'city': { name: '所在区域' },
    'district': {
        name: '所在区县',
        options: ['东城区', '西城区', '朝阳区', '海淀区', '丰台区', '石景山区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '平谷区', '怀柔区', '延庆县', '密云县', '北京经济技术开发区', '北京周边']
    },
    'neighbour': { name: '小区名称' },
    'area': { name: '建筑面积' }
}

/* parameters
    <DisplayItem field="" immutable=Bool history={history} />
*/
const DisplayItem = inject('mortgage')(observer(CSSModules((props) => {
    let { mortgage, field, immutable, history } = props,
        itemName = Model[field].name,
        itemValue = mortgage[field] || (Model[field].options ? '请选择' : '请输入');
    return (
        <div className={immutable ? styles['item-container'] : styles['mutable-item-container']}
            onClick={() => { !immutable && props.mortgage.setCurrentPanel(history, field) }}>
            <div styleName="item-name">{itemName}</div>
            <div styleName="item-value" style={{ "color": mortgage[field] ? "#333" : "#999"}}>{itemValue}</div>
        </div>
    )
}, styles, { "allowMultiple": true, "errorWhenNotFound": false })))

/* parameters
    <InputItem field="" />
*/
// const InputItem = inject('mortgage')(observer(CSSModules((props) => {
//     let { mortgage, field } = props,
//         itemValue = mortgage[field];
//     return (
//         <div styleName="item-container">
//             <div styleName="item-name">{Model[field].name}</div>
//             <input placeholder="请输入"
//                 value={itemValue}
//                 onChange={() => {mortgage.setField(field)}}/>
//         </div>
//     )
// }, styles)))


@inject('mortgage')
@observer
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false})
class MortgageApply extends React.Component {

    componentDidMount() {
        this.props.mortgage.fetchBasicInfo();
    }

    render() {
        let { mortgage, history } = this.props,
            hasRealName = mortgage.hasRealName;


        return (
            <div styleName="cnt-container">
                <Header title="房产抵押贷款" history={history} />

                <div>
                    <div styleName="item-grp-name">申请人信息</div>
                    <div styleName="item-grp">
                        <DisplayItem field="phone" history={history} immutable />
                        <DisplayItem field="realName" history={history} immutable={hasRealName} />
                    </div>

                    <div styleName="item-grp-name">抵押金额及期限</div>
                    <div styleName="item-grp">
                        <DisplayItem field="amount" history={history} />
                        <DisplayItem field="duration" history={history} />
                    </div>

                    <div styleName="item-grp-name">抵押物信息</div>
                    <div styleName="item-grp">
                        <DisplayItem field="city" history={history} immutable />
                        <DisplayItem field="district" history={history} />
                        <DisplayItem field="neighbour" history={history} />
                        <DisplayItem field="area" history={history} />
                    </div>
                </div>

                <div styleName="submit-btn-container">
                    <a styleName="submit-btn"
                        style={{ 'background': mortgage.allFieldsFilled ? '#639afb' : '#ccc'}}
                        onClick={this.handleSubmit}>
                        提交资料
                    </a>
                </div>
            </div>
        )
    }
}

export default MortgageApply
