import { extendObservable, computed } from 'mobx'

import { Request, Components } from 'fw-javascripts'


export default class Customer {

    constructor(Get) {
        this.Get = Get;
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
        })
    }

    setFormData = (type, k, v) => {
        this[type][k] = v;
    }

    toggleSamePerson = () => {
        this.isSame = !this.isSame
    }

    setImgUrl = (imgId, imgUrl) => {
        switch (imgId) {
            case 'img1':
                this.holder.img1 = imgUrl;
                break;
            case 'img2':
                this.holder.img2 = imgUrl;
                break;
            case 'img3':
                this.recognizee.img1 = imgUrl;
                break;
            case 'img4':
                this.recognizee.img2 = imgUrl;
                break;
            case 'img7':
                this.vehicleLicenseImage1 = imgUrl;
                break;
            case 'img8':
                this.vehicleLicenseImage2 = imgUrl;
                break;
            default:
        }
    }

    uploadImg = async (imgId, imgData) => {
        let API_PATH = document.getElementById('api-path').value;

        let temporaryPolicyId = '342';
        // let temporaryPolicyId = await this.Get('/carInsurance/getTempPolicyIdForUser.shtml')
        //     .then(data => data.temporaryPolicyId);
        Request({
            url: `${API_PATH}/mpwap/carInsurance/customerImgUpload.shtml`,
            data: {
                temporaryPolicyId: temporaryPolicyId,
                imgId: imgId,
                imgCode: imgData
            },
            method: 'POST',
            slience: true
        }).then((data) => {
            this.setImgUrl(imgId, data.imgUrl);
        }).catch(error => {
            if (error.code == 40101) {
                console.log('here ! should go to login')

                Browser.inApp ?
                    NativeBridge.login() :
                    location.href = 'https://m.9888.cn/mpwap/orderuser/toLogin.shtml'
            } else {
                // 如果不弹出错误, 就直接reject
                if (slience)
                    return new Promise((resolve, reject) => reject(error))

                Components.showToast(error.message)

                return new Promise((resolve, reject) => {
                    setTimeout(() => reject(error), 1700)
                })
            }
        })
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

    submit = (history) => {
        if (!this.valid) return
        history.push('/order-confirm');
    }

}
