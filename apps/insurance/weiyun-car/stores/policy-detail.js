import { extendObservable, computed } from 'mobx'

export default class BasicInfo {

    constructor(request, state = {}) {
        this.request = request
        extendObservable(this, {
            cheSun: null,
            buJiMianCheSun: 0,
            sanZhe: null,
            buJiMianSanZhe: 0,
            siJi: null,
            buJiMianSiJi: 0,
            chengKe: null,
            buJiMianChengKe: 0,
            daoQiang: null,
            buJiMianDaoQiang: 0,
            huaHen: null,
            buJiMianHuaHen: 0,
            boli: null,
            ziRan: null,
            buJiMianZiRan: 0,
            sheShui: null,
            buJiMianSheShui: 0,
            hcSanFangTeYue: null,
        }, state)
    }

    setMainFieldData = (field, value) => {
        let formattedValue = parseInt(value);
        return this[field] = formattedValue;
    }

    setBujimianFieldData = (field, value) => {
        this[field] = value === 0 ? 0 : (1 - this[field]);
    }

    @computed get valid() {
        if (this.HcSanFangTeYue === null && this.CheSun !== 0) return false; // 投保车损险但没有选择第三方是否投保，信息缺失
        ['cheSun', 'sanZhe', 'siJi', 'chengKe', 'daoQiang', 'huaHen', 'boli', 'ziRan', 'sheShui'].forEach((key) => {
            if (this[key] === null) return false // 其他必选项信息缺失
        })
        return true;
    }

    submit = (history) => () => {
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
