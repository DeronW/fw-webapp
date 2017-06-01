
class FormModel {
    constructor() {
        this.form = {
            'phone': {
                name: '手机号',
                value: ''
            },
            'realName': {
                name: '姓名',
                value: '',
                inputAttr: {
                    type: 'text',
                    maxLength: '20'
                }
            },
            'mortgAmountRange': {
                name: '抵押金额',
                value: '',
                options: [
                    '100万-200万',
                    '200万-300万',
                    '300万-400万',
                    '400万-500万',
                    '500万-1000万'
                ]
            },
            'mortgTimeLong': {
                name: '抵押年限',
                value: '',
                options: [
                    '半年以下',
                    '半年-1年',
                    '1年-10年',
                    '10年-25年',
                    '25年以上'
                ]
            },
            'city': {
                name: '所在区域',
                value: '北京市'
            },
            'area': {
                name: '所在区县',
                value: '',
                options: ['东城区', '西城区', '朝阳区', '海淀区', '丰台区', '石景山区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '平谷区', '怀柔区', '延庆县', '密云县', '北京经济技术开发区', '北京周边']
            },
            'housingEstate': {
                name: '小区名称',
                value: '',
                inputAttr: {
                    type: 'text',
                    maxLength: '20'
                }
            },
            'houseBuildArea': {
                name: '建筑面积',
                value: '',
                inputAttr: {
                    type: 'tel',
                    maxLength: '4'
                },
                inputRestrict: [
                    v => /[^\d]/.test(v)
                ],
                validate: [{
                    test: v => v == 0,
                    msg: '建筑面积必须大于0'
                }],
            }
        }
    }

    validate_field_value = (key, value) => {
        let err, field = this.form[key], vld = field.validate,
            v = typeof (value) !== 'undefined' ? value : field.value;
        if (vld) {
            for (let i = 0; i < vld.length; i++) {
                if (vld && vld[i].test && vld[i].test(v)) {
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
            if (this.form[key].value == '') {
                err = '请填写全部信息';
                break
            }
            err = this.validate_field_value(key)
            if (err) break
        }
        return err
    }

    get_form_data = () => {
        let form = {
            province: '北京省'
        }

        for (let key in this.form)
            form[key] = this.form[key].value;

        return form
    }

    set_form_data = data => {
        for (let i in data) {
            if (!data[i]) return
            this.set_field(i, data[i]);
        }
    }
}
