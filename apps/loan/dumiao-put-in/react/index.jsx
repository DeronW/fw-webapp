function getCookie() {
    var c = document.cookie;
    var r = {};
    if (c === '') return r
    c.split(';').forEach(function(kv) {
        var t = kv.trim().split('=');
        r[t[0]] = t[1];
    });
    return r;
}

class MainPanel extends React.Component {
    constructor() {
        super()
        this.model = new FormModel()
        window._form_model = this.model // 4 debug
        this.state = {
            form_data: {
                productId: $FW.Format.urlQuery().pid
            },
            field_key: ''
        }
    }
    componentDidMount() {
        $FXH.Post(`${API_PATH}/api/userBase/v1/userInfoItem.json`, {}, false)
            .then(data => {
                this.model.set_form_data(data)
                this.setState({ form_data: this.model.get_form_data() })
            })

        window.onpopstate = () => {
            this.setState({ field_key: null })
        }
    }
    setFieldHandler = (key) => {
        this.setState({ field_key: key })
        history.pushState({}, '', `#${key}`)
    }
    setFormData = (dict) => {
        this.model.set_form_data(dict)
        this.setState({ form_data: this.model.get_form_data() })
        history.back()
    }
    submitHandler = () => {
        let err = this.model.validate_form_data();

        err ?
            $FW.Component.Toast(err) :
            $FXH.Post(`${API_PATH}/api/loan/v1/applyDmLoan.json`,
                this.state.form_data, false).then(data => {
                    // redirect to du-miao
                    let u = $FW.Store.getUserDict();
                    let params = `loanUuid=${data.uuid}&uid=${$FW.Browser.inFXHApp() ? getCookie().uid : u.uid}&sourceType=${SOURCE_TYPE}&token=${$FW.Browser.inFXHApp() ? getCookie().token :u.token}`;
                    let app_params = `loanUuid=${data.uuid}&uid=${$FW.Browser.inFXHApp() ? getCookie().uid : u.uid}&token=${$FW.Browser.inFXHApp() ? getCookie().token :u.token}`;
                    $FW.Browser.inApp()? NativeBridge.goto(`https://m.easyloan888.com/api/order/v1/jump.shtml?${app_params}`,false,"分期"):location.href = `/api/order/v1/jump.shtml?${params}`
                }, e => {
                    if (e.code == 20016) $FW.Component.Toast(e.message)
                })
    }
    render() {
        let { field_key, form_data } = this.state,
            field = this.model.get_field(this.state.field_key);

        // 保持, 借款日期与借款金额的联动
        if (field_key === 'term') {
            let pool = field.option_pool;
            field.options = [pool[1], pool[2], pool[3]];
            if (form_data.balance > 3000) {
                field.options = [pool[1], pool[2], pool[3]]
            }
            if (form_data.balance > 5000) {
                field.options = [pool[2], pool[3], pool[4], pool[5]]
            }
            if (form_data.balance > 20000) {
                field.options = [pool[3], pool[4], pool[5]]
            }
        }

        let field_item = key => {
            let f = this.model.get_field(key), text;
            if (f.options && key !== 'city') {
                f.options.forEach(i => {
                    if (i.value == f.value) text = i.text
                })
            } else {
                text = f.value
            }
            return <div className="field-item" key={key} onClick={
                () => this.setFieldHandler(key)}>
                <div className="name-text">{f.name}</div>
                <div className="r">
                    <div className="text" style={{
                        color: f.value ? null : '#ccc'
                    }}>
                        {text || '请选择'}
                    </div>
                    <div className="arrow-icon"></div>
                </div>
            </div>
        }

        let panel_title = t => <div className="section-title">{t}</div>;

        let disabled_field_item = key => {
            let f = this.model.get_field(key)
            return <div key={key}>
                <div className="field-item">
                    <div className="name-text">{f.name}</div>
                    <div className="r no">
                        <div className="text" style={{ color: '#ccc' }} > {f.value}</div>
                    </div>
                </div>
            </div>
        }

        return (
                <div className="main-panel-wrap">
                    <div className="main-panel">
                        {['balance', 'term'].map(field_item)}
                        {panel_title('基本信息')}
                        {['realName', 'idCard'].map(disabled_field_item)}
                        {['creditCard', 'email', 'city', 'address', 'homeSituation'].map(field_item)}
                        {panel_title('紧急联系人')}
                        {['emContact', 'emRelationship', 'emMobile'].map(field_item)}
                        {panel_title('工作信息')}
                        {['income', 'workExperience'].map(field_item)}

                        <div className="agree">
                            <div className="text"> 点击“申请借款”即视为同意
                                <a href="/static/loan/products/index.html#/protocols/dumiao">《开户授权书》
                                </a>、
                                <a href="/static/loan/products/index.html#/protocols/info-collect">《个人信息采集授权说明》
                                </a>
                            </div>
                        </div>

                        <div className="btn-area">
                            <div className="btn" onClick={this.submitHandler}>
                                申请借款</div>
                        </div>

                        {field && <FieldPanel
                            field_key={this.state.field_key}
                            field={field} set_form_data={this.setFormData} />}
                    </div>
                </div>
            )
    }
}

$FW.DOMReady(() => {
    NativeBridge.setTitle('借款申请');
    NativeBridge.showHeader();
    ReactDOM.render(<Header title={'借款申请'} />, HEADER_NODE)
	ReactDOM.render(<MainPanel />, CONTENT_NODE)
})
