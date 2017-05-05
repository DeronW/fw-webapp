var test = {
    code: 1,
    data: {
        resultList: [
            {
                amountStr: "测试内容z14l",
                productId: "测试内容6g7y",
                productLabelList: [
                    {
                        labelType: 1,
                        labelValue: 1
                    }
                ],
                productLogo: "images/dumiao-logo.png",
                productName: "测试内容ivt1"
            }
        ],
        totalCount: 50035,
        totalPage: 34107
    },
    message: 1,
    ret: 1
}


class Juxtapose extends React.Component {
	constructor() {
		super()
		this.state = {
			listData: null
		}	
	}
	componentDidMount() {
		//$FXH.Post(`${API_PATH}/api/product/v1/productDisplayList.json`, {
		/*$FXH.Post(`/Users/dante/Desktop/test/test.json`, {
				pageIndex: 1,
				pageSize: 100,
				productDisplayType: 2	
			})
            .then(data => {
				console.log(data)
            })*/

		this.setState({
			listData: test.data.resultList
		})

	}
	render() {
		const TEST = [1, 2, 3, 4] 

		console.log(this.state.listData)

		let list = (data, i) => {
			console.log(data)
			return <div className="li" key={ i }>
					<div className="t">
						<div className="img-icon">
							<img src={ data.productLogo } />
						</div>
						<div className="title-block">
							<div className="title-text">读秒</div>
							<div className="tag-list">
								<div className="tag-icon m-tag">
									秒批
								</div>
								<div className="tag-icon quota-tag">
									授信额度高	
								</div>
								<div className="tag-icon speed-tag">
									极速到账
								</div>
							</div>
						</div>
					</div>
					<div className="b">
						<div className="info-list">
							<div className="info-text">1,000~5万</div>
							<div className="text">借款范围(元)</div>
						</div>	
						<div className="info-list">
							<div className="info-text">21天~3个月</div>
							<div className="text">借款期限</div>
						</div>	
						<div className="info-list">
							<div className="info-text">2日内放款</div>
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
    ReactDOM.render(<Header title={'对比'} />, HEADER_NODE)
	ReactDOM.render(<Juxtapose />, CONTENT_NODE)
})
