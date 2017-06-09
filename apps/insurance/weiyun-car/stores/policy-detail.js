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

    submit = () => {
        // return this.request('blablabla').then(data => {
        //     if (data.success) {
        //
        //     } else {
        //
        //     }
        // })
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

    }

    logData = () => console.log(this)
}
