
class SumList extends React.Component {
	constructor(props) {
		super(props)
	}

	handlerSum() {
		const { selectListFun } = this.props

		selectListFun('sumMoney', '金额和期限', true)
	}
	render() {
		const { getPopVal, getSumMoneyPopVal } = this.props

		//console.log(getSumMoneyPopVal)

		return (
			<div className="sum-list ui-list" onClick={this.handlerSum.bind(this)}>
				<div className="list">
					<div className="name-text">借款金额</div>
					<div className="r">
						<div className="text">{ getSumMoneyPopVal.moneyVal == '' ? '请选择' : getSumMoneyPopVal.moneyVal }</div>
						<div className="arrow-icon"></div>
					</div>
				</div>
				<div className="list">
					<div className="name-text">期限</div>
					<div className="r">
						<div className="text"> { getSumMoneyPopVal.deadlineVal == '' ? '请选择' : getSumMoneyPopVal.deadlineVal + '个月' }</div>
						<div className="arrow-icon"></div>
					</div>
				</div>
			</div>
		)
	}
}


class BasicInfo extends React.Component {
	constructor() {
		super()

	}
	handlerSelect(data) {
		const { selectListFun } = this.props

		selectListFun(data[1], data[0], true)
	}
	render() {
		const basicArr = [ ['信用卡', 'creditCardVal' ], ['邮箱', 'emailVal'], ['城市 ', 'city'], ['现居住地', 'homeVal'], ['婚姻', 'marriageVal'] ]
		const { getSumMoneyPopVal ,getSelectList } = this.props
		console.log(getSumMoneyPopVal)

		return (
			<div className="basic-info">
				<div className="ui-title">基本信息</div>
				<div className="ui-list">
					<div className="list">
						<div className="name-text">姓名</div>
						<div className="r no">
							<div className="text">{ getSumMoneyPopVal.realName } </div>
						</div>
					</div>
					<div className="list">
						<div className="name-text">身份证号</div>
						<div className="r no">
							<div className="text"> { getSumMoneyPopVal.idCard }</div>
						</div>
					</div>
					{
						basicArr.map((data, index) => {
							return <div className="list" key={ index } onClick={ this.handlerSelect.bind(this, data)}>
									<div className="name-text">{ data[0] }</div>
									<div className="r">
										<div className="text">{ getSumMoneyPopVal[data[1]] == null ? '请填写' : getSumMoneyPopVal[data[1]]}</div>
										<div className="arrow-icon"></div>
									</div>
								</div>

						})
					}
				</div>
			</div>
		)
	}
}

class UrgentContactPerson extends React.Component {
	constructor() {
		super()
	}
	handlerSelect(data) {
		const { selectListFun } = this.props

		selectListFun(data[1], data[0], true)
	}

	render() {
		const { getSumMoneyPopVal } = this.props

		const URGENT_CONTACT_PERSON_ARR = [
			['紧急联系人', 'urgentPerson'],
			['联系人关系', 'relationship'],
			['联系人手机', 'phone']
		]

		return (
			<div className="urgent-contact-person">
				<div className="ui-title">紧急联系人</div>
				<div className="ui-list">
					{
						URGENT_CONTACT_PERSON_ARR.map((data, index) => {
							return <div className="list" key={ index } onClick={ this.handlerSelect.bind(this, data) }>
							 		<div className="name-text">{ data[0] }</div>
									<div className="r">
										<div className="text">{ getSumMoneyPopVal[data[1]] == null ? '未填写' :  getSumMoneyPopVal[data[1]] }</div>
										<div className="arrow-icon"></div>
									</div>
								</div>
						})

					}
				</div>
			</div>
		)
	}
}


class JobInfo extends React.Component {
	constructor() {
		super()
	}
	handlerSelect(data) {
		const { selectListFun } = this.props

		selectListFun(data[1], data[0], true)
	}
	render() {
		const { getSumMoneyPopVal } = this.props

		const JOB_INFO_ARR = [
			['税后月收入', 'income'],
			['工作年限', 'yearsOfWork']
		]

		console.log(getSumMoneyPopVal)

		return (
			<div className="job-info">
				<div className="ui-title">工作信息</div>
				<div className="ui-list">
					{
						JOB_INFO_ARR.map((data, index) => {
							return <div className="list" key={ index } onClick={ this.handlerSelect.bind(this, data) }>
									<div className="name-text">{ data[0] }</div>
									<div className="r">
										<div className="text">{ getSumMoneyPopVal[data[1]] == null ? '请选择' : getSumMoneyPopVal[data[1]] }</div>
										<div className="arrow-icon"></div>
									</div>
								</div>
						})
					}

				</div>
			</div>
		)
	}
}

