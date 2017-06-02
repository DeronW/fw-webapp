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
        if (value === '') {
            err = `请输入内容`;
            return $FW.Component.Toast(err)
        }
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
        let v = e.target.value, { field } = this.props, restrict = field.inputRestrict || [];
        for (let i = 0; i < restrict.length; i++) {
            if (restrict[i](v)) return
        }
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
                        <input {...field.inputAttr}
                            onChange={this.textChangeHandler}
                            value={value}
                            className={field.name === '建筑面积' ? 'hasSuffix' : ''}/>
                        { field.name === '建筑面积' &&
                            <div className="suffix">m<span>2</span></div>
                        }
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
            return <div>
                <div className="option-label">选择{field.name}</div>
                {field.options.map(option)}
            </div>
        }

        return <div className={`${field.name === '所在区县' ? 'field-edit-panel field-edit-panel-area' : 'field-edit-panel'}`}>
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
