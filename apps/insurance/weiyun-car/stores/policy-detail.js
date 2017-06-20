import { extendObservable, computed } from 'mobx'

export default class PolicyDetail {

    constructor(Get) {
        this.Get = Get;

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
        })
    }

    bjmToggleHander = (kindName, bjmName) => {
        if (this[kindName])
            this[bjmName] = !this[bjmName]
    }

    setFormData = (k, v) => {
        this[k] = parseInt(v);
    }

    setForm = (data) => {
        for (var k in data) {
            if (this[k] !== undefined) {
                this[k] = data[k];
            }
        }
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

        // return this.Get('/blablabla', {
        //     cheSun: this.cheSun,
        //     buJiMianCheSun: this.buJiMianCheSun,
        //     sanZhe: this.sanZhe,
        //     buJiMianSanZhe: this.buJiMianSanZhe,
        //     siJi: this.siJi,
        //     buJiMianSiJi: this.buJiMianSiJi,
        //     chengKe: this.chengKe,
        //     buJiMianChengKe: this.buJiMianChengKe,
        //     daoQiang: this.daoQiang,
        //     buJiMianDaoQiang: this.buJiMianDaoQiang,
        //     huaHen: this.huaHen,
        //     buJiMianHuaHen: this.buJiMianHuaHen,
        //     boli: this.boli,
        //     ziRan: this.ziRan,
        //     buJiMianZiRan: this.buJiMianZiRan,
        //     sheShui: this.sheShui,
        //     buJiMianSheShui: this.buJiMianSheShui,
        //     hcSanFangTeYue: this.hcSanFangTeYue
        // }).then(data => {
            history.push('/policy-quotation');
        // })
    }

}
