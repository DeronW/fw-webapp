import { extendObservable, computed } from 'mobx'

export default class CustomerInfo {

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
        this.isSame = !this.isSame;
        if (this.isSame) {
            Object.assign(this.recognizee, this.holder);
        } else {
            for (var k in this.recognizee) {
                this.recognizee[k] = ''
            }
        }
    }

    triggerUploadImg = () => {
        // TODO: trigger app upload img
        console.log('user wants to upload img!');
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
        // return this.request('blablabla').then(data => {
        //     if (data.success) {
        //
        //     } else {
        //
        //     }
        // })
    }

}