import { extendObservable } from 'mobx'


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
        })
    }

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