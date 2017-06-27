import { extendObservable, computed } from 'mobx'


export default class Customer {

    constructor(Get, Post) {
        this.Get = Get;
        this.Post = Post;
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

    uploadImg = async (imgId, imgCode) => {

        let temporaryPolicyId = '342';
        // let temporaryPolicyId = await this.Get('/carInsurance/getTempPolicyIdForUser.shtml')
        //     .then(data => data.temporaryPolicyId);
        this.Post(`/carInsurance/customerImgUpload.shtml`, {
                temporaryPolicyId: temporaryPolicyId,
                imgId: imgId,
                imgCode: imgCode
            }, false, {
                'Content-Type': 'multipart/form-data'
            }).then((data) => {
                this.setImgUrl(imgId, data.imgUrl);
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