class Agree extends React.Component {
	constructor() {
		super()

		this.state = {
			agreeShow: false
		}
	}
	handlerAgree() {
		const { getAgree } = this.props

		this.setState({
			agreeShow: !this.state.agreeShow
		})

		getAgree(this.state.agreeShow)
	}

	render() {
		return (
			<div className="agree">
				<div className={ this.state.agreeShow ? 'agree-icon select-icon' : 'agree-icon'  } onClick={ this.handlerAgree.bind(this)  }></div>
				<div className="text">
					点击“申请借款”即视为同意
                    <a href="/static/loan/protocol-dumiao-openaccount/index.html">《读秒开户授权书》</a>、
                    <a href="/static/loan/protocol-personinfo-collect/index.html">《个人信息采集授权说明》</a>
				</div>
			</div>
		)
	}
}

class Btn extends React.Component {
	constructor() {
		super()
		this.state = {
			position: '0, 0'
		}
	}
	componentDidMount() {
		navigator.geolocation.getCurrentPosition((pos) => {
			this.setState({
				position: pos.coords.latitude + ', ' +pos.coords.longitude
			})
		}, (error) => {
			if (error.code == error.PERMISSION_DENIED) {
				this.setState({
					position: '0, 0'
				})
			}
		});
	}
	handlerBtn(val) {
		const { pushType } = this.props

		if(pushType == 'pushBtn') {
			const { propsAgree, getSumMoneyPopVal, getDataProps } = this.props

			if(getSumMoneyPopVal.moneyVal == null) {
				$FW.Component.Toast("借款金融不能为空");
			} else if(getSumMoneyPopVal.deadlineVal == null) {
				$FW.Component.Toast("期限不能为空");
			} else if(getSumMoneyPopVal.creditCardVal == null) {
				$FW.Component.Toast("信用卡不能为空");
			} else if(getSumMoneyPopVal.emailVal == null) {
				$FW.Component.Toast("邮箱不能为空");
			} else if(getSumMoneyPopVal.homeVal == null) {
				$FW.Component.Toast("现居住地不能为空");
			} else if(getSumMoneyPopVal.marriageVal == null) {
				$FW.Component.Toast("婚姻不能为空");
			} else if(getSumMoneyPopVal.urgentPerson == null) {
				$FW.Component.Toast("紧急联系人不能为空");
			} else if(getSumMoneyPopVal.relationship == null) {
				$FW.Component.Toast("联系人关系不能为空");
			} else if(getSumMoneyPopVal.phone == null) {
				$FW.Component.Toast("联系人手机不能为空");
			} else if(getSumMoneyPopVal.income == null) {
				$FW.Component.Toast("税后收后不能为空");
			} else if(getSumMoneyPopVal.yearsOfWork == null) {
				$FW.Component.Toast("工作年限不能为空");
			} else if (propsAgree == false) {
				$FW.Component.Toast("点击同意");
			} else {

				$FXH.Post(`${API_PATH}/api/loan/v1/applyDmLoan.json`, {
					address:  getSumMoneyPopVal.homeVal,
					balance: getSumMoneyPopVal.moneyVal,
					term: getSumMoneyPopVal.deadlineVal,
					realName: getSumMoneyPopVal.realName,
					idCard: getSumMoneyPopVal.idCard,
					creditCard: getSumMoneyPopVal.creditCardVal,
					email: getSumMoneyPopVal.emailVal,
					city: getSumMoneyPopVal.city,
					homeSituation: getSumMoneyPopVal.marriageIndex,
					emContact: getSumMoneyPopVal.urgentPerson,
					emRelationship: getSumMoneyPopVal.relationshipIndex,
					emMobile: getSumMoneyPopVal.phone,
					income: getSumMoneyPopVal.incomeIndex,
					workExperience: getSumMoneyPopVal.yearsOfWorkIndex,
					productId: $FW.Format.urlQuery().pid,
					position: '0,0', //this.state.position,
					userCookieID: '0000'
				}).then(data => {
                    // redirect to du-miao
                    let u = $FW.Store.getUserDict();
                    let params = `uid=${u.uid}&userId=${u.id}&sourceType=${SOURCE_TYPE}&token=${u.token}&userGid=${u.gid}`;
                    location.href = `/api/order/v1/jump.shtml?${params}`

				}, false)
			}


		} else if(pushType == 'popBtn') {
			const { btnValFun, getPopInfoProps, getPopShowProps, getSelectListProps } = this.props

			if(getSelectListProps == 'sumMoney') {
				if(btnValFun().moneyVal == '') {
					$FW.Component.Toast("借款金额不能为空")
				} else if((btnValFun().moneyVal % 1000) != 0) {
					$FW.Component.Toast("请以1000为单位，上限为50000");
				} else if (btnValFun().deadlineVal == '') {
					$FW.Component.Toast("请选择期限")
				} else {
					getPopInfoProps(btnValFun())
					getPopShowProps(false)
				}
			} else if(getSelectListProps == 'creditCardVal') {
				if(btnValFun().creditCardVal == '') {
					$FW.Component.Toast("信用卡不能为空")
				} else {
					getPopInfoProps(btnValFun())
					getPopShowProps(false)
				}
			} else if (getSelectListProps == 'emailVal') {
				if(eimalReg(btnValFun().emailVal) == false) {
					$FW.Component.Toast("邮箱格式不对")
				} else {
					getPopInfoProps(btnValFun())
					getPopShowProps(false)
				}
			} else if (getSelectListProps == 'homeVal') {
				if(btnValFun().homeVal == '') {
					$FW.Component.Toast("现居住地不能为空")
				} else {
					getPopInfoProps(btnValFun())
					getPopShowProps(false)
				}
			} else if (getSelectListProps == 'city') {
				if(btnValFun().city == '') {
					$FW.Component.Toast("城市不能为空")
				} else {
					getPopInfoProps(btnValFun())
					getPopShowProps(false)
				}
			} else if (getSelectListProps == 'marriageVal') {
				if(btnValFun().marriageVal == '') {
					$FW.Component.Toast("婚姻不能为空")
				} else {
					getPopInfoProps(btnValFun())
					getPopShowProps(false)
				}
			}  else if (getSelectListProps == 'urgentPerson') {
				if(btnValFun().urgentPerson == '') {
					$FW.Component.Toast("紧急联系人不能为空")
				} else {
					getPopInfoProps(btnValFun())
					getPopShowProps(false)
				}
			} else if (getSelectListProps == 'relationship') {
				if(btnValFun().relationship == '') {
					$FW.Component.Toast("联系人关系不能为空")
				} else {
					getPopInfoProps(btnValFun())
					getPopShowProps(false)
				}
			} else if (getSelectListProps == 'phone') {
				if(btnValFun().phone == '') {
					$FW.Component.Toast("联系人手机不能为空")
				} else {
					getPopInfoProps(btnValFun())
					getPopShowProps(false)
				}
			} else if (getSelectListProps == 'income') {
				if(btnValFun().income == '') {
					$FW.Component.Toast("税后收后不能为空")
				} else {
					getPopInfoProps(btnValFun())
					getPopShowProps(false)
				}
			}  else if (getSelectListProps == 'yearsOfWork') {
				if(btnValFun().yearsOfWork == '') {
					$FW.Component.Toast("工作年限不能为空")
				} else {
					getPopInfoProps(btnValFun())
					getPopShowProps(false)
				}
			}

		}
	}
	render() {
		const { getSelectListProps, pushType } = this.props

		const btnStyle = {
			position: 'fixed',
			width: '100%',
			height: '128px',
			bottom: '0',
			left: '0',
			backgroundColor: '#fff',
			boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)'
		}

