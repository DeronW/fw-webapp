var test = {
    ret:true,
    code:10000,
    message:"获取成功",
    ver:1,
    data:{
        totalCount:8,
        resultList:[
            {
                productId:"38",
                amountStr:"1000 - 5000",
                commRateStr:null,
                descInfo:null,
                fastLoanValue:"59秒",
                loanRateStr:null,
                productLabelList:[
                    {
                        labelType:"1",
                        labelValue:"秒批"
                    }
                ],
                productLogo:"https://app.easyloan888.com/img/dumiao_icon.png",
                productName:"秒白条",
                serviceRateStr:null,
                termRangeStr:"7 - 21",
                termRangeType:null,
                monthRateStr:null,
                canBuy:null,
                androidSoftwareUrl:null,
                iosSoftwareUrl:null
            },
            {
                productId:"37",
                amountStr:"1万 - 20万",
                commRateStr:null,
                descInfo:null,
                fastLoanValue:"30分钟",
                loanRateStr:null,
                productLabelList:[
                    {
                        labelType:"2",
                        labelValue:"授信额度高"
                    }
                ],
                productLogo:"https://app.easyloan888.com/img/dumiao_icon.png",
                productName:"宜人贷",
                serviceRateStr:null,
                termRangeStr:"12 - 48",
                termRangeType:null,
                monthRateStr:null,
                canBuy:null,
                androidSoftwareUrl:null,
                iosSoftwareUrl:null
            },
            {
                productId:"32",
                amountStr:"2000 - 1万",
                commRateStr:null,
                descInfo:null,
                fastLoanValue:"30分钟",
                loanRateStr:null,
                productLabelList:[
                    {
                        labelType:"3",
                        labelValue:"极速到账"
                    }
                ],
                productLogo:"https://app.easyloan888.com/img/dumiao_icon.png",
                productName:"信用钱包",
                serviceRateStr:null,
                termRangeStr:"1 - 12",
                termRangeType:null,
                monthRateStr:null,
                canBuy:null,
                androidSoftwareUrl:null,
                iosSoftwareUrl:null
            },
            {
                productId:"36",
                amountStr:"300 - 1万",
                commRateStr:null,
                descInfo:null,
                fastLoanValue:"半小时",
                loanRateStr:null,
                productLabelList:[
                    {
                        labelType:"3",
                        labelValue:"极速到账"
                    }
                ],
                productLogo:"https://app.easyloan888.com/img/dumiao_icon.png",
                productName:"手机贷",
                serviceRateStr:null,
                termRangeStr:"7 - 180",
                termRangeType:null,
                monthRateStr:null,
                canBuy:null,
                androidSoftwareUrl:null,
                iosSoftwareUrl:null
            },
            {
                productId:"35",
                amountStr:"1000 - 5万",
                commRateStr:null,
                descInfo:null,
                fastLoanValue:"2小时",
                loanRateStr:null,
                productLabelList:[
                    {
                        labelType:"2",
                        labelValue:"授信额度高"
                    }
                ],
                productLogo:"https://app.easyloan888.com/img/dumiao_icon.png",
                productName:"拍拍贷",
                serviceRateStr:null,
                termRangeStr:"3 - 12",
                termRangeType:null,
                monthRateStr:null,
                canBuy:null,
                androidSoftwareUrl:null,
                iosSoftwareUrl:null
            },
            {
                productId:"33",
                amountStr:"500 - 1万",
                commRateStr:null,
                descInfo:null,
                fastLoanValue:"2小时",
                loanRateStr:null,
                productLabelList:[
                    {
                        labelType:"3",
                        labelValue:"极速到账"
                    }
                ],
                productLogo:"https://app.easyloan888.com/img/dumiao_icon.png",
                productName:"给你花",
                serviceRateStr:null,
                termRangeStr:"1 - 12",
                termRangeType:null,
                monthRateStr:null,
                canBuy:null,
                androidSoftwareUrl:null,
                iosSoftwareUrl:null
            },
            {
                productId:"31",
                amountStr:"1000 - 5万",
                commRateStr:null,
                descInfo:null,
                fastLoanValue:"当天",
                loanRateStr:null,
                productLabelList:[
                    {
                        labelType:"2",
                        labelValue:"授信额度高"
                    }
                ],
                productLogo:"https://app.easyloan888.com/img/dumiao_icon.png",
                productName:"贷你嗨",
                serviceRateStr:null,
                termRangeStr:"6 - 24",
                termRangeType:null,
                monthRateStr:null,
                canBuy:null,
                androidSoftwareUrl:null,
                iosSoftwareUrl:null
            },
            {
                productId:"34",
                amountStr:"500 - 10万",
                commRateStr:null,
                descInfo:null,
                fastLoanValue:"24小时",
                loanRateStr:null,
                productLabelList:[
                    {
                        labelType:"2",
                        labelValue:"授信额度高"
                    }
                ],
                productLogo:"https://app.easyloan888.com/img/dumiao_icon.png",
                productName:"玖富叮当贷",
                serviceRateStr:null,
                termRangeStr:"3 - 36",
                termRangeType:null,
                monthRateStr:null,
                canBuy:null,
                androidSoftwareUrl:null,
                iosSoftwareUrl:null
            }
        ],
        totalPage:1
    }
}

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

		//this.setState({
		//	listData: test.data.resultList
		//})

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
    ReactDOM.render(<Header title={'对比'} />, HEADER_NODE)
	ReactDOM.render(<Juxtapose />, CONTENT_NODE)
})
