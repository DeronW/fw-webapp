function SuccessMask() {
    return (
        <div className="success-mask">
            {(SOURCE_TYPE !== 4 && !$FW.Browser.inApp()) &&
                <div className="close-icon" onClick={() => { gotoHandler('/static/loan/products/index.html#/') }}></div>
            }
            <div className="success-container">
                <div className="success-tip-1">您已成功申请</div>
                <img src="images/success.png"></img>
                <div className="success-tip-2">审核专员预计在<span>1个工作日内</span>联系您</div>
            </div>
        </div>
    )
}

class MainPanel extends React.Component {

    constructor() {
        super()
        this.model = new FormModel();
        window._form_model = this.model // 4 debug
        this.state = {
            hasRealName: true,
            form_data: { province: '北京市' },
            field_key: '',
            submitted: false
        };
    }

    componentDidMount() {
        // get phone & real name
        $FXH.Post(`${API_PATH}/api/userext/v1/userAuthentication.json`, { version: 'v1' })
            .then(data => {
                if (!data.realName) this.setState({ hasRealName: false });
                this.model.set_form_data(data);
                this.setState({ form_data: this.model.get_form_data() });
            })

        window.onpopstate = () => {
            this.setState({ field_key: null })
        }

        NativeBridge.trigger('cancel_refresh');
    }

    setFieldHandler = (key) => {
        this.setState({ field_key: key });
        history.pushState({}, '', `#${key}`);
        window.scroll(0, 0);
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
            $FXH.Post(`${API_PATH}/api/public/v1/mortgage.json`,
                this.state.form_data, false).then(data => {
                    this.setState({ submitted: true });
                }, e => { $FW.Component.Toast(e.message) })
    }

    render() {
        if (this.state.submitted) {
            return <SuccessMask />
        }

        let { field_key, form_data } = this.state,
            field = this.model.get_field(this.state.field_key);

        let field_item = key => {
            let f = this.model.get_field(key),
                text = f.value;
            return <div className="field-item" key={key} onClick={
                () => this.setFieldHandler(key)}>
                <div className="name-text">{f.name}</div>
                <div className="r">
                    <div className="text" style={{ color: f.value ? '#333' : '#999' }}>
                        {text || (f.options ? '请选择' : '请输入')}
                        {(text && f.name === '建筑面积') &&
                            <div className="suffix"> m<span>2</span></div>
                        }
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
                        <div className="text"> {f.value}</div>
                    </div>
                </div>
            </div>
        }


        return <div className="main-panel">
            <div className="input-field-container">
                {panel_title('申请人信息')}
                {['phone'].map(disabled_field_item)}
                {this.state.hasRealName ?
                    ['realName'].map(disabled_field_item) :
                    ['realName'].map(field_item)}
                {panel_title('抵押金额及期限')}
                {['mortgAmountRange', 'mortgTimeLong'].map(field_item)}
                {panel_title('抵押物信息')}
                {['city'].map(disabled_field_item)}
                {['area', 'housingEstate', 'houseBuildArea'].map(field_item)}
            </div>

            <div className="btn-area">
                <div className="btn" onClick={this.submitHandler}>提交</div>
            </div>

            {field &&
                <div>
                    <div className="field-mask"></div>
                    <FieldPanel
                        field_key={this.state.field_key}
                        field={field} set_form_data={this.setFormData} />
                </div>}
        </div>
    }
}

function gotoHandler(link, toNative, need_login) {
    if ($FW.Browser.inFXHApp() && toNative) return NativeBridge.toNative(toNative);

    if (link.indexOf('://') < 0) link = location.protocol + '//' + location.hostname + link;
    $FW.Browser.inApp() ? NativeBridge.goto(link, need_login) : location.href = encodeURI(link);
}

$FW.DOMReady(() => {
    NativeBridge.setTitle('房产抵押贷款');
    ReactDOM.render(<Header title={'房产抵押贷款'} />, HEADER_NODE)
    ReactDOM.render(<MainPanel />, CONTENT_NODE)
})
