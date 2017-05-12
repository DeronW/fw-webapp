import { extendObservable, computed } from 'mobx'

export default class UIStore {

    constructor(request) {
        this.request = request;
        extendObservable(this, {
            activeType: 'phone',
            codeAvailAfter: 60,
            showPassword: false
        });
    }

    @computed get codeAvail() { return this.codeAvailAfter === 60 };

    switchActiveType = (type) => { this.activeType = type }

    getCode = (phone) => {
        if (!this.codeAvail) return
        // TODO: request
        let counter = setInterval(() => {
            if (this.codeAvailAfter === 1) {
                clearInterval(counter);
                return this.codeAvailAfter = 60;
            }
            this.codeAvailAfter --;
        }, 1000);
    }
}
