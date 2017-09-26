import { extendObservable, computed } from 'mobx'


export default class StatsInvestor {

    constructor(Get) {
        this.get = Get;

        this.data = { };
        extendObservable(this.data, {

        })
    }

}