import React from 'react'
import { render } from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/loan-fq-form.css'
import { observer, inject } from 'mobx-react'
import { Header, CitySelector } from '../../lib/components'
import { Utils, Components } from 'fw-javascripts'
import { Post, NativeBridge, Browser, Storage } from '../../lib/helpers'


const Model = {
    'balance': {
        name: '借款金额',
        placeholder: '请以1000为单位，上限为50000',
        value: '',
        validate: [{
            test: v => !v,
            msg: '请输入借款金额'
        }, {
            test: v => v % 1000 !== 0 || v > 50000,
            msg: '请以1000为单位，上限为50000'
        }],
        format: x => parseInt(x) || ''
    },
    'term': {
        name: '期限',
        placeholder: '请选择期限',
        value: '',
        options: [],
        option_pool: [{
            text: '1个月',
            value: '1'
        }, {
            text: '3个月',
            value: '3'
        }, {
            text: '6个月',
            value: '6'
        }, {
            text: '12个月',
            value: '12'
        }, {
            text: '18个月',
            value: '18'
        }, {
            text: '24个月',
            value: '24'
        }],
        validate: [{
            test: v => !v,
            msg: '请选择借款时间'
        }]
    },
    'creditCard': {
        name: '信用卡',
        placeholder: '请输入信用卡号',
        describe: '请提供与实际借款人姓名一致的信用卡号',
        value: '',
        validate: [
            {
                test: v => !v,
                msg: '信用卡不能为空'
            }
        ]
    },
    'email': {
        name: '邮箱',
        placeholder: '请输入邮箱',
        value: '',
        validate: [
            {
                test: v => !v,
                msg: '邮箱不能为空'
            },
            {
                test: v => !/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(v),
                msg: '邮箱格式不正确'
            }
        ]
    },
    'city': {
        name: '城市',
        value: '',
        options: [],
        validate: [
            {
                test: v => !v,
                msg: '请选择城市'
            }
        ]
    },
    'address': {
        name: '现居住地',
        placeholder: '请输入居住地',
        value: '',
        validate: [
            {
                test: v => !v,
                msg: '请输入居住地'
            }
        ]
    },
    'homeSituation': {
        name: '婚姻',
        value: '',
        options: [{
            text: '未婚',
            value: '1'
        }, {
            text: '已婚, 无子女',
            value: '2'
        }, {
            text: '已婚,有子女',
            value: '3'
        }],
        validate: [
            {
                test: v => !v,
                msg: '请选择婚姻状况'
            }
        ]
    },
    'emContact': {
        name: '紧急联系人',
        placeholder: '请输入亲属或好友姓名',
        value: '',
        validate: [
            {
                test: v => !v,
                msg: '请输入亲属或好友姓名'
            }
        ]
    },
    'emRelationship': {
        name: '联系人关系',
        value: '',
        options: [{
            text: '父母',
            value: '0'
        }, {
            text: '配偶',
            value: '1'
        }, {
            text: '子女',
            value: '2'
        }, {
            text: '兄弟姐妹',
            value: '3'
        }, {
            text: '同事',
            value: '4'
        }, {
            text: '同学',
            value: '5'
        }, {
            text: '朋友',
            value: '6'
        }],
        validate: [{
            test: v => parseInt(v) === NaN,
            msg: '请选择紧急联系人关系'
        }]
    },
    'emMobile': {
        name: '联系人手机',
        value: '',
        placeholder: '请输入联系人手机号',
        validate: [{
            test: v => !v,
            msg: '请输入联系人手机号'
        }, {
            test: v => v.length != 11,
            msg: '手机号格式不正确'
        }]
    },
    'income': {
        name: '税后月收入',
        value: '',
        options: [{
            text: '3000以下',
            value: '0'
        }, {
            text: '3000-5000元',
            value: '1'
        }, {
            text: '5001-10000元',
            value: '2'
        }, {
            text: '10001-20000元',
            value: '3'
        }, {
            text: '20000元以上',
            value: '4'
        }],
        validate: [{
            test: v => parseInt(v) === NaN,
            msg: '请选择税后月收入'
        }]
    },
    'workExperience': {
        name: '工作年限',
        value: '',
        options: [{
            text: '1年以下',
            value: '0'
        }, {
            text: '1-5年',
            value: '1'
        }, {
            text: '6-10年',
            value: '2'
        }, {
            text: '10年以上',
            value: '3'
        }],
        validate: [{
            test: v => parseInt(v) === NaN,
            msg: '请选择工作年限'
        }]
    },
    'idCard': { name: '身份证号' },
    'realName': { name: '姓名' },
}

