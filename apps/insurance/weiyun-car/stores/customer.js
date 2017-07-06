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
            vehicleLicenseImage1: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAAAlCAYAAADobA+5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4NTFGQTM5Q0I2QzkxMUU2QTM3NkQwOUI5QUIxNkU0MCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4NTFGQTM5REI2QzkxMUU2QTM3NkQwOUI5QUIxNkU0MCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjg1MUZBMzlBQjZDOTExRTZBMzc2RDA5QjlBQjE2RTQwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjg1MUZBMzlCQjZDOTExRTZBMzc2RDA5QjlBQjE2RTQwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/0WL+AAACVVJREFUeNqkWluPHMUV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',
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
