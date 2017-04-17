const verificationNum = val => {
	const reg = new RegExp('^[0-9]*$')

	return reg.test(val)
}


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
		const { getSumMoneyPopVal } = this.props

		// console.log(getSumMoneyPopVal['marriageVal'])
		// let selectBasicVal = () => {
		// 	if(getSumMoneyPopVal['marriageVal'] != '') {
		// 		if(getSumMoneyPopVal['marriageVal'] == 0) {
		// 			return '未婚'
		// 		} else if(getSumMoneyPopVal['marriageVal'] == 1) {
		// 			return '已婚, 无子女'
		// 		} else if(getSumMoneyPopVal['marriageVal'] == 2) {
		// 			return '已婚, 有子女'
		// 		} 
		// 	} else {

		// 	}
		// }
		

		return (
			<div className="basic-info">
				<div className="ui-title">基本信息</div>
				<div className="ui-list">
					<div className="list">
						<div className="name-text">姓名</div>
						<div className="r no">
							<div className="text">熊先生</div>
						</div>
					</div>
					<div className="list">
						<div className="name-text">身份证号</div>
						<div className="r no">
							<div className="text">130198198501230123</div>
						</div>
					</div>
					{
						basicArr.map((data, index) => {
							return <div className="list" key={ index } onClick={ this.handlerSelect.bind(this, data)}>
									<div className="name-text">{ data[0] }</div>
									<div className="r">
										<div className="text">{ getSumMoneyPopVal[data[1]] == '' ? '请填写' : getSumMoneyPopVal[data[1]] }</div>
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
	render() {
		return (
			<div className="urgent-contact-person">
				<div className="ui-title">紧急联系人</div>
				<div className="ui-list">
					<div className="list">
						<div className="name-text">紧急联系人</div>
						<div className="r">
							<div className="text">未填写</div>
							<div className="arrow-icon"></div>
						</div>
					</div>
					<div className="list">
						<div className="name-text">联系人关系</div>
						<div className="r">
							<div className="text">请选择</div>
							<div className="arrow-icon"></div>
						</div>
					</div>
					<div className="list">
						<div className="name-text">联系人手机</div>
						<div className="r">
							<div className="text">请输入</div>
							<div className="arrow-icon"></div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


class JobInfo extends React.Component {
	render() {
		return (
			<div className="job-info">
				<div className="ui-title">工作信息</div>
				<div className="ui-list">
					<div className="list">
						<div className="name-text">税后月收入</div>
						<div className="r">
							<div className="text">请选择</div>
							<div className="arrow-icon"></div>
						</div>
					</div>
					<div className="list">
						<div className="name-text">工作年限</div>
						<div className="r">
							<div className="text">请选择</div>
							<div className="arrow-icon"></div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

class Agree extends React.Component {
	render() {
		return (
			<div className="agree">
				<div className="agree-icon"></div>
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
		
	}
	handlerBtn(val) {
		const { btnValFun, getPopInfoProps, getPopShowProps } = this.props
		
		console.log(btnValFun)
		getPopInfoProps(btnValFun())	

		getPopShowProps(false)
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
				marriageVal: ''
			},
			inputType: '',
			selectList: '',
			tabShow: false,
			deadline: [],
			deadlineIconShow: false,
			deadlineIconIndex: 0,
			selectMarriageIconIndex: 0
		}
	}
	componentWillMount() {
		const { selectList, getPopSumMoneyListObj } = this.props
		console.log( this.state.sumMoneyListObj)

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
			let copSumMoneyListObj2 = this.state.sumMoneyListObj
			copSumMoneyListObj2.creditCardVal = e.target.value		
			this.setState({
				copSumMoneyListObj2
			})
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
		}  else {

		}
	}
	handlerDate(e) {
		const inputVal = this.state.sumMoneyListObj.moneyVal
		
		if(inputVal.length == 0) {
            $FW.Component.Toast("金额不能为空");
		}
		else if((inputVal % 1000) != 0) {
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
		console.log( this.state.sumMoneyListObj)
		
		return {
			moneyVal: this.state.sumMoneyListObj.moneyVal,			
			deadlineVal: this.state.sumMoneyListObj.deadlineVal,
			creditCardVal: this.state.sumMoneyListObj.creditCardVal,
			emailVal: this.state.sumMoneyListObj.emailVal,
			homeVal: this.state.sumMoneyListObj.homeVal,
			marriageVal: this.state.sumMoneyListObj.marriageVal
		}
	}

	handlerSelectMarriage(index, data) {
		let copState = this.state.sumMoneyListObj
			copState.marriageVal = index	

		console.log(index)	
		this.setState({
			selectMarriageIconIndex: index,
			copState
		})
		console.log(this.state.sumMoneyListObj.marriageVal)
		
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
			
			if(this.state.sumMoneyListObj.marriageVal != '') {
				if(this.state.sumMoneyListObj.marriageVal == index) {
					console.log('xxxxxxx')
					return  <div className="select-icon"></div>
				}
				
			} else {
				console.log('aaaa')
			}
		}

		let marriageList = () => {
			const MARRIAGE_ARR = ['未婚', '已婚, 无子女', '已婚,有子女']

			return 	<div className="cnt-pop">
						<div className="ui-list marriage-list">
							{
								MARRIAGE_ARR.map((data, index) => {
									return <div className="list" onClick={ this.handlerSelectMarriage.bind(this, index, data ) } key={ index }>
											<div className="name-text">{ data } </div>
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
		

		return (
			<div className="window-pop">
				<div className="top">
					<div className="back" onClick={ this.handlerBack.bind(this) } ></div>
					<div className="title">{ popTitle }</div>
				</div>	

				{ selectList != 'marriageVal' ? 
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
					</div> :  marriageList() 
				}

				<Btn 
					btnValFun = { this.callbackBtnVal.bind(this) } 
		   			getPopInfoProps = { getPopInfo } 
					getPopShowProps = { getPopShow } 
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
				marriageVal: ''
			}
		}
	}
	callbackSelectList(selectList, title, popShow) {
		this.setState({
			popShow: popShow,
			popTitle: title,
			selectList: selectList
		})	
	}
	callbackSumPopInfo(obj) {
		console.log(obj)
		this.setState({
			sumMoneyListObj: {
				moneyVal: obj.moneyVal,
				deadlineVal: obj.deadlineVal,
				creditCardVal: obj.creditCardVal,
				emailVal: obj.emailVal,
				homeVal: obj.homeVal,
				marriageVal: obj.marriageVal
			}
		})
	}

	callbackPopShow(popShow) {
		this.setState({
			popShow: popShow
		})
	}
	render() {
		return (
			<div className="">
				<SumList selectListFun = { this.callbackSelectList.bind(this) } getSumMoneyPopVal = { this.state.sumMoneyListObj } />
				<BasicInfo selectListFun = { this.callbackSelectList.bind(this) } getSumMoneyPopVal = { this.state.sumMoneyListObj } />
				<UrgentContactPerson />
				<JobInfo />
				<Agree />
				<Btn />

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


ReactDOM.render(
	<ApplyBorrowMoney />,
	document.getElementById('cnt')
)
