import { BrowserFactory } from 'fw-javascripts'

let ua = navigator.userAgent, stamp,
    JRGC = 'FinancialWorkshop', FXH = 'EasyLoan888'

stamp = ua.indexOf(JRGC) > -1 ? JRGC : ua.indexOf(FXH) > -1 ? FXH : null;

export default new BrowserFactory(null, stamp)
