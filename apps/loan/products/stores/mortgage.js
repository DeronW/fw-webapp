import { extendObservable, computed } from 'mobx'


export default class Mortgage {

    constructor(Post) {
        this.Post = Post;

        extendObservable(this, {
            currentPanel: '',
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

    setField = (k, v) => {
        this[k] = v;
    }

    setFormData = (data) => {
        for (let i in data) {
            if (!data[i]) return
            this.setField(i, data[i]);
        }
    }

    setCurrentPanel = (history, p) => {
        history.push(`/mortgage-apply#${p}`);
        this.currentPanel = p;
    }

    fetchBasicInfo = () => {
        this.Post('/api/userext/v1/userAuthentication.json', { version: 'v1' })
            .then(data => this.setFormData(data));
    }

}
