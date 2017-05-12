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
        // request for verification code
        // request(`${API_PATH}/api/userBase/v1/sendVerifyCode.json`, {
        //     mobile: phone,
        //     userOperationType: 3,
        //     sourceType: SOURCE_TYPE
        // })
        let counter = setInterval(() => {
            if (this.codeAvailAfter === 1) {
                clearInterval(counter);
                return this.codeAvailAfter = 60;
            }
            this.codeAvailAfter --;
        }, 1000);
    }
}
