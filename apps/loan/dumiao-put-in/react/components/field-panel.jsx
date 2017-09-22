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
        // 如果修改字段是借款金额, 那么要重置借款期限
        if (field_key === 'balance') dict.term = '';
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

    focusHandler = () => {
        ReactDOM.findDOMNode(this.refs['field-edit-panel']).style.top = document.documentElement.scrollTop || document.body.scrollTop;
        ReactDOM.findDOMNode(this.refs['field-edit-panel']).style.position = "absolute";
    }

    render() {
        let { value } = this.state, { field, field_key } = this.props;

        let field_edit_panel_style = {
            position: "fixed",
            top: $FW.Browser.inWeixin() || $FW.Browser.inApp() ? '0px' : '100px',
            width: "100%",
            height: "100%",
            paddingTop: "20px",
            background: "#f0f0f0"
        }

        let input_type = () => {
            return <div className="field-item">
                <div className="name-text">{field.name}</div>
                <div className="r">
                    <div className="text">
                        <input placeholder={field.placeholder}
                            onChange={this.textChangeHandler}
                            value={value}
                            onFocus={this.focusHandler}
                        />
                    </div>
                </div>
            </div>
        }

        let select_type = () => {
            let option = i => {
                let cn = `option-item ${i.value == this.state.value && 'active'}`
                return <div key={i.value} className={cn} onClick={
                    () => this.selectChangeHandler(i.value)}>
                    {i.text}
                </div>
            }
            return <div> {field.options.map(option)} </div>
        }

        return <div className="field-edit-panel" ref="field-edit-panel" style={field_edit_panel_style}>
            {field.describe &&
                <div className="section-title">{field.describe}</div>}
            {field.options ?
                select_type() :
                input_type()}

            {field_key === 'city' &&
                <CityPanel value={this.state.value}
                    select_handler={this.selectChangeHandler} />}

            {!field.options &&
                <div className="btn-area">
                    <div className="btn" onClick={this.confirmHandler}>
                        确定</div>
                </div>
            }
        </div>
    }
}

class CityPanel extends React.Component {
    constructor(props) {
        super(props)
    }
    setQuickPosition = (clientY, offsetTop, offsetHeight) => {
        let p;
        p = 1 - (offsetTop + offsetHeight - clientY) / offsetHeight;
        p = Math.max(p, 0)
        p = Math.min(p, 1)
        if (p < 0.05) p = 0;
        if (p > 0.95) p = 1;
        let s = this.refs.scroll;
        s.scrollTop = s.scrollHeight * Math.round(p * 100) / 100
    }
    touchStartHandler = event => {
        event.stopPropagation()
        this.setQuickPosition(
            event.changedTouches[0].clientY,
            event.currentTarget.offsetTop,
            event.currentTarget.offsetHeight)
    }
    touchMoveHandler = event => {
        event.stopPropagation()
        this.setQuickPosition(
            event.changedTouches[0].clientY,
            event.currentTarget.offsetTop,
            event.currentTarget.offsetHeight)
    }
    render() {
        let HOT_CITY_LIST = ["北京市", "上海市", "广州市", "深圳市", "杭州市"];
        let alphabet = [];
        for (let i = 65; i < 91; i++)
            alphabet.push(String.fromCharCode(i));

        let city_option = name => {
            let cn = `option-item ${name == this.props.value && 'active'}`
            return <div key={name} className={cn} onClick={
                () => this.props.select_handler(name)}>
                {name}
            </div>
        }

        let hot_city_option = name => {
            return <div key={name} className="hot-city-item" onClick={
                () => this.props.select_handler(name)}>
                {name}
            </div>
        }

        let city_section = char => {
            if (!CITY_LIST[char]) return null;
            return <div key={char}>
                <div className="section-title">{char}</div>
                {CITY_LIST[char].map(city_option)}
            </div>
        }

        return (
                <div>
                    <div className="scroll-panel" ref="scroll">
                        <div className="hot-city-title">热门城市</div>
                        <div className="hot-cities">
                            {HOT_CITY_LIST.map(hot_city_option)}
                        </div>
                        <div className="city-list">
                            {alphabet.map(city_section)}
                            <div className="quick-select"
                                 onTouchStart={this.touchStartHandler}
                                 onTouchMove={this.touchMoveHandler}>
                                {alphabet.map(char => <div key={char}>{char}</div>)}
                            </div>
                        </div >
                    </div>
                </div>
            )

    }
}
