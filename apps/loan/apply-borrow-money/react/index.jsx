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

const CITY_ARR = [
		[
			"A",
			[
				{
					id: "152900",
					name: "\u963f\u62c9\u5584\u76df"
				}, {
					id: "210300",
					name: "\u978d\u5c71"
				}, {
					id: "340800",
					name: "\u5b89\u5e86"
				}, {
					id: "410500",
					name: "\u5b89\u9633"
				}, {
					id: "513200",
					name: "\u963f\u575d\u85cf\u65cf\u7f8c\u65cf\u81ea\u6cbb\u5dde"
				}, {
					id: "520400",
					name: "\u5b89\u987a"
				}, {
					id: "542500",
					name: "\u963f\u91cc\u5730\u533a"
				}, {
					id: "610900",
					name: "\u5b89\u5eb7"
				}, {
					id: "652900",
					name: "\u963f\u514b\u82cf\u5730\u533a"
				}, {
					id: "654300",
					name: "\u963f\u52d2\u6cf0\u5730\u533a"
				}, {
					id: "820100",
					name: "\u6fb3\u95e8\u534a\u5c9b"
				}, {
					id: "659002",
					name: "\u963f\u62c9\u5c14\u5e02"
				}
			]
		],
		[
			"B",
			[{
					id: "110100",
					name: "\u5317\u4eac"
				}, {
					id: "130600",
					name: "\u4fdd\u5b9a"
				}, {
					id: "150200",
					name: "\u5305\u5934"
				}, {
					id: "150800",
					name: "\u5df4\u5f66\u6dd6\u5c14"
				}, {
					id: "210500",
					name: "\u672c\u6eaa"
				}, {
					id: "220600",
					name: "\u767d\u5c71"
				}, {
					id: "220800",
					name: "\u767d\u57ce"
				}, {
					id: "340300",
					name: "\u868c\u57e0"
				}, {
					id: "341600",
					name: "\u4eb3\u5dde"
				}, {
					id: "371600",
					name: "\u6ee8\u5dde"
				}, {
					id: "450500",
					name: "\u5317\u6d77"
				}, {
					id: "451000",
					name: "\u767e\u8272"
				}, {
					id: "511900",
					name: "\u5df4\u4e2d"
				}, {
					id: "522400",
					name: "\u6bd5\u8282\u5730\u533a"
				}, {
					id: "530500",
					name: "\u4fdd\u5c71"
				}, {
					id: "610300",
					name: "\u5b9d\u9e21"
				}, {
					id: "620400",
					name: "\u767d\u94f6"
				}, {
					id: "652700",
					name: "\u535a\u5c14\u5854\u62c9\u8499\u53e4\u81ea\u6cbb\u5dde"
				}, {
					id: "652800",
					name: "\u5df4\u97f3\u90ed\u695e\u8499\u53e4\u81ea\u6cbb\u5dde"
				}]
		],
		[
			'C',
			[{
				id: "130800",
				name: "\u627f\u5fb7"
			}, {
				id: "130900",
				name: "\u6ca7\u5dde"
			}, {
				id: "140400",
				name: "\u957f\u6cbb"
			}, {
				id: "150400",
				name: "\u8d64\u5cf0"
			}, {
				id: "220100",
				name: "\u957f\u6625"
			}, {
				id: "320400",
				name: "\u5e38\u5dde"
			}, {
				id: "341100",
				name: "\u6ec1\u5dde"
			}, {
				id: "341400",
				name: "\u5de2\u6e56"
			}, {
				id: "341700",
				name: "\u6c60\u5dde"
			}, {
				id: "430100",
				name: "\u957f\u6c99"
			}, {
				id: "430700",
				name: "\u5e38\u5fb7"
			}, {
				id: "431000",
				name: "\u90f4\u5dde"
			}, {
				id: "445100",
				name: "\u6f6e\u5dde"
			}, {
				id: "451400",
				name: "\u5d07\u5de6"
			}, {
				id: "500100",
				name: "\u91cd\u5e86"
			}, {
				id: "510100",
				name: "\u6210\u90fd"
			}, {
				id: "532300",
				name: "\u695a\u96c4\u5f5d\u65cf\u81ea\u6cbb\u5dde"
			}, {
				id: "542100",
				name: "\u660c\u90fd\u5730\u533a"
			}, {
				id: "652300",
				name: "\u660c\u5409\u56de\u65cf\u81ea\u6cbb\u5dde"
			}]
		],
		[
			'D',
			[{
				id: "140200",
				name: "\u5927\u540c"
			}, {
				id: "210200",
				name: "\u5927\u8fde"
			}, {
				id: "210600",
				name: "\u4e39\u4e1c"
			}, {
				id: "230600",
				name: "\u5927\u5e86"
			}, {
				id: "232700",
				name: "\u5927\u5174\u5b89\u5cad\u5730\u533a"
			}, {
				id: "370500",
				name: "\u4e1c\u8425"
			}, {
				id: "371400",
				name: "\u5fb7\u5dde"
			}, {
				id: "441900",
				name: "\u4e1c\u839e"
			}, {
				id: "510600",
				name: "\u5fb7\u9633"
			}, {
				id: "511700",
				name: "\u8fbe\u5dde"
			}, {
				id: "532900",
				name: "\u5927\u7406\u767d\u65cf\u81ea\u6cbb\u5dde"
			}, {
				id: "533100",
				name: "\u5fb7\u5b8f\u50a3\u65cf\u666f\u9887\u65cf\u81ea\u6cbb\u5dde"
			}, {
				id: "533400",
				name: "\u8fea\u5e86\u85cf\u65cf\u81ea\u6cbb\u5dde"
			}, {
				id: "621100",
				name: "\u5b9a\u897f"
			}, {
				id: "469003",
				name: "\u510b\u5dde\u5e02"
			}]
		],
		[
			'E',
			[{
				id: "150600",
				name: "\u9102\u5c14\u591a\u65af"
			}, {
				id: "420700",
				name: "\u9102\u5dde"
			}, {
				id: "422800",
				name: "\u6069\u65bd\u571f\u5bb6\u65cf\u82d7\u65cf\u81ea\u6cbb\u5dde"
			}]
		],
		[
			'F',
			[{
				id: "210400",
				name: "\u629a\u987a"
			}, {
				id: "210900",
				name: "\u961c\u65b0"
			}, {
				id: "341200",
				name: "\u961c\u9633"
			}, {
				id: "350100",
				name: "\u798f\u5dde"
			}, {
				id: "361000",
				name: "\u629a\u5dde"
			}, {
				id: "440600",
				name: "\u4f5b\u5c71"
			}, {
				id: "450600",
				name: "\u9632\u57ce\u6e2f"
			}]
		],
		[
			'G',
			[{
				id: "360700",
				name: "\u8d63\u5dde"
			}, {
				id: "440100",
				name: "\u5e7f\u5dde"
			}, {
				id: "450300",
				name: "\u6842\u6797"
			}, {
				id: "450800",
				name: "\u8d35\u6e2f"
			}, {
				id: "510800",
				name: "\u5e7f\u5143"
			}, {
				id: "511600",
				name: "\u5e7f\u5b89"
			}, {
				id: "513300",
				name: "\u7518\u5b5c\u85cf\u65cf\u81ea\u6cbb\u5dde"
			}, {
				id: "520100",
				name: "\u8d35\u9633"
			}, {
				id: "623000",
				name: "\u7518\u5357\u85cf\u65cf\u81ea\u6cbb\u5dde"
			}, {
				id: "632600",
				name: "\u679c\u6d1b\u85cf\u65cf\u81ea\u6cbb\u5dde"
			}, {
				id: "640400",
				name: "\u56fa\u539f"
			}, {
				id: "710200",
				name: "\u9ad8\u96c4"
			}, {
				id: "712300",
				name: "\u9ad8\u96c4\u53bf"
			}]
		],
		[
			'H',
			[{
				id: "130400",
				name: "\u90af\u90f8"
			}, {
				id: "131100",
				name: "\u8861\u6c34"
			}, {
				id: "150100",
				name: "\u547c\u548c\u6d69\u7279"
			}, {
				id: "150700",
				name: "\u547c\u4f26\u8d1d\u5c14"
			}, {
				id: "211400",
				name: "\u846b\u82a6\u5c9b"
			}, {
				id: "230100",
				name: "\u54c8\u5c14\u6ee8"
			}, {
				id: "230400",
				name: "\u9e64\u5c97"
			}, {
				id: "231100",
				name: "\u9ed1\u6cb3"
			}, {
				id: "320800",
				name: "\u6dee\u5b89"
			}, {
				id: "330100",
				name: "\u676d\u5dde"
			}, {
				id: "330500",
				name: "\u6e56\u5dde"
			}, {
				id: "340100",
				name: "\u5408\u80a5"
			}, {
				id: "340400",
				name: "\u6dee\u5357"
			}, {
				id: "340600",
				name: "\u6dee\u5317"
			}, {
				id: "341000",
				name: "\u9ec4\u5c71"
			}, {
				id: "371700",
				name: "\u83cf\u6cfd"
			}, {
				id: "410600",
				name: "\u9e64\u58c1"
			}, {
				id: "420200",
				name: "\u9ec4\u77f3"
			}, {
				id: "421100",
				name: "\u9ec4\u5188"
			}, {
				id: "430400",
				name: "\u8861\u9633"
			}, {
				id: "431200",
				name: "\u6000\u5316"
			}, {
				id: "441300",
				name: "\u60e0\u5dde"
			}, {
				id: "441600",
				name: "\u6cb3\u6e90"
			}, {
				id: "451100",
				name: "\u8d3a\u5dde"
			}, {
				id: "451200",
				name: "\u6cb3\u6c60"
			}, {
				id: "460100",
				name: "\u6d77\u53e3"
			}, {
				id: "532500",
				name: "\u7ea2\u6cb3\u54c8\u5c3c\u65cf\u5f5d\u65cf\u81ea\u6cbb\u5dde"
			}, {
				id: "610700",
				name: "\u6c49\u4e2d"
			}, {
				id: "632100",
				name: "\u6d77\u4e1c\u5730\u533a"
			}, {
				id: "632200",
				name: "\u6d77\u5317\u85cf\u65cf\u81ea\u6cbb\u5dde"
			}, {
				id: "632300",
				name: "\u9ec4\u5357\u85cf\u65cf\u81ea\u6cbb\u5dde"
			}, {
				id: "632500",
				name: "\u6d77\u5357\u85cf\u65cf\u81ea\u6cbb\u5dde"
			}, {
				id: "632800",
				name: "\u6d77\u897f\u8499\u53e4\u65cf\u85cf\u65cf\u81ea\u6cbb\u5dde"
			}, {
				id: "652200",
				name: "\u54c8\u5bc6\u5730\u533a"
			}, {
				id: "653200",
				name: "\u548c\u7530\u5730\u533a"
			}, {
				id: "712600",
				name: "\u82b1\u83b2\u53bf"
			}]
		],
		[
			'J',
			[{
				id: "140500",
				name: "\u664b\u57ce"
			}, {
				id: "140700",
				name: "\u664b\u4e2d"
			}, {
				id: "210700",
				name: "\u9526\u5dde"
			}, {
				id: "220200",
				name: "\u5409\u6797"
			}, {
				id: "230300",
				name: "\u9e21\u897f"
			}, {
				id: "230800",
				name: "\u4f73\u6728\u65af"
			}, {
				id: "330400",
				name: "\u5609\u5174"
			}, {
				id: "330700",
				name: "\u91d1\u534e"
			}, {
				id: "360200",
				name: "\u666f\u5fb7\u9547"
			}, {
				id: "360400",
				name: "\u4e5d\u6c5f"
			}, {
				id: "360800",
				name: "\u5409\u5b89"
			}, {
				id: "370100",
				name: "\u6d4e\u5357"
			}, {
				id: "370800",
				name: "\u6d4e\u5b81"
			}, {
				id: "410800",
				name: "\u7126\u4f5c"
			}, {
				id: "420800",
				name: "\u8346\u95e8"
			}, {
				id: "421000",
				name: "\u8346\u5dde"
			}, {
				id: "440700",
				name: "\u6c5f\u95e8"
			}, {
				id: "445200",
				name: "\u63ed\u9633"
			}, {
				id: "620200",
				name: "\u5609\u5cea\u5173"
			}, {
				id: "620300",
				name: "\u91d1\u660c"
			}, {
				id: "620900",
				name: "\u9152\u6cc9"
			}, {
				id: "710500",
				name: "\u91d1\u95e8\u53bf"
			}, {
				id: "710700",
				name: "\u57fa\u9686"
			}, {
				id: "710900",
				name: "\u5609\u4e49"
			}, {
				id: "810200",
				name: "\u4e5d\u9f99"
			}, {
				id: "410881",
				name: "\u6d4e\u6e90\u5e02"
			}, {
				id: "711900",
				name: "\u5609\u4e49\u53bf"
			}]
		],
		[
			'K',
			[{
				id: "410200",
				name: "\u5f00\u5c01"
			}, {
				id: "530100",
				name: "\u6606\u660e"
			}, {
				id: "650200",
				name: "\u514b\u62c9\u739b\u4f9d"
			}, {
				id: "653000",
				name: "\u514b\u5b5c\u52d2\u82cf\u67ef\u5c14\u514b\u5b5c\u81ea\u6cbb\u5dde"
			}, {
				id: "653100",
				name: "\u5580\u4ec0\u5730\u533a"
			}]
		],
		[
			'L',
			[{
				id: "131000",
				name: "\u5eca\u574a"
			}, {
				id: "141000",
				name: "\u4e34\u6c7e"
			}, {
				id: "141100",
				name: "\u5415\u6881"
			}, {
				id: "211000",
				name: "\u8fbd\u9633"
			}, {
				id: "220400",
				name: "\u8fbd\u6e90"
			}, {
				id: "320700",
				name: "\u8fde\u4e91\u6e2f"
			}, {
				id: "331100",
				name: "\u4e3d\u6c34"
			}, {
				id: "341500",
				name: "\u516d\u5b89"
			}, {
				id: "350800",
				name: "\u9f99\u5ca9"
			}, {
				id: "371200",
				name: "\u83b1\u829c"
			}, {
				id: "371300",
				name: "\u4e34\u6c82"
			}, {
				id: "371500",
				name: "\u804a\u57ce"
			}, {
				id: "410300",
				name: "\u6d1b\u9633"
			}, {
				id: "431300",
				name: "\u5a04\u5e95"
			}, {
				id: "450200",
				name: "\u67f3\u5dde"
			}, {
				id: "451300",
				name: "\u6765\u5bbe"
			}, {
				id: "510500",
				name: "\u6cf8\u5dde"
			}, {
				id: "511100",
				name: "\u4e50\u5c71"
			}, {
				id: "513400",
				name: "\u51c9\u5c71\u5f5d\u65cf\u81ea\u6cbb\u5dde"
			}, {
				id: "520200",
				name: "\u516d\u76d8\u6c34"
			}, {
				id: "530700",
				name: "\u4e3d\u6c5f"
			}, {
				id: "530900",
				name: "\u4e34\u6ca7"
			}, {
				id: "540100",
				name: "\u62c9\u8428"
			}, {
				id: "542600",
				name: "\u6797\u829d\u5730\u533a"
			}, {
				id: "620100",
				name: "\u5170\u5dde"
			}, {
				id: "621200",
				name: "\u9647\u5357"
			}, {
				id: "622900",
				name: "\u4e34\u590f\u56de\u65cf\u81ea\u6cbb\u5dde"
			}, {
				id: "820200",
				name: "\u79bb\u5c9b"
			}]
		],
		[
			'M',
			[{
				id: "231000",
				name: "\u7261\u4e39\u6c5f"
			}, {
				id: "340500",
				name: "\u9a6c\u978d\u5c71"
			}, {
				id: "440900",
				name: "\u8302\u540d"
			}, {
				id: "441400",
				name: "\u6885\u5dde"
			}, {
				id: "510700",
				name: "\u7ef5\u9633"
			}, {
				id: "511400",
				name: "\u7709\u5c71"
			}, {
				id: "711500",
				name: "\u82d7\u6817\u53bf"
			}]
		],
		[
			'N',
			[{
				id: "320100",
				name: "\u5357\u4eac"
			}, {
				id: "320600",
				name: "\u5357\u901a"
			}, {
				id: "330200",
				name: "\u5b81\u6ce2"
			}, {
				id: "350700",
				name: "\u5357\u5e73"
			}, {
				id: "350900",
				name: "\u5b81\u5fb7"
			}, {
				id: "360100",
				name: "\u5357\u660c"
			}, {
				id: "411300",
				name: "\u5357\u9633"
			}, {
				id: "450100",
				name: "\u5357\u5b81"
			}, {
				id: "511000",
				name: "\u5185\u6c5f"
			}, {
				id: "511300",
				name: "\u5357\u5145"
			}, {
				id: "533300",
				name: "\u6012\u6c5f\u5088\u50f3\u65cf\u81ea\u6cbb\u5dde"
			}, {
				id: "542400",
				name: "\u90a3\u66f2\u5730\u533a"
			}, {
				id: "710600",
				name: "\u5357\u6295\u53bf"
			}]
		],
		[
			'P',
			[{
				id: "211100",
				name: "\u76d8\u9526"
			}, {
				id: "350300",
				name: "\u8386\u7530"
			}, {
				id: "360300",
				name: "\u840d\u4e61"
			}, {
				id: "410400",
				name: "\u5e73\u9876\u5c71"
			}, {
				id: "410900",
				name: "\u6fee\u9633"
			}, {
				id: "510400",
				name: "\u6500\u679d\u82b1"
			}, {
				id: "530800",
				name: "\u666e\u6d31"
			}, {
				id: "620800",
				name: "\u5e73\u51c9"
			}, {
				id: "712400",
				name: "\u5c4f\u4e1c\u53bf"
			}, {
				id: "712700",
				name: "\u6f8e\u6e56\u53bf"
			}]
		],
		[
			'Q',
			[{
				id: "130300",
				name: "\u79e6\u7687\u5c9b"
			}, {
				id: "230200",
				name: "\u9f50\u9f50\u54c8\u5c14"
			}, {
				id: "230900",
				name: "\u4e03\u53f0\u6cb3"
			}, {
				id: "330800",
				name: "\u8862\u5dde"
			}, {
				id: "350500",
				name: "\u6cc9\u5dde"
			}, {
				id: "370200",
				name: "\u9752\u5c9b"
			}, {
				id: "441800",
				name: "\u6e05\u8fdc"
			}, {
				id: "450700",
				name: "\u94a6\u5dde"
			}, {
				id: "522300",
				name: "\u9ed4\u897f\u5357\u5e03\u4f9d\u65cf\u82d7\u65cf\u81ea\u6cbb\u5dde"
			}, {
				id: "522600",
				name: "\u9ed4\u4e1c\u5357\u82d7\u65cf\u4f97\u65cf\u81ea\u6cbb\u5dde"
			}, {
				id: "522700",
				name: "\u9ed4\u5357\u5e03\u4f9d\u65cf\u82d7\u65cf\u81ea\u6cbb\u5dde"
			}, {
				id: "530300",
				name: "\u66f2\u9756"
			}, {
				id: "621000",
				name: "\u5e86\u9633"
			}, {
				id: "429005",
				name: "\u6f5c\u6c5f\u5e02"
			}]
		],
		[
			'R',
			[{
				id: "371100",
				name: "\u65e5\u7167"
			}, {
				id: "542300",
				name: "\u65e5\u5580\u5219\u5730\u533a"
			}]
		],
		[
			'S',
			[{
				id: "130100",
				name: "\u77f3\u5bb6\u5e84"
			}, {
				id: "140600",
				name: "\u6714\u5dde"
			}, {
				id: "210100",
				name: "\u6c88\u9633"
			}, {
				id: "220300",
				name: "\u56db\u5e73"
			}, {
				id: "220700",
				name: "\u677e\u539f"
			}, {
				id: "230500",
				name: "\u53cc\u9e2d\u5c71"
			}, {
				id: "231200",
				name: "\u7ee5\u5316"
			}, {
				id: "310100",
				name: "\u4e0a\u6d77"
			}, {
				id: "320500",
				name: "\u82cf\u5dde"
			}, {
				id: "321300",
				name: "\u5bbf\u8fc1"
			}, {
				id: "330600",
				name: "\u7ecd\u5174"
			}, {
				id: "341300",
				name: "\u5bbf\u5dde"
			}, {
				id: "350400",
				name: "\u4e09\u660e"
			}, {
				id: "361100",
				name: "\u4e0a\u9976"
			}, {
				id: "411200",
				name: "\u4e09\u95e8\u5ce1"
			}, {
				id: "411400",
				name: "\u5546\u4e18"
			}, {
				id: "420300",
				name: "\u5341\u5830"
			}, {
				id: "421300",
				name: "\u968f\u5dde"
			}, {
				id: "430500",
				name: "\u90b5\u9633"
			}, {
				id: "440200",
				name: "\u97f6\u5173"
			}, {
				id: "440300",
				name: "\u6df1\u5733"
			}, {
				id: "440500",
				name: "\u6c55\u5934"
			}, {
				id: "441500",
				name: "\u6c55\u5c3e"
			}, {
				id: "460200",
				name: "\u4e09\u4e9a"
			}, {
				id: "510900",
				name: "\u9042\u5b81"
			}, {
				id: "542200",
				name: "\u5c71\u5357\u5730\u533a"
			}, {
				id: "611000",
				name: "\u5546\u6d1b"
			}, {
				id: "640200",
				name: "\u77f3\u5634\u5c71"
			}, {
				id: "429021",
				name: "\u795e\u519c\u67b6\u6797\u533a"
			}, {
				id: "659001",
				name: "\u77f3\u6cb3\u5b50\u5e02"
			}, {
				id: "460300",
				name: "\u4e09\u6c99\u5e02"
			}]
		],
		[
			'T',
			[{
				id: "120100",
				name: "\u5929\u6d25"
			}, {
				id: "130200",
				name: "\u5510\u5c71"
			}, {
				id: "140100",
				name: "\u592a\u539f"
			}, {
				id: "150500",
				name: "\u901a\u8fbd"
			}, {
				id: "211200",
				name: "\u94c1\u5cad"
			}, {
				id: "220500",
				name: "\u901a\u5316"
			}, {
				id: "321200",
				name: "\u6cf0\u5dde"
			}, {
				id: "331000",
				name: "\u53f0\u5dde"
			}, {
				id: "340700",
				name: "\u94dc\u9675"
			}, {
				id: "370900",
				name: "\u6cf0\u5b89"
			}, {
				id: "411100",
				name: "\u6f2f\u6cb3"
			}, {
				id: "522200",
				name: "\u94dc\u4ec1\u5730\u533a"
			}, {
				id: "610200",
				name: "\u94dc\u5ddd"
			}, {
				id: "620500",
				name: "\u5929\u6c34"
			}, {
				id: "652100",
				name: "\u5410\u9c81\u756a\u5730\u533a"
			}, {
				id: "654200",
				name: "\u5854\u57ce\u5730\u533a"
			}, {
				id: "710100",
				name: "\u53f0\u5317"
			}, {
				id: "710300",
				name: "\u53f0\u5357"
			}, {
				id: "710400",
				name: "\u53f0\u4e2d"
			}, {
				id: "429006",
				name: "\u5929\u95e8\u5e02"
			}, {
				id: "659003",
				name: "\u56fe\u6728\u8212\u514b\u5e02"
			}, {
				id: "711100",
				name: "\u53f0\u5317\u53bf"
			}, {
				id: "711400",
				name: "\u6843\u56ed\u53bf"
			}, {
				id: "711600",
				name: "\u53f0\u4e2d\u53bf"
			}, {
				id: "712200",
				name: "\u53f0\u5357\u53bf"
			}, {
				id: "712500",
				name: "\u53f0\u4e1c\u53bf"
			}]
		],
		[
			'W',
			[{
				id: "150300",
				name: "\u4e4c\u6d77"
			}, {
				id: "150900",
				name: "\u4e4c\u5170\u5bdf\u5e03"
			}, {
				id: "320200",
				name: "\u65e0\u9521"
			}, {
				id: "330300",
				name: "\u6e29\u5dde"
			}, {
				id: "340200",
				name: "\u829c\u6e56"
			}, {
				id: "370700",
				name: "\u6f4d\u574a"
			}, {
				id: "371000",
				name: "\u5a01\u6d77"
			}, {
				id: "420100",
				name: "\u6b66\u6c49"
			}, {
				id: "450400",
				name: "\u68a7\u5dde"
			}, {
				id: "532600",
				name: "\u6587\u5c71\u58ee\u65cf\u82d7\u65cf\u81ea\u6cbb\u5dde"
			}, {
				id: "610500",
				name: "\u6e2d\u5357"
			}, {
				id: "620600",
				name: "\u6b66\u5a01"
			}, {
				id: "640300",
				name: "\u5434\u5fe0"
			}, {
				id: "650100",
				name: "\u4e4c\u9c81\u6728\u9f50"
			}, {
				id: "659004",
				name: "\u4e94\u5bb6\u6e20\u5e02"
			}]
		],
		[
			'X',
			[{
				id: "130500",
				name: "\u90a2\u53f0"
			}, {
				id: "140900",
				name: "\u5ffb\u5dde"
			}, {
				id: "152200",
				name: "\u5174\u5b89\u76df"
			}, {
				id: "152500",
				name: "\u9521\u6797\u90ed\u52d2\u76df"
			}, {
				id: "320300",
				name: "\u5f90\u5dde"
			}, {
				id: "341800",
				name: "\u5ba3\u57ce"
			}, {
				id: "350200",
				name: "\u53a6\u95e8"
			}, {
				id: "360500",
				name: "\u65b0\u4f59"
			}, {
				id: "410700",
				name: "\u65b0\u4e61"
			}, {
				id: "411000",
				name: "\u8bb8\u660c"
			}, {
				id: "411500",
				name: "\u4fe1\u9633"
			}, {
				id: "420600",
				name: "\u8944\u6a0a"
			}, {
				id: "420900",
				name: "\u5b5d\u611f"
			}, {
				id: "421200",
				name: "\u54b8\u5b81"
			}, {
				id: "430300",
				name: "\u6e58\u6f6d"
			}, {
				id: "433100",
				name: "\u6e58\u897f\u571f\u5bb6\u65cf\u82d7\u65cf\u81ea\u6cbb\u5dde"
			}, {
				id: "532800",
				name: "\u897f\u53cc\u7248\u7eb3\u50a3\u65cf\u81ea\u6cbb\u5dde"
			}, {
				id: "610100",
				name: "\u897f\u5b89"
			}, {
				id: "610400",
				name: "\u54b8\u9633"
			}, {
				id: "630100",
				name: "\u897f\u5b81"
			}, {
				id: "710800",
				name: "\u65b0\u7af9"
			}, {
				id: "810100",
				name: "\u9999\u6e2f\u5c9b"
			}, {
				id: "810300",
				name: "\u65b0\u754c"
			}, {
				id: "429004",
				name: "\u4ed9\u6843\u5e02"
			}, {
				id: "711300",
				name: "\u65b0\u7af9\u53bf"
			}]
		],
		[
			'Y',
			[{
				id: "140300",
				name: "\u9633\u6cc9"
			}, {
				id: "140800",
				name: "\u8fd0\u57ce"
			}, {
				id: "210800",
				name: "\u8425\u53e3"
			}, {
				id: "222400",
				name: "\u5ef6\u8fb9\u671d\u9c9c\u65cf\u81ea\u6cbb\u5dde"
			}, {
				id: "230700",
				name: "\u4f0a\u6625"
			}, {
				id: "320900",
				name: "\u76d0\u57ce"
			}, {
				id: "321000",
				name: "\u626c\u5dde"
			}, {
				id: "360600",
				name: "\u9e70\u6f6d"
			}, {
				id: "360900",
				name: "\u5b9c\u6625"
			}, {
				id: "370600",
				name: "\u70df\u53f0"
			}, {
				id: "420500",
				name: "\u5b9c\u660c"
			}, {
				id: "430600",
				name: "\u5cb3\u9633"
			}, {
				id: "430900",
				name: "\u76ca\u9633"
			}, {
				id: "431100",
				name: "\u6c38\u5dde"
			}, {
				id: "441700",
				name: "\u9633\u6c5f"
			}, {
				id: "445300",
				name: "\u4e91\u6d6e"
			}, {
				id: "450900",
				name: "\u7389\u6797"
			}, {
				id: "511500",
				name: "\u5b9c\u5bbe"
			}, {
				id: "511800",
				name: "\u96c5\u5b89"
			}, {
				id: "530400",
				name: "\u7389\u6eaa"
			}, {
				id: "610600",
				name: "\u5ef6\u5b89"
			}, {
				id: "610800",
				name: "\u6986\u6797"
			}, {
				id: "632700",
				name: "\u7389\u6811\u85cf\u65cf\u81ea\u6cbb\u5dde"
			}, {
				id: "640100",
				name: "\u94f6\u5ddd"
			}, {
				id: "654000",
				name: "\u4f0a\u7281\u54c8\u8428\u514b\u81ea\u6cbb\u5dde"
			}, {
				id: "711200",
				name: "\u5b9c\u5170\u53bf"
			}, {
				id: "712100",
				name: "\u4e91\u6797\u53bf"
			}]
		],
		[
			'Z',
			[{
				id: "130700",
				name: "\u5f20\u5bb6\u53e3"
			}, {
				id: "211300",
				name: "\u671d\u9633"
			}, {
				id: "321100",
				name: "\u9547\u6c5f"
			}, {
				id: "330900",
				name: "\u821f\u5c71"
			}, {
				id: "350600",
				name: "\u6f33\u5dde"
			}, {
				id: "370300",
				name: "\u6dc4\u535a"
			}, {
				id: "370400",
				name: "\u67a3\u5e84"
			}, {
				id: "410100",
				name: "\u90d1\u5dde"
			}, {
				id: "411600",
				name: "\u5468\u53e3"
			}, {
				id: "411700",
				name: "\u9a7b\u9a6c\u5e97"
			}, {
				id: "430200",
				name: "\u682a\u6d32"
			}, {
				id: "430800",
				name: "\u5f20\u5bb6\u754c"
			}, {
				id: "440400",
				name: "\u73e0\u6d77"
			}, {
				id: "440800",
				name: "\u6e5b\u6c5f"
			}, {
				id: "441200",
				name: "\u8087\u5e86"
			}, {
				id: "442000",
				name: "\u4e2d\u5c71"
			}, {
				id: "510300",
				name: "\u81ea\u8d21"
			}, {
				id: "512000",
				name: "\u8d44\u9633"
			}, {
				id: "520300",
				name: "\u9075\u4e49"
			}, {
				id: "530600",
				name: "\u662d\u901a"
			}, {
				id: "620700",
				name: "\u5f20\u6396"
			}, {
				id: "640500",
				name: "\u4e2d\u536b"
			}, {
				id: "711700",
				name: "\u5f70\u5316\u53bf"
			}]
		],
		[
			"#",
			[{
				id: "110100",
				name: "\u5317\u4eac"
			}, {
				id: "120100",
				name: "\u5929\u6d25"
			}, {
				id: "130100",
				name: "\u77f3\u5bb6\u5e84"
			}, {
				id: "150100",
				name: "\u547c\u548c\u6d69\u7279"
			}, {
				id: "210100",
				name: "\u6c88\u9633"
			}, {
				id: "210200",
				name: "\u5927\u8fde"
			}, {
				id: "220100",
				name: "\u957f\u6625"
			}, {
				id: "230100",
				name: "\u54c8\u5c14\u6ee8"
			}, {
				id: "310100",
				name: "\u4e0a\u6d77"
			}, {
				id: "320100",
				name: "\u5357\u4eac"
			}, {
				id: "320200",
				name: "\u65e0\u9521"
			}, {
				id: "320400",
				name: "\u5e38\u5dde"
			}, {
				id: "320500",
				name: "\u82cf\u5dde"
			}, {
				id: "330100",
				name: "\u676d\u5dde"
			}, {
				id: "330200",
				name: "\u5b81\u6ce2"
			}, {
				id: "330300",
				name: "\u6e29\u5dde"
			}, {
				id: "340100",
				name: "\u5408\u80a5"
			}, {
				id: "350100",
				name: "\u798f\u5dde"
			}, {
				id: "350200",
				name: "\u53a6\u95e8"
			}, {
				id: "360100",
				name: "\u5357\u660c"
			}, {
				id: "370100",
				name: "\u6d4e\u5357"
			}, {
				id: "370200",
				name: "\u9752\u5c9b"
			}, {
				id: "410100",
				name: "\u90d1\u5dde"
			}, {
				id: "420100",
				name: "\u6b66\u6c49"
			}, {
				id: "430100",
				name: "\u957f\u6c99"
			}, {
				id: "440100",
				name: "\u5e7f\u5dde"
			}, {
				id: "440300",
				name: "\u6df1\u5733"
			}, {
				id: "440600",
				name: "\u4f5b\u5c71"
			}, {
				id: "441900",
				name: "\u4e1c\u839e"
			}, {
				id: "450100",
				name: "\u5357\u5b81"
			}, {
				id: "500100",
				name: "\u91cd\u5e86"
			}, {
				id: "510100",
				name: "\u6210\u90fd"
			}, {
				id: "520100",
				name: "\u8d35\u9633"
			}, {
				id: "530100",
				name: "\u6606\u660e"
			}, {
				id: "610100",
				name: "\u897f\u5b89"
			}]
		]
	]


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

				$FXH.Post(`${API_PATH}/api/loan/v1/applyDmLoan.json`, {
					address:  getSumMoneyPopVal.homeVal,
					balance: getSumMoneyPopVal.moneyVal,
					term: getSumMoneyPopVal.deadlineVal,
					realName: getDataProps.realName,
					idCard: getDataProps.idCard,
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
					position: this.state.position,
					userCookieID: navigator.userAgent
				}).then(data => {
					alert(data)
				})
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

	handlerCitySelect(data, i, cntData, index ) {
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

		let cityListVal = (data, index) => {
			if(this.state.sumMoneyListObj.cityIndex != '') {
				if(this.state.sumMoneyListObj.cityIndex[0] == data && this.state.sumMoneyListObj.cityIndex[1] == index ) {
					return  <div className="select-icon"></div>
				}

			}
		}

		let cityList = () => {
				return 	<div className="cnt-pop">
							<div className="ui-list marriage-list city-list">
								{
									CITY_ARR.map((data, i) => {

										return <div key={ i }>
												<div className="city-name">{ data[0] }</div>

												{
													data[1].map((cntData, index) => {
														return <div className="list"  key={ index } onClick={ this.handlerCitySelect.bind(this, data, i, cntData, index) }>
																<div className="name-text">{ cntData.name }</div>
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
					<div className="back" onClick={ this.handlerBack.bind(this) } ></div>
					<div className="title">{ popTitle }</div>
				</div>

				{ selectList != 'marriageVal' && selectList != 'relationship' && selectList != 'income'  && selectList != 'yearsOfWork' && selectList != 'city' ?
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

				{
					selectList == 'city' ? cityList() : null
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

