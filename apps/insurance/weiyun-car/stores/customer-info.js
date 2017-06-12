import { extendObservable, computed } from 'mobx'

export default class CustomerInfo {

    constructor(request, state = {}) {
        this.request = request
        extendObservable(this, {
            holder: {
                Name: '',
                Mobile: '',
                CardId: '',
                Email: '',
                Image1: '',
                Image2: ''
            },
            recognizee: {
                Name: '',
                Mobile: '',
                CardId: '',
                Email: '',
                Image1: '',
                Image2: ''
            },
            IsSame: true,
            vehicleLicenseImage1: '',
            vehicleLicenseImage2: ''
        }, state)
    }

    submit = (history) => () => {
        return;
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

}
