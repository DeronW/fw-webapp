class Juxtapose extends React.Component {
	constructor() {
		super()
		this.state = {
			listData: null
		}
	}
	componentDidMount() {
		$FXH.Post(`${API_PATH}/api/product/v1/productDisplayList.json`, {
				pageIndex: 1,
				pageSize: 100,
				productDisplayType: 2
			})
            .then(data => {
				this.setState({
					listData: data.resultList
				})
				console.log(data)
            })
	}
	render() {

		let tagType = (data) => {
			let tagClass

			if(data.labelType == 1) {
				tagClass = 'm-tag'
			} else if (data.labelType == 2) {
				tagClass = 'quota-tag'
			} else if (data.labelType == 3) {
				tagClass = 'speed-tag'
			}

			return <div className={ 'tag-icon ' + tagClass }>
						{ data.labelValue }
				</div>

		}

		let list = (data, i) => {
			console.log(data.productLabelList)
			return <div className="li" key={ i }>
					<div className="t">
						<div className="img-icon">
							<img src={ data.productLogo } />
						</div>
						<div className="title-block">
							<div className="title-text">{ data.productName }</div>
							<div className="tag-list">
								{
									data.productLabelList.map((data, index) => {
										return tagType(data)
									})
								}
							</div>
						</div>
					</div>
					<div className="b">
						<div className="info-list">
							<div className="info-text">{ data.amountStr }</div>
							<div className="text">借款范围(元)</div>
						</div>
						<div className="info-list">
							<div className="info-text">{ data.termRangeStr }</div>
							<div className="text">借款期限</div>
						</div>
						<div className="info-list">
							<div className="info-text">{ data.fastLoanValue }</div>
							<div className="text">放款时间</div>
						</div>
					</div>
				</div>
		}

		return (
			<div>
				<div className="list">
					{
						this.state.listData != null ? this.state.listData.map((data, index) => {
							return list(data, index)
						}) : null
					}
				</div>
			</div>
		)
	}
}

$FW.DOMReady(() => {
    ReactDOM.render(<Header title={'对比'} show_back="false"/>, HEADER_NODE)
	ReactDOM.render(<Juxtapose />, CONTENT_NODE)
    ReactDOM.render(<BottomNavBar />, BOTTOM_NAV_NODE);
})
