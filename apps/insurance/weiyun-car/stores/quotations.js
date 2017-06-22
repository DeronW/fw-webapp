import { extendObservable, computed } from 'mobx'

export default class PolicyDetail {

    constructor(request) {
        this.request = request

        extendObservable(this, {
            detail: {
                // 0:平安、1:太平洋、2:人保
                /*
                '0': {
                    source: '0',  // 公司编号
                    originPrice: '1234',  // 总计报价
                    discount: '23',  // 工场优惠
                    actualPrice: '1211',  // 实际结算价
                    forceAndTaxTotal: '2000',  // 交强险 + 车船税
                    forceTotal: '1001',  // 交强险
                    taxTotal: '999',  // 车船税
                    businessTotal: '12000',  // 商业险总计报价
                    businessDiscountRate: '20',  // 商业险优惠百分比
                    cheSun: '12',  // 车损险
                    ...其他种类明细
                },
                '1': {...},
                '2': {...}
                */
            }
        })
    }

    setForm = (data) => {
        for (var i = 0; i < data.length; i++) {
            let detailObj = data[i],
                firmNo = String(detailObj.source);
            Object.assign(this.detail, { [firmNo]: detailObj });
        }
    }

    get abstract() {
        let abstract = { '0': {}, '1': {}, '2': {} };
        for (var k in abstract) {
            if (this.detail[k]) {
                Object.assign(abstract, {
                    [k]: {
                        originPrice: this.detail[k].originPrice,
                        discount: this.detail[k].discount,
                        actualPrice: this.detail[k].actualPrice
                    }
                })
            }
        }
        return abstract
    }

    price_preview = () => {
        return {
            '0': this.getSelectedDetail('0'),
            '1': this.getSelectedDetail('1'),
            '2': this.getSelectedDetail('2')
        }
    }

    getSelectedAbstract = firmNo => {
        let selectedAbstract = {};
        if (this.detail[firmNo]) {
            Object.assign(selectedAbstract, {
                originPrice: this.detail[firmNo].originPrice,
                discount: this.detail[firmNo].discount,
                actualPrice: this.detail[firmNo].actualPrice
            })
        }
        return selectedAbstract
    }

    getSelectedDetail = firmNo => this.detail[firmNo] || {}

    getSelectedTotal = firmNo => this.detail[firmNo] ? this.detail[firmNo].actualPrice : '';

}
