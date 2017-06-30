import { BrowserFactory } from 'fw-javascripts'

let ua = navigator.userAgent, stamp,
    JRGC = /FinancialWorkshop/, FXH = /EasyLoan888/

stamp = ua.test(JRGC) ? JRGC : ua.test(FXH) ? FXH : null;

export default new BrowserFactory(null, stamp)
