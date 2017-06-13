import { extendObservable, computed } from 'mobx'

export default class BasicInfo {

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

    setMainFieldData = (field, value) => {
        let formattedValue = parseInt(value);
        return this[field] = formattedValue;
    }

    setBujimianFieldData = (field, value) => {
        this[field] = value === 0 ? 0 : (1 - this[field]);
    }

    @computed get valid() {
        if (this.hcSanFangTeYue === null && this.cheSun !== 0) return false; // 投保车损险但没有选择第三方是否投保，信息缺失

        ['cheSun', 'sanZhe', 'siJi', 'chengKe', 'daoQiang', 'huaHen', 'boli', 'ziRan', 'sheShui'].forEach((key) => {
            if (this[key] === null) return false // 其他必选项信息缺失
        })

        return true;
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
