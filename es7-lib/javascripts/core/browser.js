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
        return /Android/i.test(this.ua)
    }
    get inIOS() {
        return /iPhone|iPad|iPod/i.test(this.ua)
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
        return /MicroMessenger/.test(this.ua)
    }
}

export default new Browser
