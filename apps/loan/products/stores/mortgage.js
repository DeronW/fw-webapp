import { extendObservable, computed } from 'mobx'

import { Components } from 'fw-javascripts'


export default class Mortgage {

    constructor(Post) {
        this.Post = Post;

        extendObservable(this, {
            phone: '',
            realName: '',
            amount: '',
            duration: '',
            city: '北京市',
            district: '',
            neighbour: '',
            area: '',
        })
    }

    @computed get hasRealName() {
        return this.realName !== ''
    }

    @computed get allFieldsFilled() {
        return this.phone && this.realName && this.amount && this.duration && this.city && this.district && this.neighbour && this.area
    }

    _set_field = (k, v) => {
        this[k] = v;
    }

    setFormData = (data) => {
        for (let i in data) {
            if (!data[i]) return
            this._set_field(i, data[i]);
        }
    }

    setCurrentPanel = (history, p) => {
        history.push(`/mortgage/apply#${p}`);
    }

    setPanelData = (history, field, v) => {
        history.goBack();
        this._set_field(field, v);
    }

    fetchBasicInfo = () => {
        this.Post('/api/userext/v1/userAuthentication.json', { version: 'v1' })
            .then(data => this.setFormData(data));
    }

    submit = (history) => {
        if (!this.allFieldsFilled) return Components.showToast('请填写全部内容')

        this.Post('/api/public/v1/mortgage.json', {
            phone: this.phone,
            mortgAmountRange: this.amount,
            mortgTimeLong: this.duration,
            area: this.district,
            housingEstate: this.neighbour,
            houseBuildArea: this.area,
            province: '北京市',
            city: this.city,
            realName: this.realName
        }).then(
            data => history.push('/mortgage/success'),
            e => Components.showToast(e.message))
    }

}
