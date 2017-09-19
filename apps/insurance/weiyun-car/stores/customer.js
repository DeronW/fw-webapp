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
                this.holder.image1 = imgUrl;
                break;
            case 'img2':
                this.holder.image2 = imgUrl;
                break;
            case 'img3':
                this.recognizee.image1 = imgUrl;
                break;
            case 'img4':
                this.recognizee.image2 = imgUrl;
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

    uploadImg = (imgId, imgCode) => {
        this.Post(`/carInsurance/customerImgUpload.shtml`, {
            temporaryPolicyId: '123',
            imgId: imgId,
            imgCode: imgCode
        }, { contentType: false }).then((data) => {
            this.setImgUrl(imgId, data.imgUrl);
        })
    }

    @computed get valid() {
        let valid = ['name', 'mobile', 'cardId', 'email', 'image1', 'image2'].every((k) => {
            return (this.holder[k] && (this.isSame || this.recognizee[k]))
        })
        return valid && this.vehicleLicenseImage1 && this.vehicleLicenseImage2
    }

    submit = async (history) => {
        if (!this.valid) return

        if (this.isSame) Object.assign(this.recognizee, this.holder)

        let temporaryPolicyId = await this.Get('/carInsurance/getTempPolicyIdForUser.shtml')
            .then(data => data.temporaryPolicyId)
        this.Get(`/carInsurance/bondsmanInfo.shtml`, {
            temporaryPolicyId: temporaryPolicyId,
            holderPeopleName: this.holder.name,
            holderPeopleMobile: this.holder.mobile,
            holderPeopleCardId: this.holder.cardId,
            holderPeopleEmail: this.holder.email,
            holderPeopleImage1: this.holder.image1,
            holderPeopleImage2: this.holder.image2,
            insuredPeopleName: this.recognizee.name,
            insuredPeopleMobile: this.recognizee.mobile,
            insuredPeopleCardId: this.recognizee.cardId,
            insuredPeopleEmail: this.recognizee.email,
            insuredPeopleImage1: this.recognizee.image1,
            insuredPeopleImage2: this.recognizee.image2,
            isSame: this.isSame,
            vehicleLicenseImage1: this.vehicleLicenseImage1,
            vehicleLicenseImage2: this.vehicleLicenseImage2
        }).then((data) => {
            history.push('/order-confirm');
        })
    }

}
