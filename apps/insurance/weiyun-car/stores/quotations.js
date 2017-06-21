import { extendObservable, computed } from 'mobx'

export default class PolicyDetail {

    constructor(request, state = {}) {
        this.request = request

        extendObservable(this, {
            // 0:平安、1:太平洋、2:人保
            '0': {
                originPrice: '1234',  // 总计报价
                discount: '23',  // 工场优惠
                actualPrice: '1211',  // 实际结算价
                forceAndTaxTotal: '2000',  // 交强险 + 车船税
                forceTotal: '1001',  // 交强险
                taxTotal: '999',  // 车船税
                businessTotal: '12000',  // 商业险总计报价
                businessDiscountRate: '20',  // 商业险优惠百分比
                cheSun: '12',  // 车损险
                buJiMianCheSun: '',  // 车损险不计免赔
                sanZhe: '',  // 第三者责任险
                buJiMianSanZhe: '',  // 不计免第三者责任险
                siJi: '',  // 司机座位险
                buJiMianSiJi: '',  // 不计免司机座位险
                chengKe: '',  // 乘客座位险
                buJiMianChengKe: '',  // 不计免乘客座位险
                daoQiang: '',  // 盗抢险
                buJiMianDaoQiang: '',  // 不计免盗抢险
                huaHen: '',  // 划痕险
                buJiMianHuaHen: '',  // 不计免划痕险
                boLi: '',  // 玻璃单独破碎险
                ziRan: '',  // 自燃损失险
                buJiMianZiRan: '',  // 不计免自燃损失险
                sheShui: '',  // 涉水行驶损失险
                buJiMianSheShui: '',  // 不计免涉水行驶损失险
                hcSanFangTeYue: '',  // 第三方特约险
            },
            '1': {
                originPrice: '1234',  // 总计报价
                discount: '23',  // 工场优惠
                actualPrice: '1211',  // 实际结算价
                forceAndTaxTotal: '2000',  // 交强险 + 车船税
                forceTotal: '1001',  // 交强险
                taxTotal: '999',  // 车船税
                businessTotal: '12000',  // 商业险总计报价
                businessDiscountRate: '20',  // 商业险优惠百分比
                cheSun: '12',  // 车损险
                buJiMianCheSun: '',  // 车损险不计免赔
                sanZhe: '',  // 第三者责任险
                buJiMianSanZhe: '',  // 不计免第三者责任险
                siJi: '',  // 司机座位险
                buJiMianSiJi: '',  // 不计免司机座位险
                chengKe: '',  // 乘客座位险
                buJiMianChengKe: '',  // 不计免乘客座位险
                daoQiang: '',  // 盗抢险
                buJiMianDaoQiang: '',  // 不计免盗抢险
                huaHen: '',  // 划痕险
                buJiMianHuaHen: '',  // 不计免划痕险
                boLi: '',  // 玻璃单独破碎险
                ziRan: '',  // 自燃损失险
                buJiMianZiRan: '',  // 不计免自燃损失险
                sheShui: '',  // 涉水行驶损失险
                buJiMianSheShui: '',  // 不计免涉水行驶损失险
                hcSanFangTeYue: '',  // 第三方特约险
            },
            '2': {
                originPrice: '1234',  // 总计报价
                discount: '23',  // 工场优惠
                actualPrice: '1211',  // 实际结算价
                forceAndTaxTotal: '2000',  // 交强险 + 车船税
                forceTotal: '1001',  // 交强险
                taxTotal: '999',  // 车船税
                businessTotal: '12000',  // 商业险总计报价
                businessDiscountRate: '20',  // 商业险优惠百分比
                cheSun: '12',  // 车损险
                buJiMianCheSun: '',  // 车损险不计免赔
                sanZhe: '',  // 第三者责任险
                buJiMianSanZhe: '',  // 不计免第三者责任险
                siJi: '',  // 司机座位险
                buJiMianSiJi: '',  // 不计免司机座位险
                chengKe: '',  // 乘客座位险
                buJiMianChengKe: '',  // 不计免乘客座位险
                daoQiang: '',  // 盗抢险
                buJiMianDaoQiang: '',  // 不计免盗抢险
                huaHen: '',  // 划痕险
                buJiMianHuaHen: '',  // 不计免划痕险
                boLi: '',  // 玻璃单独破碎险
                ziRan: '',  // 自燃损失险
                buJiMianZiRan: '',  // 不计免自燃损失险
                sheShui: '',  // 涉水行驶损失险
                buJiMianSheShui: '',  // 不计免涉水行驶损失险
                hcSanFangTeYue: '',  // 第三方特约险
            },
        })
    }

    getSelectedAbstract = (firmNo) => {
        return {
            originPrice: this[firmNo].originPrice,
            discount: this[firmNo].discount,
            actualPrice: this[firmNo].actualPrice,
        }
    }

    getSelectedDetail = (firmNo) => this[firmNo]

    getSelectedTotal = (firmNo) => this[firmNo].actualPrice


}
