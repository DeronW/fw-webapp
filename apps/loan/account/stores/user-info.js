import { extendObservable } from 'mobx'


const isPhoneNum = str => /^1[3|4|5|7|8]\d{9}$/.test(String(str));


export default class userInfo {

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

    inputHandler = (k, v) => this.data[k] = v

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
        }, e => {

        })
    }

}