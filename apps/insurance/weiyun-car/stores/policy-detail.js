import { extendObservable, computed } from 'mobx'

export default class PolicyDetail {

    constructor(request, state = {}) {
        this.request = request

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
            boli: null,
            ziRan: null,
            buJiMianZiRan: false,
            sheShui: null,
            buJiMianSheShui: false,
            hcSanFangTeYue: null,
        }, state)
    }

    bjmToggleHander = (kindName, bjmName) => {
        if (this[kindName])
            this[bjmName] = !this[bjmName]
    }

    setFormData = (k, v) => {
        this[k] = parseInt(v);
    }

    @computed get valid() {
        if (this.hcSanFangTeYue === null && this.cheSun !== 0) return false; // 投保车损险但没有选择第三方是否投保，信息缺失

        let valid = ['cheSun', 'sanZhe', 'siJi', 'chengKe', 'daoQiang', 'huaHen', 'boli', 'ziRan', 'sheShui'].every((key) => {
            return this[key] !== null // 其他必选项信息缺失
        })

        return valid;
    }

    submit = (history) => {
        if (!this.valid) return
        history.push('/policy-quotation');
        // return this.request('blablabla').then(data => {
        //     if (data.success) {
        //
        //     } else {
        //
        //     }
        // })
    }

    logData = () => console.log(this)
}
