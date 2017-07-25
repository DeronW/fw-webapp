import { extendObservable, computed } from 'mobx'


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
        history.push(`/mortgage-apply#${p}`);
    }

    setPanelData = (history, field, v) => {
        this._set_field(field, v);
        history.goBack();
    }

    fetchBasicInfo = () => {
        this.Post('/api/userext/v1/userAuthentication.json', { version: 'v1' })
            .then(data => this.setFormData(data));
    }

}
