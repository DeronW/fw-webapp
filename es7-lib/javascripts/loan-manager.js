import RequestFactory from './core/request.js'
import Components from './components';


let request = new RequestFactory({
    error_handler: (code, message, responseText) => { },
    alert: Components.showAlert,
    show_loading: Components.showLoading,
    hide_loading: Components.hideLoading
})

class $LOAN_MANAGER {
    static Post(options) {
        return request.ajax(options)
    }
}

export default $LOAN_MANAGER
