import { extendObservable, computed } from 'mobx'


const api_key = 'QxYlSme6cgSmNVYMTGfPdJ8IyHJ5txhy',
    api_secret = 'jExC7uBw0bu1EjQlxg_sw5-o0pUsbguu';

export default class IdcardOcr {

    constructor(Post) {
        this.Post = Post;
        this.data = {};

        extendObservable(this.data, {
            name: '',
            idNo: '',
            birth: '',
            race: '',
            address: '',
            issuedBy: '',
            validDate: '',
            idcardPortraitImg: '',
            idcardEmblemImg: '',
        })
    }

    @computed get ocrDone() {
        return this.data.idcardPortraitImg && this.data.idcardEmblemImg
    }

    handleItemEdit = field => e => {
        this.data[field] = e.target.value;
    }

    uploadIdcardImg = (type, data) => {
        if (type === 'portrait') {
            this.data.idcardPortraitImg = data;
        } else if (type === 'emblem') {
            this.data.idcardEmblemImg = data;
        }
    }

    submit = () => {
        if (!this.ocrDone) return
    }

}
