import { extendObservable } from 'mobx'

import { showToast } from 'fw-components'


const isPhoneNum = str => /^1[3|4|5|7|8]\d{9}$/.test(String(str));


export default class UserInfo {

    constructor(Post) {
        this.Post = Post;

        this.data = {};
        extendObservable(this.data, {
            // 基本信息
            realName: '',
            idCard: '',
            creditCard: '',
            email: '',
            city: '',
            address: '',
            marriage: '',
            // 紧急联系人
            ecName: '',
            ecRelationship: '',
            ecPhone: '',
            // 工作信息
            income: '',
            workExperience: '',
        });

        this._VALIDATOR = {
            ecName: v => {
                if (v.match(/\d/)) return showToast('联系人姓名不可包含数字!')
                if (v.length < 2) return showToast('联系人姓名字符长度需在2位以上!')
            },
            ecPhone: v => {
                if (isPhoneNum(v)) return showToast('联系人手机格式不正确!')
            }
        };
    }

    inputHandler = (field, v) => this.data[field] = v

    setInfoData = data => {
        this.data.realName = data.realName;
        this.data.idCard = data.idCard;
        this.data.creditCard = data.creditCard;
        this.data.email = data.email;
        this.data.city = data.city;
        this.data.address = data.address;
        this.data.marriage = data.homeSituation;
        this.data.ecName = data.emContact;
        this.data.ecRelationship = data.emRelationship;
        this.data.ecPhone = data.emMobile;
        this.data.income = data.income;
        this.data.workExperience = data.workExperience;
    }

    fetchUserInfo = () => {
        this.Post('/api/userBase/v1/userInfoItem.json').then(data => {
            this.setInfoData(data);
        }, e => showToast(e.message))
    }

    validateData = () => {
        for (let field in this._VALIDATOR) {
            const validator = this._VALIDATOR[field],
                value = this.data[field];
            validator(value);
        }
    }

    submitUserInfo = () => {

        this.validateData();

        const submitData = {
            creditCard: this.data.creditCard,
            email: this.data.email,
            city: this.data.city,
            address: this.data.address,
            homeSituation: this.data.marriage,
            emContact: this.data.ecName,
            emRelationship: this.data.ecRelationship,
            emMobile: this.data.ecPhone,
            income: this.data.income,
            workExperience: this.data.workExperience
        };

        return this.Post('/api/userBase/v1/saveUserInfo.json', submitData).then(data => {
            this.setInfoData(data);
            showToast('信息已提交');
        }, e => new Promise((res, rej) => rej(e)) )
    }

}