import { extendObservable } from 'mobx'

export default class Home {
  constructor () {
    this.data = {}
    extendObservable(this.data, {

    })
  }
}
