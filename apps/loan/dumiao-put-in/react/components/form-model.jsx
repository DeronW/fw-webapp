
class FormModel {
    constructor() {
        this.form = {
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
            'realName': {
                name: '姓名',
                value: '',
                disabled: true
            },
            'idCard': {
                name: '身份证号',
                value: '',
                disabled: true
            }
        }
    }

    validate_field_value = (key, value) => {
        let err, field = this.form[key], vld = field.validate,
            v = typeof (value) !== 'undefined' ? value : field.value;
        if (vld) {
            for (let i = 0; i < vld.length; i++) {
                if (vld[i].test && vld[i].test(v)) {
                    err = vld[i].msg
                    break
                }
            }
        }
        return err
    }
    get_field = (key) => {
        return this.form[key]
    }
    set_field = (key, value, need_validate) => {
        let err
        if (need_validate) err = this.validate_field_value(key, value)
        if (!err && this.form[key])
            this.form[key].value = value
        return err
    }

    validate_form_data = () => {
        let err
        for (let key in this.form) {
            err = this.validate_field_value(key)
            if (err) break
        }
        return err
    }

    get_form_data = () => {
        let form = {
            productId: $FW.Format.urlQuery().pid,
            position: '0,0',
            userCookieID: '0000'
        }

        for (let key in this.form)
            form[key] = this.form[key].value;

        return form
    }

    set_form_data = data => {
        for (let i in data) this.set_field(i, data[i])
    }
}
