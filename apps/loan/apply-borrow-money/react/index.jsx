const verificationNum = val => {
	const reg = new RegExp('^[0-9]*$')

	return reg.test(val)
}

const eimalReg = val => {
	const reg = new RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)

	return reg.test(val)
}

const phoneEeg = val => {
	const reg = /^1[3|4|5|7|8][0-9]{9}$/
	return reg.test(val)
}

// function on_success(pos) {
//     // 将会获得以下信息
//     // var latitude = pos.coords.latitude;
//     // var longitude = pos.coords.longitude;
//     // var accuracy = pos.coords.accuracy;
//     // var timestamp = pos.timestamp;
//     // // 以下信息不一定提供，和具体设备有关
//     // var altitude = pos.coords.altitude;
//     // var altitudeAccuracy = pos.coords.altitudeAccuracy;
//     // var heading = pos.coords.heading;
//     // var speed = pos.coords.speed;

// 	return {
// 		latitude: pos.coords.latitude,
// 		longitude: pos.coords.longitude
// 	}
// }

// function on_error(error) {
//     console.log(error.message);
//     if (error.code == error.PERMISSION_DENIED) {
//         console.log("User denied Geolocation.");
//     } else {

// 	}
// }

// navigator.geolocation.getCurrentPosition(on_success, on_error);


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
		const basicArr = [ ['信用卡', 'creditCardVal' ], ['邮箱', 'emailVal'], ['现居住地', 'homeVal'], ['婚姻', 'marriageVal'] ]
		const { getSumMoneyPopVal ,getSelectList, getDataProps } = this.props

		return (
			<div className="basic-info">
				<div className="ui-title">基本信息</div>
				<div className="ui-list">
					<div className="list">
						<div className="name-text">姓名</div>
						<div className="r no">
							<div className="text">{ getDataProps.realName } </div>
						</div>
					</div>
					<div className="list">
						<div className="name-text">身份证号</div>
						<div className="r no">
							<div className="text"> { getDataProps.idCard }</div>
						</div>
					</div>
					{
						basicArr.map((data, index) => {
							return <div className="list" key={ index } onClick={ this.handlerSelect.bind(this, data)}>
									<div className="name-text">{ data[0] }</div>
									<div className="r">
										<div className="text">{ getSumMoneyPopVal[data[1]] == '' ? '请填写' : getSumMoneyPopVal[data[1]]}</div>
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
										<div className="text">{ getSumMoneyPopVal[data[1]] == '' ? '未填写' :  getSumMoneyPopVal[data[1]] }</div>
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
										<div className="text">{ getSumMoneyPopVal[data[1]] == "" ? '请选择' : getSumMoneyPopVal[data[1]] }</div>
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
					点击“申请借款”即视为同意<a href="">《读秒开户授权书》</a>、<a href="">《个人信息采集授权说明》</a>	
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
			
			if(getSumMoneyPopVal.moneyVal == '') {
				$FW.Component.Toast("借款金融不能为空");
			} else if(getSumMoneyPopVal.deadlineVal == '') {
				$FW.Component.Toast("期限不能为空");
			} else if(getSumMoneyPopVal.creditCardVal == '') {
				$FW.Component.Toast("信用卡不能为空");
			} else if(getSumMoneyPopVal.emailVal == '') {
				$FW.Component.Toast("邮箱不能为空");
			} else if(getSumMoneyPopVal.homeVal == '') {
				$FW.Component.Toast("现居住地不能为空");
			} else if(getSumMoneyPopVal.marriageVal == '') {
				$FW.Component.Toast("婚姻不能为空");
			} else if(getSumMoneyPopVal.urgentPerson == '') {
				$FW.Component.Toast("紧急联系人不能为空");
			} else if(getSumMoneyPopVal.relationship == '') {
				$FW.Component.Toast("联系人关系不能为空");
			} else if(getSumMoneyPopVal.phone == '') {
				$FW.Component.Toast("联系人手机不能为空");
			} else if(getSumMoneyPopVal.income == '') {
				$FW.Component.Toast("税后收后不能为空");
			} else if(getSumMoneyPopVal.yearsOfWork == '') {
				$FW.Component.Toast("工作年限不能为空");
			} else if (propsAgree == false) {
				$FW.Component.Toast("点击同意");
			} else {
				$FXH.Post(`${API_PATH}/api/loan/v1/applyDmLoan.json`), {
					balance: getSumMoneyPopVal.moneyVal,
					term: getSumMoneyPopVal.deadlineVal,
					realName: getDataProps.realName,
					idCard: getDataProps.idCard,
					creditCard: getSumMoneyPopVal.creditCardVal,
					email: getSumMoneyPopVal.email,
					city: getSumMoneyPopVal.homeVal,
					homeSituation: getSumMoneyPopVal.marriageIndex,
					emContact: getSumMoneyPopVal.urgentPerson,
					emRelationship: getSumMoneyPopVal.relationshipIndex,
					emMobile: getSumMoneyPopVal.phone,
					income: getSumMoneyPopVal.income,
					workExperience: getSumMoneyPopVal.yearsOfWorkIndex,
					productId: $FW.Format.urlQuery().pid,
					position: this.state.position,
					userCookieID: navigator.userAgent,
					token: JSON.parse($FW.Store.exportUserDict()).token,
					uid	: JSON.parse($FW.Store.exportUserDict()).uid,
					userGid: JSON.parse($FW.Store.exportUserDict()).userGid,
					userId: JSON.parse($FW.Store.exportUserDict()).userId
				}
        		.then(data => {
					alert(data)
				})
			}


		} else if(pushType == 'popBtn') {
			const { btnValFun, getPopInfoProps, getPopShowProps, getSelectListProps } = this.props			

			if(getSelectListProps == 'sumMoney') {
				if(btnValFun().moneyVal == '') {
					$FW.Component.Toast("借款金额不能为空");
				} else if((btnValFun().moneyVal % 1000) != 0) {
					$FW.Component.Toast("请以1000为单位，上限为50000");
				} else if (btnValFun().deadlineVal == '') {
					$FW.Component.Toast("请选择期限");
				} else {
					getPopInfoProps(btnValFun())	
					getPopShowProps(false)
				} 	
			} else if(getSelectListProps == 'creditCardVal') {
				if(btnValFun().creditCardVal == '') {
					$FW.Component.Toast("信用卡不能为空");
				} else {
					getPopInfoProps(btnValFun())	
					getPopShowProps(false)
				} 
			} else if (getSelectListProps == 'emailVal') {
				if(eimalReg(btnValFun().emailVal) == false) {
					$FW.Component.Toast("邮箱格式不对");
				} else {
					getPopInfoProps(btnValFun())	
					getPopShowProps(false)
				} 
			} else if (getSelectListProps == 'homeVal') {
				if(btnValFun().homeVal == '') {
					$FW.Component.Toast("现居住地不能为空");
				} else {
					getPopInfoProps(btnValFun())	
					getPopShowProps(false)
				} 
			} else if (getSelectListProps == 'marriageVal') {
				if(btnValFun().marriageVal == '') {
					$FW.Component.Toast("婚姻不能为空");
				} else {
					getPopInfoProps(btnValFun())	
					getPopShowProps(false)
				} 
			}  else if (getSelectListProps == 'urgentPerson') {
				if(btnValFun().urgentPerson == '') {
					$FW.Component.Toast("紧急联系人不能为空");
				} else {
					getPopInfoProps(btnValFun())	
					getPopShowProps(false)
				} 
			} else if (getSelectListProps == 'relationship') {
				if(btnValFun().relationship == '') {
					$FW.Component.Toast("联系人关系不能为空");
				} else {
					getPopInfoProps(btnValFun())	
					getPopShowProps(false)
				} 
			} else if (getSelectListProps == 'phone') {
				if(btnValFun().phone == '') {
					$FW.Component.Toast("联系人手机不能为空");
				} else {
					getPopInfoProps(btnValFun())	
					getPopShowProps(false)
				} 
			} else if (getSelectListProps == 'income') {
				if(btnValFun().income == '') {
					$FW.Component.Toast("税后收后不能为空");
				} else {
					getPopInfoProps(btnValFun())	
					getPopShowProps(false)
				} 
			}  else if (getSelectListProps == 'yearsOfWork') {
				if(btnValFun().yearsOfWork == '') {
					$FW.Component.Toast("工作年限不能为空");
				} else {
					getPopInfoProps(btnValFun())	
					getPopShowProps(false)
				}
			}  

		}
	}
	render() {
		return (
			<div className="btn-area">
				<div className="btn" onClick={ this.handlerBtn.bind(this) }>确定</div>		
			</div>
		)
	}
}


class WindowPop extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			inputPlaceholder: '',
			sumMoneyListObj: {
				moneyVal: '',
				deadlineVal: '',
				creditCardVal: '',
				emailVal: '',
				homeVal: '',
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
			inputType: '',
			selectList: '',
			tabShow: false,
			deadline: [],
			deadlineIconShow: false,
			deadlineIconIndex: 0
		}
	}
	componentWillMount() {
		const { selectList, getPopSumMoneyListObj } = this.props

		this.setState({
			selectList: selectList,
			sumMoneyListObj: getPopSumMoneyListObj
		})

		switch( selectList ) {
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
		if(this.state.selectList === 'sumMoney') {		
			if(verificationNum(e.target.value)) {
				let copSumMoneyListObj1 = this.state.sumMoneyListObj
				copSumMoneyListObj1.moneyVal = e.target.value

				this.setState({
					copSumMoneyListObj1,
					deadlineIconShow: false,						
				})

				if(e.target.value >= 1000 && e.target.value <= 3000 ) {
					this.setState({
						deadline: [1, 3, 6, 12]
					})
				} else if (e.target.value >= 4000 && e.target.value <= 5000) {
					this.setState({
						deadline: [3, 6, 12]
					})
				} else if (e.target.value > 6000 && e.target.value <= 20000) {
					this.setState({
						deadline: [6, 12, 18, 24]
					})
				} else if (e.target.value > 21000 && e.target.value <= 50000) {
					this.setState({
						deadline: [12, 18, 24]
					})
				} else if(e.target.value < 1000 || e.target.value > 50000) {
					this.setState({
						deadline: []
					})
				} 
			}	

		} else if (this.state.selectList === 'creditCardVal') {	
			if(verificationNum(e.target.value)) {
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
		}  else if (this.state.selectList === 'urgentPerson') {	
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
		
		if(inputVal.length == 0) {
            $FW.Component.Toast("金额不能为空");
		} else if((inputVal % 1000) != 0) {
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
			creditCardVal: this.state.sumMoneyListObj.creditCardVal,
			emailVal: this.state.sumMoneyListObj.emailVal,
			homeVal: this.state.sumMoneyListObj.homeVal,
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

		if(selectList == 'income') {
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

	render() {
		const { selectList, popTitle, getPopShow, getPopInfo } = this.props

		let listNextTab = () => {
			return 		<div className="list list-next-tab">
							<div className="" onClick={ this.handlerDate.bind(this) }>
								<div className="name-text">期限</div>
								<div className="r">
									<div className="text">{ this.state.sumMoneyListObj.deadlineVal } { this.state.deadlineIconShow ? '个月' : '' }</div>
									<div className="arrow-icon"></div>
								</div>

							</div>
							{ this.state.tabShow ? 
								<div className="tab-list">
									{
										this.state.deadline.map((data, index) => {
											return <div className="block" key={ index } onClick= { this.handlerSelectDeadline.bind(this, index, data) }>
												<div className="info-text">{ data }个月</div>
												{												
													index == this.state.deadlineIconIndex && this.state.deadlineIconShow ? <div className="select-icon"></div> : null
												}
											</div>
										})	
									}				
						
								</div> : null
							}
						</div>

		}
		
		let selectBasicVal = (index) => {						
			if(this.state.sumMoneyListObj.marriageIndex != '' || this.state.sumMoneyListObj.marriageIndex == '0') {
				if(this.state.sumMoneyListObj.marriageIndex == index) {
					return  <div className="select-icon"></div>
				}
				
			}
		}

		let urgentContactPersonVal = (index) => {						
			if(this.state.sumMoneyListObj.relationshipIndex != '' || this.state.sumMoneyListObj.relationshipIndex == '0') {
				if(this.state.sumMoneyListObj.relationshipIndex == index) {
					return  <div className="select-icon"></div>
				}
				
			}
		}

		let jobInfoVal = (index) => {		
			let jobSelectType

			if(selectList == 'income') {
				jobSelectType = 'incomeIndex'
			} else if (selectList == 'yearsOfWork') {
				jobSelectType = 'yearsOfWorkIndex'
			}

			if(this.state.sumMoneyListObj[jobSelectType] != '' || this.state.sumMoneyListObj[jobSelectType] == '0') {
				if(this.state.sumMoneyListObj[jobSelectType] == index) {
					return  <div className="select-icon"></div>
				}
				
			}
		}

		let marriageList = () => {
			const MARRIAGE_ARR = ['未婚', '已婚, 无子女', '已婚,有子女']

			return 	<div className="cnt-pop">
						<div className="ui-list marriage-list">
							{
								MARRIAGE_ARR.map((data, index) => {
									return <div className="list" onClick={ this.handlerSelectMarriage.bind(this, index, data ) } key={ index }>
											<div className="name-text">{ data }</div>
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
		
		let relationshipList  = () => {
			const RELATIONSHIP_ARR =  [ '父母', '配偶', '兄弟姐妹', '同事', '同学', '朋友' ]

			return 	<div className="cnt-pop">
						<div className="ui-list marriage-list">
							{
								RELATIONSHIP_ARR.map((data, index) => {
									return <div className="list"  key={ index } onClick={ this.handlerSelectRelationship.bind(this, data, index) }>
											<div className="name-text">{ data }</div>
											<div className="r">
												{ urgentContactPersonVal(index) }
												
											</div>
										</div>			
								})
							}
																		
						</div>
					</div>
		}

		let jobInfoList  = () => {
			let jobInfoArr = []

			if(selectList == 'income') {
				jobInfoArr =  [ '3000 元以下', '3001 - 5000 元', '5001 - 10000 元', '10001 - 20000 元', '20000元以上' ]
			} else if(selectList == 'yearsOfWork') {
				jobInfoArr = ['1年以下', '1-5年', '6-10年', '10年以上' ]
			}

			return 	<div className="cnt-pop">
						<div className="ui-list marriage-list">
							{
								jobInfoArr.map((data, index) => {
									return <div className="list"  key={ index } onClick={ this.handlerSelectJob.bind(this, data, index) }>
											<div className="name-text">{ data }</div>
											<div className="r">
												{ jobInfoVal(index) }												
											</div>
										</div>			
								})
							}
																		
						</div>
					</div>
		}


		return (
			<div className="window-pop">
				<div className="top">
					<div className="back" onClick={ this.handlerBack.bind(this) } ></div>
					<div className="title">{ popTitle }</div>
				</div>	

				{ selectList != 'marriageVal' && selectList != 'relationship' && selectList != 'income'  && selectList != 'yearsOfWork' ? 
					<div className="cnt-pop">
						<div className="ui-title">工作信息</div>
						<div className="ui-list">
							<div className="list">
								<div className="name-text">{ selectList == 'sumMoney'  ?  '借款金额' : popTitle }</div>
								<div className="r no">
									<input type="text" 
										placeholder={ this.state.inputPlaceholder }
										onChange= { this.changeInput.bind(this) }
										value={ this.state.sumMoneyListObj[this.state.inputType] }
									/>
								</div>
							</div>
							
							{ selectList == 'sumMoney' ? listNextTab() : null}
						</div>
					</div> :  null
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

				<Btn 
					btnValFun = { this.callbackBtnVal.bind(this) } 
		   			getPopInfoProps = { getPopInfo } 
					getPopShowProps = { getPopShow } 
					getSelectListProps = { selectList }
					pushType= { 'popBtn' }
				/>
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
		//console.log(obj)
		this.setState({
			sumMoneyListObj: {
				moneyVal: obj.moneyVal,
				deadlineVal: obj.deadlineVal,
				creditCardVal: obj.creditCardVal,
				emailVal: obj.emailVal,
				homeVal: obj.homeVal,
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
					getDataProps = { dataProps }
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
					getDataProps = { dataProps }
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

//ReactDOM.render(<ApplyBorrowMoney  />, CONTENT_NODE)


$FW.DOMReady(() => {
	    $FXH.Post(`${API_PATH}/api/userBase/v1/userInfoItem.json`)
        .then(data => ReactDOM.render(<ApplyBorrowMoney  dataProps= { data }/>, CONTENT_NODE))
})