/* parameters
    <DisplayItem field="" immutable=Bool history={history} />
*/
const DisplayItem = inject('fq')(observer(CSSModules((props) => {
    
        let { fq, field, immutable, history } = props,
            itemPlaceholder = Model[field].options !== undefined ? '请选择' : '请输入',
            itemStyleName = immutable ? 'item-container' : 'mutable-item-container';

        var itemValue = fq.put_in_data[field];    

        if(Model[field].options !== undefined){
            let index = Model[field].options.findIndex(i=>i["value"] == itemValue);
            let indexOption = Model[field].options[index];
            if(indexOption !== undefined){
                itemValue = indexOption.text
            }
        }
        
        return (
            <div className={styles[itemStyleName]}
                onClick={() => { !immutable && fq.setCurrentPanel(history, field) }}>
                <div styleName="item-name">{Model[field].name}</div>
                <div styleName="item-value" style={{ 'color': itemValue ? '#333' : '#999' }}>
                    {itemValue || itemPlaceholder}
                </div>
            </div>
        )
    
    }, styles)))
    
    
    /* parameters
        <InputItem field="" history={history} />
    */
    @inject('fq')
    @observer
    @CSSModules(styles)
    class InputItem extends React.Component {
    
        state = { value: '' }
    
        componentDidMount() {
            let { fq, field } = this.props;
            this.setState({ value: fq.put_in_data[field] })
        }
    
        handleInput = e => {
            let v = e.target.value;
            this.setState({ value: v })
        }
    
        handleSubmit = () => {
            let v = this.state.value;
            let { fq, field, history } = this.props;
            let err = '';
            let vld = Model[field].validate || [];
            for (let i = 0; i < vld.length; i++) {
                if (vld[i].test && vld[i].test(v)) {
                    err = vld[i].msg
                    break
                }
            }

            if(field == 'balance'){
                err ? Components.showToast(err) :
                    fq.setPanelData(history, 'balance', v)
                    fq.put_in_data.term = ''  
            }else{
                err ? Components.showToast(err) : fq.setPanelData(history, field, v)
            }   
        }
    
        render() {
            let { mortgage, field } = this.props,
                value = this.state.value;
            return (
                <div>
                    <div styleName="input-item-container">
                        <div styleName="item-name">{Model[field].name}</div>
                        <input
                            type={field === 'creditCard' || field === 'emMobile' ? "number" : "text"}
                            placeholder={field == 'balance' ? Model[field].placeholder :"请输入"}
                            value={value}
                            onChange={this.handleInput} />
                    </div>
                    <div styleName="submit-btn-container">
                        <a styleName="submit-btn"
                            style={{ 'background':'#639afb'}}
                            onClick={this.handleSubmit}>
                            确定
                        </a>
                    </div>
                </div>
            )
        }
    }
    
    /* parameters
        <SelectItem field="" history={history} />
    */
    @inject('fq')
    @observer
    @CSSModules(styles)
    class SelectItem extends React.Component {

        constructor(props){
            super(props)
        }
        
        changeHandler = (v) => {
            this.props.fq.put_in_data['city'] = v;
            this.closeHandler();
        }

        closeHandler = () => {
            let {history} = this.props;
            history.goBack();
        }

        render(){
            let { fq, field, immutable, history } = this.props;
            let new_array = [];

            if (field == 'term') {
                let pool = Model[field].option_pool;
                Model[field].options = [pool[1], pool[2], pool[3]];
                if (fq.put_in_data.balance > 3000) {
                    Model[field].options = [pool[1], pool[2], pool[3]]
                }
                if (fq.put_in_data.balance > 5000) {
                    Model[field].options = [pool[2], pool[3], pool[4], pool[5]]
                }
                if (fq.put_in_data.balance > 20000) {
                    Model[field].options = [pool[3], pool[4], pool[5]]
                }
            }

            let itemOptions = Model[field].options.map((o)=>{new_array.push(o["text"])});

            var itemValue = fq.put_in_data[field];      
            
            if(Model[field].options !== undefined){
                let index = Model[field].options.findIndex(i=>i["value"] == itemValue);
                let indexOption = Model[field].options[index];
                if(indexOption !== undefined){
                    itemValue = indexOption.text
                }
            }

            let gen_options = (optValue) => {
                let optStyleName = optValue === itemValue ? 'selected-option' : 'unselected-option';
                let optIndex = Model[field].options.findIndex(i=>i['text'] == optValue);
                let optIndexValue = Model[field].options[optIndex]['value'];
                return (
                    <div key={optValue}
                        className={styles[optStyleName]}
                        onClick={() => { fq.setPanelData(history, field, optIndexValue)}}>
                        {optValue}
                    </div>
                )
            }

            const selectOptions = field == 'city' ? 
                <CitySelector selected={fq.put_in_data['city']} changeHandler={v=>this.changeHandler(v)} closeHandler={this.closeHandler}/>
             : (
                <div styleName="option-grp">
                {new_array.map(gen_options)}
            </div> )

            return (
                <div>
                    <div styleName="select-label">{`选择${Model[field].name}`}</div>
                    {selectOptions}
                </div>
            )
        }
    }
    
    @inject('fq')
    @observer
    @CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
    class FqForm extends React.Component {

        componentDidMount() {
            document.title = '借款申请';
            this.props.fq.fetchPutInData();
        }
    
        render() {
            let { fq, history } = this.props,
                currentPanel = history.location.hash.slice(1);

            return (
                <div styleName="cnt-container">
                    <Header title="借款申请" history={history} />
    
                    {currentPanel && (
                        Model[currentPanel].options ?
                            <SelectItem field={currentPanel} history={history} />
                            :
                            <InputItem field={currentPanel} history={history} />)}
                    {!currentPanel && <div>
                        <div styleName="item-grp">
                            <DisplayItem field="balance" history={history}/>
                            <DisplayItem field="term" history={history}/>
                        </div>
                        <div styleName="item-grp-name">基本信息</div>
                        <div styleName="item-grp">
                            <DisplayItem field="realName" history={history} immutable/>
                            <DisplayItem field="idCard" history={history} immutable />
                            <DisplayItem field="creditCard" history={history} />
                            <DisplayItem field="email" history={history} />
                            <DisplayItem field="city" history={history}/>
                            <DisplayItem field="address" history={history}/>
                            <DisplayItem field="homeSituation" history={history}/>
                        </div>
    
                        <div styleName="item-grp-name">紧急联系人</div>
                        <div styleName="item-grp">
                            <DisplayItem field="emContact" history={history} />
                            <DisplayItem field="emRelationship" history={history} />
                            <DisplayItem field="emMobile" history={history} />
                        </div>
    
                        <div styleName="item-grp-name">工作信息</div>
                        <div styleName="item-grp">
                            <DisplayItem field="income" history={history} />
                            <DisplayItem field="workExperience" history={history} />
                        </div>

                        <div styleName="agree">
                        <div styleName="text"> 点击“申请借款”即视为同意
                            <a href="/static/loan/products/index.html#/protocols/dumiao">《开户授权书》
                            </a>、
                            <a href="/static/loan/products/index.html#/protocols/info-collect">《个人信息采集授权说明》
                            </a>
                        </div>
                    </div>
    
                        <div styleName="submit-btn-container">
                            <a styleName="submit-btn"
                                style={{ 'background': fq.allFieldsFilled ? '#639afb' : '#ccc' }}
                                onClick={() => { fq.submit(history) }}>
                                申请借款
                            </a>
                        </div>
                    </div>}
                </div>
            )
        }
    }
    
    export default FqForm