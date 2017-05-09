import { computed } from 'mobx'
import { extendObservable } from 'mobx-react'

export default class UIStore {
    extendObservable(this, {
        activeType: 'phone',
        codeAvailAfter: 60,
        showPassword: false
    });

    @computed codeAvail = this.codeAvailAfter === 60;

    constructor(request) {
        this.request = request;
    }

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
