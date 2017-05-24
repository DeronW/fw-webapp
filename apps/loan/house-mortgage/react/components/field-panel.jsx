class FieldPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.field.value
        }
    }
    confirmHandler = () => {
        let { field, field_key } = this.props, { value } = this.state,
            vld = field.validate || [], err;
        for (let i = 0; i < vld.length; i++) {
            if (vld[i].test && vld[i].test(value)) {
                err = vld[i].msg
                break
            }
        }
        let dict = { [field_key]: value }
        err ?
            $FW.Component.Toast(err) :
            this.props.set_form_data(dict)
    }
    textChangeHandler = (e) => {
        let v = e.target.value, { field } = this.props;
        if (typeof (field.format) === 'function') v = field.format(v)
        this.setState({ value: v })
    }
    selectChangeHandler = (v) => {
        this.setState({ value: v }, this.confirmHandler)
    }
    render() {
        let { value } = this.state, { field, field_key } = this.props;

        let input_type = () => {
            return <div className="field-item">
                <div className="name-text">{field.name}</div>
                <div className="r">
                    <div className="text">
                        <input placeholder={field.placeholder}
                            onChange={this.textChangeHandler}
                            value={value} />
                    </div>
                </div>
            </div>
        }

        let select_type = () => {
            let option = i => {
                let cn = `option-item ${i == this.state.value && 'active'}`
                return <div key={i} className={cn} onClick={
                    () => this.selectChangeHandler(i)}>
                    {i}
                </div>
            }
            return <div> {field.options.map(option)} </div>
        }

        return <div className="field-edit-panel" style={{
            top: $FW.Browser.inWeixin() || $FW.Browser.inApp() || $FW.Browser.inFXHApp() ? '0px' : '100px'
        }}>
            {field.describe &&
                <div className="section-title">{field.describe}</div>}
            {field.options ?
                select_type() :
                input_type()}

            {!field.options &&
                <div className="btn-area">
                    <div className="btn" onClick={this.confirmHandler}>
                        确定</div>
                </div>
            }
        </div>
    }
}
