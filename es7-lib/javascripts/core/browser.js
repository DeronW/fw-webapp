class Browser {
    constructor() {
        this.ua = navigator.userAgent
    }
    get inApp() {
        return /FinancialWorkshop/.test(this.ua)
    }
    get appVersion() {
        let r = this.ua.match(/FinancialWorkshop\/(\d+.\d+.\d+)/);
        return r ? r[1] : '0';
    }
    get inAndroid() {
        return this.ua.test(/Android/i)
    }
    get inIOS() {
        return this.ua.test(/iPhone|iPad|iPod/i)
    }
    get inMobile() {
        return this.inAndroid || this.inIOS
    }
    get inIOSApp() {
        return this.inApp && this.inIOS
    }
    get inAndroidApp() {
        return this.inApp && this.inAndroid
    }
    get inWeixin() {
        return this.ua.test('MicroMessenger')
    }
}

export default new Browser
