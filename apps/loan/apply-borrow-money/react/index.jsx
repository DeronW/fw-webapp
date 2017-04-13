const verificationNum = val => {
	const reg = new RegExp('^[0-9]*$')

	return reg.test(val)
}


class SumList extends React.Component {
	constructor() {
		super()
	}

	handlerSum() {
		const { selectListFun } = this.props
		
		selectListFun('sumMoney', '金额和期限', true)
	}
	render() {
		const { getPopVal } = this.props

		return (
			<div className="sum-list ui-list" onClick={this.handlerSum.bind(this)}>
				<div className="list">
					<div className="name-text">借款金额</div>
					<div className="r">
						<div className="text">{ getPopVal == '' ?  '请输入' : getPopVal.val }</div>
						<div className="arrow-icon"></div>
					</div>
				</div>
				<div className="list">
					<div className="name-text">期限</div>
					<div className="r">
						<div className="text">{ getPopVal == '' ? '请选择' : getPopVal.deadline + '个月' }</div>
						<div className="arrow-icon"></div>
					</div>
				</div>
			</div>
		)
	}
}


class BasicInfo extends React.Component {
	render() {
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
					<div className="list">
						<div className="name-text">信用卡</div>
						<div className="r">
							<div className="text">请填写</div>
							<div className="arrow-icon"></div>
						</div>
					</div>
					<div className="list">
						<div className="name-text">邮箱</div>
						<div className="r">
							<div className="text">请填写</div>
							<div className="arrow-icon"></div>
						</div>
					</div>
					<div className="list">
						<div className="name-text">现居住地</div>
						<div className="r">
							<div className="text">请填写</div>
							<div className="arrow-icon"></div>
						</div>
					</div>
					<div className="list">
						<div className="name-text">婚姻</div>
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
		const { btnValFun, popInfoFunProps } = this.props

		popInfoFunProps(false, btnValFun())	
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
	constructor() {
		super()
		this.state = {
			inputPlaceholder: '',
			inputVal: '',
			selectList: '',
			tabShow: false,
			deadline: [],
			deadlineIconShow: false,
			deadlineIconIndex: 0,
		   	deadlineVal: '请选择'	
		}
	}
	componentWillMount() {
		const { selectList } = this.props

		this.setState({
			selectList: selectList
		})

		if(selectList === 'sumMoney') {
			this.setState({
				inputPlaceholder: '请以1000为单位，上限为50000' 
			})	
		}

	}	
	handlerBack() {
		const { popInfoFun } = this.props

		popInfoFun(false)
	}

	changeInput(e) {
		if(this.state.selectList === 'sumMoney') {
			if(verificationNum(e.target.value)) {
				this.setState({
					inputVal: e.target.value,
					deadlineIconShow: false,
					deadlineVal: '请选择'	
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

		} else {

		}
	}
	handlerDate(e) {
		const inputVal = this.state.inputVal

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
		this.setState({
			deadlineIconShow: true,
			deadlineIconIndex: index,
			deadlineVal: data,
			tabShow: false			
		})
	}

	callbackBtnVal(val) {
		return {
			val: this.state.inputVal,
			deadline: this.state.deadlineVal
		}
	}

	render() {
		const { selectList, popTitle, popInfoFun } = this.props

		let deadlineList = () => {
			return 
		}

		let listNextTab = () => {
			return 		<div className="list list-next-tab">
							<div className="" onClick={ this.handlerDate.bind(this) }>
								<div className="name-text">期限</div>
								<div className="r">
									<div className="text">{ this.state.deadlineVal } { this.state.deadlineIconShow ? '个月' : '' }</div>
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
		
		return (
			<div className="window-pop">
				<div className="top">
					<div className="back" onClick={ this.handlerBack.bind(this) } ></div>
					<div className="title">{ popTitle }</div>
				</div>	

				<div className="cnt-pop">
					<div className="ui-title">工作信息</div>
					<div className="ui-list">
						<div className="list">
							<div className="name-text">借款金额</div>
							<div className="r no">
								<input type="text" 
									placeholder={ this.state.inputPlaceholder }
									onChange= { this.changeInput.bind(this) }
									value={ this.state.inputVal }
								/>
							</div>
						</div>
						
						{ listNextTab() }
					</div>
				</div>

				<Btn btnValFun = { this.callbackBtnVal.bind(this) } popInfoFunProps = { popInfoFun } />
			</div>
		)
	}
}

class ApplyBorrowMoney extends React.Component {
	constructor() {
		super()
		this.state = {
			popShow: false,
			selectList: '',
			popTitle: '',
			sumMoney: '',
			deadlineVal: '',
			popInfoObj: '' 
		}
	}
	callbackSelectList(selectList, title, popShow) {
		this.setState({
			popShow: popShow,
			popTitle: title,
			selectList: selectList
		})	
	}
	callbackPopInfo(popShow, obj) {
		this.setState({
			popShow: popShow,
			popInfoObj: obj
		})
	}
	render() {
		return (
			<div className="">
				<SumList selectListFun = { this.callbackSelectList.bind(this) } getPopVal = { this.state.popInfoObj } />
				<BasicInfo />
				<UrgentContactPerson />
				<JobInfo />
				<Agree />
				<Btn />

				{ this.state.popShow ?  <WindowPop  
					selectList={ this.state.selectList } 
					popTitle = { this.state.popTitle }
					popInfoFun = { this.callbackPopInfo.bind(this) }
				/> : null } 
			</div>
		)
	}
}


ReactDOM.render(
	<ApplyBorrowMoney />,
	document.getElementById('cnt')
)
