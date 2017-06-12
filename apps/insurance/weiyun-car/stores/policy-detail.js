import { extendObservable, computed } from 'mobx'

export default class BasicInfo {

    constructor(request, state = {}) {
        this.request = request
        extendObservable(this, {
            CheSun: null,
            BuJiMianCheSun: 0,
            Sanzhe: null,
            BuJiMianSanzhe: 0,
            SiJi: null,
            BuJiMianSiJi: 0,
            ChengKe: null,
            BuJiMianChengKe: 0,
            DaoQiang: null,
            BuJiMianDaoQiang: 0,
            HuaHen: null,
            BuJiMianHuaHen: 0,
            Boli: null,
            ZiRan: null,
            BuJiMianZiRan: 0,
            SheShui: null,
            BuJiMianSheShui: 0,
            HcSanFangTeYue: null,
        }, state)
    }

    setFormData = (field, value) => {
        let formattedValue = parseInt(value);
        if (field.indexOf('BuJiMian') > -1) {
            this[field] = 1 - this[field];
        } else {
            this[field] = formattedValue;
        }
    }

    @computed get valid() {
        if (this.HcSanFangTeYue === null && this.CheSun !== 0) return false; // 投保车损险但没有选择第三方是否投保，信息缺失
        ['CheSun', 'Sanzhe', 'SiJi', 'ChengKe', 'DaoQiang', 'HuaHen', 'Boli', 'ZiRan', 'SheShui'].forEach((key) => {
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
