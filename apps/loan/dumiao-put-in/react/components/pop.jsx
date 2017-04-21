class WindowPop extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputPlaceholder: '',
            sumMoneyListObj: {
                moneyVal: props.getPopSumMoneyListObj.moneyVal,
                deadlineVal: props.getPopSumMoneyListObj.deadlineVal,
                deadlineValIndex: props.getPopSumMoneyListObj.deadlineValIndex,
                creditCardVal: props.getPopSumMoneyListObj.creditCardVal,
                emailVal: props.getPopSumMoneyListObj.emailVal,
                homeVal: props.getPopSumMoneyListObj.homeVal,
                realName: props.getPopSumMoneyListObj.realName,
                idCard: props.getPopSumMoneyListObj.idCard,
                city: props.getPopSumMoneyListObj.city,
                cityIndex: props.getPopSumMoneyListObj.cityIndex,
                marriageVal: props.getPopSumMoneyListObj.marriageVal,
                marriageIndex: props.getPopSumMoneyListObj.marriageIndex,
                urgentPerson: props.getPopSumMoneyListObj.urgentPerson,
                relationship: props.getPopSumMoneyListObj.relationship,
                relationshipIndex: props.getPopSumMoneyListObj.relationshipIndex,
                phone: props.getPopSumMoneyListObj.phone,
                income: props.getPopSumMoneyListObj.income,
                incomeIndex: props.getPopSumMoneyListObj.incomeIndex,
                yearsOfWork: props.getPopSumMoneyListObj.yearsOfWork,
                yearsOfWorkIndex: props.getPopSumMoneyListObj.yearsOfWorkIndex
            },
            inputType: '',
            selectList: '',
            tabShow: false,
            deadline: [],
            deadlineIconShow: false,
            deadlineIconIndex: 0
        }
    }
    componentWillMount() {
        const { selectList, getPopSumMoneyListObj, getPopInfo } = this.props

        if (getPopSumMoneyListObj.moneyVal >= 1000 && getPopSumMoneyListObj.moneyVal <= 3000) {
            this.setState({
                deadline: [1, 3, 6, 12]
            })
        } else if (getPopSumMoneyListObj.moneyVal >= 4000 && getPopSumMoneyListObj.moneyVal <= 5000) {
            this.setState({
                deadline: [3, 6, 12]
            })
        } else if (getPopSumMoneyListObj.moneyVal >= 6000 && getPopSumMoneyListObj.moneyVal <= 20000) {
            this.setState({
                deadline: [6, 12, 18, 24]
            })
        } else if (getPopSumMoneyListObj.moneyVal >= 21000 && getPopSumMoneyListObj.moneyVal <= 50000) {
            this.setState({
                deadline: [12, 18, 24]
            })
        } else if (getPopSumMoneyListObj.moneyVal < 1000 || getPopSumMoneyListObj.moneyVal > 50000) {
            this.setState({
                deadline: []
            })
        }

        this.setState({
            selectList: selectList
        })

        switch (selectList) {
            case 'sumMoney':
                this.setState({
                    inputPlaceholder: '请以1000为单位，上限为50000',
                    inputType: 'moneyVal'
                })
                break
            case 'creditCardVal':
                this.setState({
                    inputPlaceholder: '请输入信用卡号',
                    inputType: 'creditCardVal',
                })
                break
            case 'emailVal':
                this.setState({
                    inputPlaceholder: '请输入邮箱',
                    inputType: 'emailVal'
                })
                break
            case 'homeVal':
                this.setState({
                    inputPlaceholder: '请输入居住地',
                    inputType: 'homeVal'
                })
                break
            case 'city':
                this.setState({
                    inputPlaceholder: '',
                    inputType: 'city'
                })
                break
            case 'marriageVal':
                this.setState({
                    inputPlaceholder: '请输入婚姻状况',
                    inputType: 'marriageVal'
                })
                break
            case 'urgentPerson':
                this.setState({
                    inputPlaceholder: '请输入亲属或好友姓名',
                    inputType: 'urgentPerson'
                })
                break
            case 'relationship':
                this.setState({
                    inputPlaceholder: '紧急联系人关系',
                    inputType: 'relationship'
                })
                break
            case 'phone':
                this.setState({
                    inputPlaceholder: '请输入联系人手机号',
                    inputType: 'phone'
                })
                break
            case 'income':
                this.setState({
                    inputPlaceholder: '',
                    inputType: 'income'
                })
                break
            case 'yearsOfWork':
                this.setState({
                    inputPlaceholder: '',
                    inputType: 'yearsOfWork'
                })
                break
        }

    }

    handlerBack() {
        const { getPopShow } = this.props

        getPopShow(false)
    }

    changeInput(e) {
        if (this.state.selectList === 'sumMoney') {
            if (verificationNum(e.target.value)) {
                let copSumMoneyListObj1 = this.state.sumMoneyListObj
                copSumMoneyListObj1.moneyVal = e.target.value
                copSumMoneyListObj1.deadlineVal = ''
                copSumMoneyListObj1.deadlineValIndex = null

                this.setState({
                    copSumMoneyListObj1,
                    deadlineIconShow: false,
                })

                if (e.target.value >= 1000 && e.target.value <= 3000) {
                    this.setState({
                        deadline: [1, 3, 6, 12]
                    })
                } else if (e.target.value >= 4000 && e.target.value <= 5000) {
                    this.setState({
                        deadline: [3, 6, 12]
                    })
                } else if (e.target.value >= 6000 && e.target.value <= 20000) {
                    this.setState({
                        deadline: [6, 12, 18, 24]
                    })
                } else if (e.target.value >= 21000 && e.target.value <= 50000) {
                    this.setState({
                        deadline: [12, 18, 24]
                    })
                } else if (e.target.value < 1000 || e.target.value > 50000) {
                    this.setState({
                        deadline: []
                    })
                }
            }

        } else if (this.state.selectList === 'creditCardVal') {
            if (verificationNum(e.target.value)) {
                let copSumMoneyListObj2 = this.state.sumMoneyListObj
                copSumMoneyListObj2.creditCardVal = e.target.value
                this.setState({
                    copSumMoneyListObj2
                })
            }

        } else if (this.state.selectList === 'emailVal') {
            let copSumMoneyListObj3 = this.state.sumMoneyListObj
            copSumMoneyListObj3.emailVal = e.target.value
            this.setState({
                copSumMoneyListObj3
            })
        } else if (this.state.selectList === 'homeVal') {
            let copSumMoneyListObj4 = this.state.sumMoneyListObj
            copSumMoneyListObj4.homeVal = e.target.value
            this.setState({
                copSumMoneyListObj4
            })
        } else if (this.state.selectList === 'urgentPerson') {
            let copSumMoneyListObjUrgentPerson = this.state.sumMoneyListObj
            copSumMoneyListObjUrgentPerson.urgentPerson = e.target.value
            this.setState({
                copSumMoneyListObjUrgentPerson
            })
        } else if (this.state.selectList === 'phone') {
            let copSumMoneyListObjPhone = this.state.sumMoneyListObj
            copSumMoneyListObjPhone.phone = e.target.value
            this.setState({
                copSumMoneyListObjPhone
            })
        }
    }
    handlerDate(e) {

        const inputVal = this.state.sumMoneyListObj.moneyVal


        if (inputVal.length == 0) {
            $FW.Component.Toast("金额不能为空");
        } else if ((inputVal % 1000) != 0) {
            $FW.Component.Toast("请以1000为单位，上限为50000");
        } else {
            this.setState({
                tabShow: !this.state.tabShow
            })
        }
    }

    handlerSelectDeadline(index, data) {
        const copState = this.state.sumMoneyListObj

        copState.deadlineVal = data,
        copState.deadlineValIndex = index

            this.setState({
                deadlineIconShow: true,
                deadlineIconIndex: index,
                tabShow: false,
                copState
            })
    }

    callbackBtnVal(val) {
        //console.log( this.state.sumMoneyListObj)

        return {
            moneyVal: this.state.sumMoneyListObj.moneyVal,
            deadlineVal: this.state.sumMoneyListObj.deadlineVal,
            deadlineValIndex: this.state.sumMoneyListObj.deadlineValIndex,
            creditCardVal: this.state.sumMoneyListObj.creditCardVal,
            emailVal: this.state.sumMoneyListObj.emailVal,
            realName: this.state.sumMoneyListObj.realName,
            idCard: this.state.sumMoneyListObj.idCard,
            homeVal: this.state.sumMoneyListObj.homeVal,
            city: this.state.sumMoneyListObj.city,
            cityIndex: this.state.sumMoneyListObj.cityIndex,
            marriageVal: this.state.sumMoneyListObj.marriageVal,
            marriageIndex: this.state.sumMoneyListObj.marriageIndex,
            urgentPerson: this.state.sumMoneyListObj.urgentPerson,
            relationship: this.state.sumMoneyListObj.relationship,
            relationshipIndex: this.state.sumMoneyListObj.relationshipIndex,
            phone: this.state.sumMoneyListObj.phone,
            income: this.state.sumMoneyListObj.income,
            incomeIndex: this.state.sumMoneyListObj.incomeIndex,
            yearsOfWork: this.state.sumMoneyListObj.yearsOfWork,
            yearsOfWorkIndex: this.state.sumMoneyListObj.yearsOfWorkIndex
        }
    }

    handlerSelectMarriage(index, data) {
        let copState = this.state.sumMoneyListObj
        copState.marriageVal = data,
            copState.marriageIndex = index

        this.setState({
            copState
        })

    }
    handlerSelectRelationship(data, index) {
        let copState = this.state.sumMoneyListObj
        copState.relationship = data
        copState.relationshipIndex = index

        this.setState({
            copState
        })
    }

    handlerSelectJob(data, index) {
        const { selectList } = this.props
        let copState = this.state.sumMoneyListObj
        let jobSelectType

        if (selectList == 'income') {
            copState.income = data
            copState.incomeIndex = index
        } else if (selectList == 'yearsOfWork') {
            copState.yearsOfWork = data
            copState.yearsOfWorkIndex = index
        }

        this.setState({
            copState
        })
    }

    handlerCitySelect(data, i, cntData, index) {
        let copState = this.state.sumMoneyListObj
        copState.city = cntData.name
        copState.cityIndex = [data[0], index]

        this.setState({
            copState
        })
    }

    render() {
        const { selectList, popTitle, getPopShow, getPopInfo } = this.props

        let listNextTab = () => {
            return <div className="list list-next-tab">
                <div className="" onClick={this.handlerDate.bind(this)}>
                    <div className="name-text">期限</div>
                    <div className="r">
                        <div className="text">{this.state.sumMoneyListObj.deadlineVal} {this.state.sumMoneyListObj.deadlineVal != '' ? '个月' : ''}</div>
                        <div className="arrow-icon"></div>
                    </div>

                </div>
                {this.state.tabShow ?
                    <div className="tab-list">
                        {
                            this.state.deadline.map((data, index) => {
                                return <div className="block" key={index} onClick={this.handlerSelectDeadline.bind(this, index, data)}>
                                    <div className="info-text">{data}个月</div>
                                    {
                                        index == this.state.sumMoneyListObj.deadlineValIndex ? <div className="select-icon"></div> : null
                                    }
                                </div>
                            })
                        }

                    </div> : null
                }
            </div>

        }

        let selectBasicVal = (index) => {
            if (this.state.sumMoneyListObj.marriageIndex != '' || this.state.sumMoneyListObj.marriageIndex == '0') {
                if (this.state.sumMoneyListObj.marriageIndex == index) {
                    return <div className="select-icon"></div>
                }

            }
        }

        let urgentContactPersonVal = (index) => {
            if (this.state.sumMoneyListObj.relationshipIndex != '' || this.state.sumMoneyListObj.relationshipIndex == '0') {
                if (this.state.sumMoneyListObj.relationshipIndex == index) {
                    return <div className="select-icon"></div>
                }

            }
        }

        let jobInfoVal = (index) => {
            let jobSelectType

            if (selectList == 'income') {
                jobSelectType = 'incomeIndex'
            } else if (selectList == 'yearsOfWork') {
                jobSelectType = 'yearsOfWorkIndex'
            }

            if (this.state.sumMoneyListObj[jobSelectType] != '' || this.state.sumMoneyListObj[jobSelectType] == '0') {
                if (this.state.sumMoneyListObj[jobSelectType] == index) {
                    return <div className="select-icon"></div>
                }

            }
        }

        let marriageList = () => {
            const MARRIAGE_ARR = ['未婚', '已婚, 无子女', '已婚,有子女']

            return <div className="cnt-pop">
                <div className="ui-list marriage-list">
                    {
                        MARRIAGE_ARR.map((data, index) => {
                            return <div className="list" onClick={this.handlerSelectMarriage.bind(this, index, data)} key={index}>
                                <div className="name-text">{data}</div>
                                <div className="r">
                                    {
                                        selectBasicVal(index)
                                    }
                                </div>
                            </div>
                        })
                    }

                </div>
            </div>
        }

        let relationshipList = () => {
            const RELATIONSHIP_ARR = ['父母', '配偶', '兄弟姐妹', '同事', '同学', '朋友']

            return <div className="cnt-pop">
                <div className="ui-list marriage-list">
                    {
                        RELATIONSHIP_ARR.map((data, index) => {
                            return <div className="list" key={index} onClick={this.handlerSelectRelationship.bind(this, data, index)}>
                                <div className="name-text">{data}</div>
                                <div className="r">
                                    {urgentContactPersonVal(index)}

                                </div>
                            </div>
                        })
                    }

                </div>
            </div>
        }

        let jobInfoList = () => {
            let jobInfoArr = []

            if (selectList == 'income') {
                jobInfoArr = ['3000 元以下', '3001 - 5000 元', '5001 - 10000 元', '10001 - 20000 元', '20000元以上']
            } else if (selectList == 'yearsOfWork') {
                jobInfoArr = ['1年以下', '1-5年', '6-10年', '10年以上']
            }

            return <div className="cnt-pop">
                <div className="ui-list marriage-list">
                    {
                        jobInfoArr.map((data, index) => {
                            return <div className="list" key={index} onClick={this.handlerSelectJob.bind(this, data, index)}>
                                <div className="name-text">{data}</div>
                                <div className="r">
                                    {jobInfoVal(index)}
                                </div>
                            </div>
                        })
                    }

                </div>
            </div>
        }

        let cityListVal = (data, index) => {
            if (this.state.sumMoneyListObj.cityIndex != '') {
                if (this.state.sumMoneyListObj.cityIndex[0] == data && this.state.sumMoneyListObj.cityIndex[1] == index) {
                    return <div className="select-icon"></div>
                }

            }
        }

        let ABCStyle = {
            height: 80 / (CITY_ARR.length + 1) + '%',
            lineHeight: '100%'
        }

        let cityList = () => {
            return <div className="cnt-pop" style={{ marginBottom: '150px' }}>
                <div className="ABC-find">
                    {
                        CITY_ARR.map((data, index) => {
                            return <a href={'#' + data[0]} className="" key={index} style={ABCStyle}>{data[0]}</a>
                        })
                    }

                </div>

                <div className="ui-list marriage-list city-list">
                    {
                        CITY_ARR.map((data, i) => {

                            return <div key={i}>
                                <a className="city-name" name={data[0]}>{data[0]}</a>

                                {
                                    data[1].map((cntData, index) => {
                                        return <div className="list" key={index} onClick={this.handlerCitySelect.bind(this, data, i, cntData, index)}>
                                            <div className="name-text">{cntData.name}</div>
                                            <div className="r">
                                                {
                                                    cityListVal(data[0], index)
                                                }

                                            </div>
                                        </div>
                                    })
                                }

                            </div>
                        })
                    }

                </div>
            </div>
        }



        return (
            <div className="window-pop">
                <div className="top">
                    <div className="back" onClick={this.handlerBack.bind(this)} ></div>
                    <div className="title">{popTitle}</div>
                </div>

                {selectList != 'marriageVal' && selectList != 'relationship' && selectList != 'income' && selectList != 'yearsOfWork' && selectList != 'city' ?
                    <div className="cnt-pop">
                        {
                            selectList == 'creditCardVal' ? <div className="ui-title">请提供与实际借款人姓名一致的信用卡号</div> : null
                        }

                        <div className="ui-list">
                            <div className="list">
                                <div className="name-text">{selectList == 'sumMoney' ? '借款金额' : popTitle}</div>
                                <div className="r no">
                                    <input type="text"
                                        placeholder={this.state.inputPlaceholder}
                                        onChange={this.changeInput.bind(this)}
                                        value={this.state.sumMoneyListObj[this.state.inputType]}
                                    />
                                </div>
                            </div>

                            {selectList == 'sumMoney' ? listNextTab() : null}
                        </div>
                    </div> : null
                }

                {
                    selectList == 'marriageVal' ? marriageList() : null
                }

                {
                    selectList == 'relationship' ? relationshipList() : null
                }

                {
                    selectList == 'income' || selectList == 'yearsOfWork' ? jobInfoList() : null
                }

                {
                    selectList == 'city' ? cityList() : null
                }

                <Btn
                    btnValFun={this.callbackBtnVal.bind(this)}
                    getPopInfoProps={getPopInfo}
                    getPopShowProps={getPopShow}
                    getSelectListProps={selectList}
                    pushType={'popBtn'}
                />
            </div>
        )
    }
}
