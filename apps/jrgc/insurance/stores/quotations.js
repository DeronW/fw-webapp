import { extendObservable, computed } from 'mobx'

export default class Quotations {

    constructor(Get) {
        this.Get = Get

        extendObservable(this, {
            detail: {
                // 0:平安、1:太平洋、2:人保

                '0': { },
                '1': { },
                '2': { },

                // with no error:
                // '0': {
                //     source: '0',  // 公司编号
                //     originPrice: '1234',  // 总计报价
                //     discount: '23',  // 工场优惠
                //     actualPrice: '1211',  // 实际结算价
                //     forceAndTaxTotal: '2000',  // 交强险 + 车船税
                //     forceTotal: '1001',  // 交强险
                //     taxTotal: '999',  // 车船税
                //     businessTotal: '12000',  // 商业险总计报价
                //     businessDiscountRate: '20',  // 商业险优惠百分比
                //     cheSun: '12',  // 车损险
                //     ...其他种类明细
                // },
                // '1': {...},
                // '2': {...}

            }
        })
    }

    fetchQuotations = async (s) => {
        let temporaryPolicyId = await this.Get('/carInsurance/getTempPolicyIdForUser.shtml')
            .then(data => data.temporaryPolicyId);

        Object.keys(this.detail).map((source) => {
            if (s !== undefined && source !== s) return;

            this.Get(`/carInsurance/insuranceQuote.shtml`, {
                source: source,
                temporaryPolicyId: temporaryPolicyId
            }, true).then(({ quotationDetail }) => {
                Object.assign(this.detail, { [source]: quotationDetail[0]} );
            })
        })

    }

    setForm = (data) => {
        for (var i = 0; i < data.length; i++) {
            let detailObj = data[i],
                firmNo = String(detailObj.source);
            Object.assign(this.detail, { [firmNo]: detailObj });
        }
    }

    getDetailForSelected = firmNo => this.detail[firmNo] || {}

    getDetailForAll = () => {
        return {
            '0': this.getDetailForSelected('0'),
            '1': this.getDetailForSelected('1'),
            '2': this.getDetailForSelected('2')
        }
    }

}
