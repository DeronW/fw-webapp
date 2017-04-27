const Browser = {
    inApp: function () {
        return navigator.userAgent.indexOf('FinancialWorkshop') >= 0;
    },
    appVersion: function () {
        var r = navigator.userAgent.match(/FinancialWorkshop\/(\d+.\d+.\d+)/);
        return r ? r[1] : '0';
    },
    inAndroid: function () {
        return navigator.userAgent.match(/Android/i) ? true : false;
    },
    inIOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    inMobile: function () {
        var fb = FW.Browser;
        return fb.inAndroid() || fb.inIOS();
    },
    inIOSApp: function () {
        return FW.Browser.inApp() && FW.Browser.inIOS()
    },
    inAndroidApp: function () {
        return FW.Browser.inApp() && FW.Browser.inAndroid()
    },
    inWeixin: function () {
        return navigator.userAgent.indexOf('MicroMessenger') >= 0
    }
}

module.exports = Browser