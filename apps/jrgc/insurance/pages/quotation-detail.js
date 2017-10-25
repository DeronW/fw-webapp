import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import { Utils } from 'fw-javascripts'

import Header from '../components/header'

import styles from '../css/quotation-detail.css'


const QuotationDetail = inject('current_order', 'quotations')(observer(CSSModules((props) => {

    let selectedFirm = Utils.hashQuery.selectedFirm || props.current_order.selectedFirm,
        detail = props.quotations.getDetailForSelected(selectedFirm);

    let gen_detail_item = (type, title) => (
        <div styleName="detail-item">
            <div styleName="item-name">{title}</div>
            <div styleName="item-price">￥{detail[type]}</div>
        </div>
    )

    return (
        <div>
            <Header title="保费报价" show_close={false} history={props.history} />
            <div styleName={`firm-name-${selectedFirm}`}></div>
            <div styleName="detail-grp">
                <div styleName="grp-title">
                    <div styleName="title-name">交强险+车船税</div>
                    <div styleName="grp-total-price">￥{detail.forceAndTaxTotal}</div>
                </div>
                <div styleName="grp-detail">
                    { gen_detail_item('forceTotal', '交强险') }
                    { gen_detail_item('taxTotal', '车船税') }
                </div>
            </div>
            <div styleName="detail-grp">
                <div styleName="grp-title">
                    <div styleName="title-name">商业险(优惠{detail.businessDiscountRate}%)</div>
                    <div styleName="grp-total-price">￥{detail.businessTotal}</div>
                </div>
                <div styleName="grp-detail">
                    { gen_detail_item('cheSun', '车损') }
                    { gen_detail_item('buJiMianCheSun', '车损险不计免赔') }
                    { gen_detail_item('sanZhe', '第三者责任险') }
                    { gen_detail_item('buJiMianSanZhe', '不计免第三者责任险') }
                    { gen_detail_item('siJi', '司机座位险') }
                    { gen_detail_item('buJiMianSiJi', '不计免司机座位险') }
                    { gen_detail_item('chengKe', '乘客座位险') }
                    { gen_detail_item('buJiMianChengKe', '不计免乘客座位险') }
                    { gen_detail_item('daoQiang', '盗抢险') }
                    { gen_detail_item('buJiMianDaoQiang', '不计免盗抢险') }
                    { gen_detail_item('huaHen', '划痕险') }
                    { gen_detail_item('buJiMianHuaHen', '不计免划痕险') }
                    { gen_detail_item('boLi', '玻璃单独破碎险') }
                    { gen_detail_item('ziRan', '自燃损失险') }
                    { gen_detail_item('buJiMianZiRan', '不计免自燃损失险') }
                    { gen_detail_item('sheShui', '涉水行驶损失险') }
                    { gen_detail_item('buJiMianSheShui', '不计免涉水行驶损失险') }
                    { gen_detail_item('hcSanFangTeYue', '第三方特约险') }
                </div>
            </div>
            <div styleName="total-price-container">
                <div styleName="origin-price-item">
                    <div styleName="total-item-name">总计报价</div>
                    <div styleName="total-item-price">￥{detail.originPrice}</div>
                </div>
                <div styleName="discount-item">
                    <div styleName="total-item-name">工场优惠</div>
                    <div styleName="total-item-price">-￥{detail.discount}</div>
                </div>
                <div styleName="actual-price-item">
                    <div styleName="total-name">实际结算价</div>
                    <div styleName="total-price">￥{detail.actualPrice}</div>
                </div>
            </div>
        </div>
    )
}, styles, { "allowMultiple": true, "errorWhenNotFound": false })))

export default QuotationDetail
