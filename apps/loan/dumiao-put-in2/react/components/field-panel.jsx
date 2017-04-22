class FieldPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.field.value
        }
    }
    componentDidMount() {
    }
    confirmHandler = () => {
        let { field, field_key } = this.props, { value } = this.state,
            vld = field.validate || [], err;
        for (let i = 0; i < vld.length; i++) {
            let test = vld[i].test
            let check = v => typeof (test) === 'function' ? test(v) : true;

            if (check(value)) {
                err = vld[i].msg
                break
            }
        }
        err ?
            $FW.Component.Toast(err) :
            this.props.set_form_data({ [field_key]: value })
    }
    textChangeHandler = (e) => {
        this.setState({ value: e.target.value })
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
                let cn = `option-item ${i.value == this.state.value && 'active'}`
                return <div key={i.value} className={cn} onClick={
                    () => this.selectChangeHandler(i.value)}>
                    {i.text}
                </div>
            }
            return <div> {field.options.map(option)} </div>
        }



        return <div className="field-edit-panel">
            {field.describe &&
                <div className="section-title">{field.describe}</div>}
            {field.options ?
                select_type() :
                input_type()}

            {field_key === 'city' && <CityPanel />}

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
    render() {
        let alphabet = [];
        for (let i = 65; i < 91; i++)
            alphabet.push(String.fromCharCode(i));

        let city_option = name => {
            let cn = `option-item ${name == this.props.name && 'active'}`
            return <div key={name} className={cn} onClick={
                () => this.props.selectHandler(name)}>
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

        return <div className="city-list">
            {alphabet.map(city_section)}
            <div className="quick-select">
                {alphabet.map(char => <div key={char}>{char}</div>)}
            </div>
        </div >
    }
}