		return (
			<div className="btn-area" style={ getSelectListProps == 'city' && pushType == 'popBtn' ? btnStyle : null }>
				<div className="btn" onClick={ this.handlerBtn.bind(this) }>确定</div>
			</div>
		)
	}
}



class ApplyBorrowMoney extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			popShow: false,
			selectList: '',
			popTitle: '',
			sumMoneyListObj: {
				moneyVal: '',
				deadlineVal: '',
				creditCardVal: '',
				emailVal: '',
				homeVal: '',
				realName: '',
				idCard: '',
				city: '',
				cityIndex: '',
				marriageVal: '',
				marriageIndex: '',
				urgentPerson: '',
				relationship: '',
				relationshipIndex: '',
				phone: '',
				income: '',
				incomeIndex: '',
				yearsOfWork: '',
				yearsOfWorkIndex: ''
			},
			agreeShow: false
		}
	}
    componentDidMount(){
			// this.setState({
			// 	sumMoneyListObj: {
			// 		moneyVal: '',
			// 		deadlineVal: '',
			// 		creditCardVal: 12342412,
			// 		emailVal: null,
			// 		homeVal: null,
			// 		realName: 'xx',
			// 		idCard: 2414521521,
			// 		city: null,
			// 		cityIndex: '',
			// 		marriageVal: null,
			// 		marriageIndex: 1,
			// 		urgentPerson: null,
			// 		relationship: '11',
			// 		relationshipIndex: 1,
			// 		phone: null,
			// 		income: null,
			// 		incomeIndex: null,
			// 		yearsOfWork: null,
			// 		yearsOfWorkIndex: null
			// 	}

			// })


        $FXH.Post(`${API_PATH}/api/userBase/v1/userInfoItem.json`).then(data => {
            let init_data = Object.assign({}, this.state.sumMoneyListObj, data);

			let homeSituationState = null
			let relationshipState = null

			if(data.homeSituation == 0) {
				homeSituationState = '未婚'
			} else if(data.homeSituation == 1) {
				homeSituationState = '已婚，无子女'
			} else if(data.homeSituation == 2) {
				homeSituationState = '已婚，有子女'
			} else {
				homeSituationState = null
			}

			if(data.emRelationship == 0) {
				relationshipState = '父母'
			} else if (data.emRelationship == 1) {
				relationshipState = '配偶'
			} else if (data.emRelationship == 2) {
				relationshipState = '子女'
			} else if (data.emRelationship == 3) {
				relationshipState = '兄弟姐妹'
			} else if (data.emRelationship == 4) {
				relationshipState = '同事'
			} else if (data.emRelationship == 5) {
				relationshipState = '同学'
			} else if (data.emRelationship == 6) {
				relationshipState = '朋友'
			} else {
				relationshipState = null
			}

			this.setState({
				sumMoneyListObj: {
					moneyVal: '',
					deadlineVal: '',
					creditCardVal: data.creditCard,
					emailVal: data.email,
					homeVal: data.address,
					realName: data.realName,
					idCard: data.idCard,
					city: data.city,
					cityIndex: '',
					marriageVal: homeSituationState,
					marriageIndex: data.homeSituation,
					urgentPerson: data.emContact,
					relationship: relationshipState,
					relationshipIndex: data.emRelationship,
					phone: data.emMobile,
					income: data.income,
					incomeIndex: data.income,
					yearsOfWork: data.workExperience,
					yearsOfWorkIndex: data.workExperience
				}

			})
        })
    }
	callbackSelectList(selectList, title, popShow) {
		this.setState({
			popShow: popShow,
			popTitle: title,
			selectList: selectList
		})
	}
	callbackAgree(val) {
		this.setState({
			agreeShow: !val
		})
	}
	callbackSumPopInfo(obj) {
		this.setState({
			sumMoneyListObj: {
				moneyVal: obj.moneyVal,
				deadlineVal: obj.deadlineVal,
				creditCardVal: obj.creditCardVal,
				emailVal: obj.emailVal,
				realName: obj.realName,
				idCard: obj.idCard,
				homeVal: obj.homeVal,
				city: obj.city,
				cityIndex: obj.cityIndex,
				marriageVal: obj.marriageVal,
				marriageIndex: obj.marriageIndex,
				urgentPerson: obj.urgentPerson,
				relationship: obj.relationship,
				relationshipIndex: obj.relationshipIndex,
				phone: obj.phone,
				income: obj.income,
				incomeIndex: obj.incomeIndex,
				yearsOfWork: obj.yearsOfWork,
				yearsOfWorkIndex: obj.yearsOfWorkIndex
			}
		})
	}

	callbackPopShow(popShow) {
		this.setState({
			popShow: popShow
		})
	}
	render() {
		const { dataProps } = this.props

		return (
			<div className="">

				<SumList selectListFun = { this.callbackSelectList.bind(this) } getSumMoneyPopVal = { this.state.sumMoneyListObj } />
				<BasicInfo selectListFun = { this.callbackSelectList.bind(this) } getSumMoneyPopVal = { this.state.sumMoneyListObj }
					getSelectList = { this.state.selectList }

				/>
				<UrgentContactPerson
					selectListFun = { this.callbackSelectList.bind(this) }
					getSumMoneyPopVal = { this.state.sumMoneyListObj }
				/>
				<JobInfo
					selectListFun = { this.callbackSelectList.bind(this) }
					getSumMoneyPopVal = { this.state.sumMoneyListObj }
				/>
				<Agree
					getAgree = { this.callbackAgree.bind(this) }
				/>
				<Btn
					pushType= { 'pushBtn' }
					getSumMoneyPopVal = { this.state.sumMoneyListObj }
					propsAgree = { this.state.agreeShow }
					getSelectListProps = { this.state.selectList }
				/>

				{ this.state.popShow ?  <WindowPop
					selectList={ this.state.selectList }
					popTitle = { this.state.popTitle }
					getPopInfo = { this.callbackSumPopInfo.bind(this) }
					getPopShow = { this.callbackPopShow.bind(this) }
					getPopSumMoneyListObj = { this.state.sumMoneyListObj }
				/> : null }
			</div>
		)
	}
}

//ReactDOM.render(<ApplyBorrowMoney />, CONTENT_NODE)

$FW.DOMReady(() => {
    ReactDOM.render(<Header title={'借款申请'} />, HEADER_NODE)
	    $FXH.Post(`${API_PATH}/api/userBase/v1/userInfoItem.json`)
        .then(data => ReactDOM.render(<ApplyBorrowMoney  dataProps= { data }/>, CONTENT_NODE))
})

