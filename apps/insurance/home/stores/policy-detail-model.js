import { extendObservable } from 'mobx'

export default class Car {

    model = {
        '1': {
            policyType: 'car',
            platform: '', // '0' for pingan
            baseDetail: {
                CheSun: {
                    name: {
                        '1': '车辆损失险',
                        '2': '不计免赔'
                    },
                    value: {
                        '1': '',
                        '2': false
                    },
                    options: {
                        '1': [{
                                name: '不投保',
                                value: 0
                            }, {
                                name: '投保',
                                value: 1
                            }],
                        '2': null,
                    }
                },
                Sanzhe: {
                    name: {
                        '1': '第三者责任险',
                        '2': '不计免赔'
                    },
                    value: {
                        '1': '',
                        '2': false
                    },
                    options: {
                        '1': [{
                                name: '不投保',
                                value: 0
                            }, {
                                name: '5万',
                                value: 50000
                            }, {
                                name: '10万',
                                value: 100000
                            }, {
                                name: '15万',
                                value: 150000
                            }, {
                                name: '20万',
                                value: 200000
                            }, {
                                name: '30万',
                                value: 300000
                            }, {
                                name: '50万',
                                value: 500000
                            }, {
                                name: '100万',
                                value: 1000000
                            }]
                        '2': null,
                    }
                },
                SiJi: {
                    name: {
                        '1': '司机座位险',
                        '2': '不计免赔'
                    },
                    value: {
                        '1': '',
                        '2': false
                    },
                    options: {
                        '1': [{
                                name: '不投保',
                                value: 0
                            }, {
                                name: '1万',
                                value: 10000
                            }, {
                                name: '2万',
                                value: 20000
                            }, {
                                name: '3万',
                                value: 30000
                            }, {
                                name: '4万',
                                value: 40000
                            }, {
                                name: '5万',
                                value: 50000
                            }, {
                                name: '10万',
                                value: 100000
                            }, {
                                name: '20万',
                                value: 200000
                            }]
                        '2': null,
                    }
                },
                ChengKe: {
                    name: {
                        '1': '乘客座位险',
                        '2': '不计免赔'
                    },
                    value: {
                        '1': '',
                        '2': false
                    },
                    options: {
                        '1': [{
                                name: '不投保',
                                value: 0
                            }, {
                                name: '1万',
                                value: 10000
                            }, {
                                name: '2万',
                                value: 20000
                            }, {
                                name: '3万',
                                value: 30000
                            }, {
                                name: '4万',
                                value: 40000
                            }, {
                                name: '5万',
                                value: 50000
                            }, {
                                name: '10万',
                                value: 100000
                            }, {
                                name: '20万',
                                value: 200000
                            }]
                        '2': null,
                    }
                },
                DaoQiang: {
                    name: {
                        '1': '盗抢险',
                        '2': '不计免赔'
                    },
                    value: {
                        '1': '',
                        '2': false
                    },
                    options: {
                        '1': [{
                                name: '不投保',
                                value: 0
                            }, {
                                name: '投保',
                                value: 1
                            }],
                        '2': null,
                    }
                },
                HuaHen: {
                    name: {
                        '1': '划痕险',
                        '2': '不计免赔'
                    },
                    value: {
                        '1': '',
                        '2': false
                    },
                    options: {
                        '1': [{
                                name: '不投保',
                                value: 0
                            }, {
                                name: '2000',
                                value: 2000
                            }, {
                                name: '5000',
                                value: 5000
                            }, {
                                name: '1万',
                                value: 10000
                            }, {
                                name: '2万',
                                value: 20000
                            }]
                        '2': null,
                    }
                },
                Boli: {
                    name: '划痕险',
                    value: '',
                    options: [{
                            name: '不投保',
                            value: 0
                        }, {
                            name: '国产',
                            value: 1
                        }, {
                            name: '进口',
                            value: 2
                        }]
                    }
                },
                ZiRan: {
                    name: {
                        '1': '自燃损失险',
                        '2': '不计免赔'
                    },
                    value: {
                        '1': '',
                        '2': false
                    },
                    options: {
                        '1': [{
                                name: '不投保',
                                value: 0
                            }, {
                                name: '投保',
                                value: 1
                            }],
                        '2': null,
                    }
                },
                SheShui: {
                    name: {
                        '1': '涉水行驶损失险',
                        '2': '不计免赔'
                    },
                    value: {
                        '1': '',
                        '2': false
                    },
                    options: {
                        '1': [{
                                name: '不投保',
                                value: 0
                            }, {
                                name: '投保',
                                value: 1
                            }],
                        '2': null,
                    }
                },
                HcSanFangTeYue: {
                    name: '第三方特约险',
                    value: '',
                    options: [{
                            name: '不投保',
                            value: 0
                        }, {
                            name: '投保',
                            value: 1
                        }]
                    }
                }
            },
            plusDetail: {
                area: {
                    name: '投保地区',
                    value: '',
                    placeholder: '请选择地区',
                    options: [
                        {
                            name: '北京',
                            value: '1'
                        },{
                            name: '重庆',
                            value: '2'
                        },{
                            name: '天津',
                            value: '3'
                        },{
                            name: '成都',
                            value: '4'
                        },{
                            name: '昆明',
                            value: '5'
                        },
                    ]
                },
                plateCN: {
                    value: '',
                    options: [
                        {
                            name: '京',
                            value: '1'
                        },{
                            name: '渝',
                            value: '2'
                        },{
                            name: '津',
                            value: '3'
                        },{
                            name: '川',
                            value: '4'
                        },{
                            name: '云',
                            value: '5'
                        },
                    ]
                },
                owner: {
                    name: '车主姓名',
                    value: '',
                    placeholder: '请输入车主姓名'
                },
                type: {
                    name: '车辆型号',
                    value: '',
                    placeholder: '请输入车辆型号'
                },
                frameNo: {
                    name: '车架号',
                    value: '',
                    placeholder: '请输入车架号'
                },
                engineNo: {
                    name: '发动机号',
                    value: '',
                    placeholder: '请输入发动机号'
                }
            }
        }
    }
}
