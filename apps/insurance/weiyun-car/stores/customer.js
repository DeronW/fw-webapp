import { extendObservable, computed } from 'mobx'

export default class Customer {

    constructor(request, state = {}) {
        this.request = request
        extendObservable(this, {
            holder: {
                name: '',
                mobile: '',
                cardId: '',
                email: '',
                image1: '',
                image2: ''
            },
            recognizee: {
                name: '',
                mobile: '',
                cardId: '',
                email: '',
                image1: '',
                image2: ''
            },
            isSame: true,
            vehicleLicenseImage1: '',
            vehicleLicenseImage2: ''
        }, state)
    }

    setFormData = (type, k, v) => {
        this[type][k] = v;
    }

    toggleSamePerson = () => {
        this.isSame = !this.isSame
    }

    @computed get valid() {
        let valid = ['name', 'mobile', 'cardId', 'email'].every((k) => {
            return (this.holder[k] && (this.isSame || this.recognizee[k]))
        })
        return valid
            // let valid = ['name', 'mobile', 'cardId', 'email'].every((k) => {
            //     return (this.holder[k] && (this.isSame || this.recognizee[k]))
            // })
            // return valid && this.vehicleLicenseImage1 && this.vehicleLicenseImage2
    }

    submit = (history) => () => {

        if (!this.valid) return
        history.push('/policy-quotation');

        // return this.request('blablabla', {}).then(data => {
        //     if (data.success) {
        //
        //     } else {
        //
        //     }
        // })
    }

}