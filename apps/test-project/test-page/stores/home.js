import {observable, action, extendObservable} from 'mobx'

//ui state
export const ui = observable({
    pendingRequests : false
})

class HomeStore{
    @observable feed = []
    @action('获取feed流') async fetchFeed(){
        const data = await requestFromServer();
        this.feed = data.list.map(item=>{
            const id = item.id;
            if(!detail.has(id)){
                detail.set(id,new Detail(item))
            }
            return id;
        })
    }
}

class MapStore{
    @observable data = observable.map();
    get(id){return this.data.get(id)};
    set(id, value){this.data.set(id,value)};
    has(id){return this.data.has(id)}
}

class Detail{

}