import { extendObservable, computed } from 'mobx'

export default class PolicyDetail {

    constructor(Get) {
        this.Get = Get

        extendObservable(this, {
            cheSun: null,
            buJiMianCheSun: false,
            sanZhe: null,
            buJiMianSanZhe: false,
            siJi: null,
            buJiMianSiJi: false,
            chengKe: null,
            buJiMianChengKe: false,
            daoQiang: null,
            buJiMianDaoQiang: false,
            huaHen: null,
            buJiMianHuaHen: false,
            boLi: null,
            ziRan: null,
            buJiMianZiRan: false,
            sheShui: null,
            buJiMianSheShui: false,
            hcSanFangTeYue: null,
        })
    }

    bjmToggleHander = (kindName, bjmName) => {
        if (this[kindName])
            this[bjmName] = !this[bjmName]
    }

    setFormData = (k, v) => {
        this[k] = typeof v === 'boolean' ? v : parseInt(v);
    }

    setForm = (data) => {
        for (let k in data) {
            if (this[k] !== undefined) {
                this[k] = data[k]
            }
        }
    }

    @computed get valid() {
        if (this.hcSanFangTeYue === null && this.cheSun !== 0) return false; // 投保车损险但没有选择第三方是否投保，信息缺失

        let valid = ['cheSun', 'sanZhe', 'siJi', 'chengKe', 'daoQiang', 'huaHen', 'boLi', 'ziRan', 'sheShui'].every((key) => {
            return this[key] !== null // 其他必选项信息缺失
        })

        return valid;
    }

    submit = async (history) => {
        if (!this.valid) return

        let temporaryPolicyId = await this.Get('/carInsurance/getTempPolicyIdForUser.shtml')
            .then(data => data.temporaryPolicyId)
        return this.Get('/carInsurance/submitQuoteInfo.shtml', {
            temporaryPolicyId: temporaryPolicyId,
            cheSun: this.cheSun,
            buJiMianCheSun: Number(this.buJiMianCheSun),
            sanZhe: this.sanZhe,
            buJiMianSanZhe: Number(this.buJiMianSanZhe),
            siJi: this.siJi,
            buJiMianSiJi: Number(this.buJiMianSiJi),
            chengKe: this.chengKe,
            buJiMianChengKe: Number(this.buJiMianChengKe),
            daoQiang: this.daoQiang,
            buJiMianDaoQiang: Number(this.buJiMianDaoQiang),
            huaHen: this.huaHen,
            buJiMianHuaHen: Number(this.buJiMianHuaHen),
            boLi: this.boLi,
            ziRan: this.ziRan,
            buJiMianZiRan: Number(this.buJiMianZiRan),
            sheShui: this.sheShui,
            buJiMianSheShui: Number(this.buJiMianSheShui),
            hcSanFangTeYue: Number(this.hcSanFangTeYue)
        }).then(data => {
            history.push('/policy-quotation');
        })
    }

}
