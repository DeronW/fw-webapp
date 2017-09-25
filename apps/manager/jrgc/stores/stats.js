import { extendObservable } from 'mobx'


export default class Stats {

    constructor(Get) {
        this.get = Get;

        this.data = { };
        extendObservable(this.data, {
            investor: {
                '1': {
                    invested: null,
                    registered: null,
                    investedFirstTime: null,
                    investAmount: '',
                    investAmountAnnual: '',
                },
                '2': {
                    invested: null,
                    registered: null,
                    investedFirstTime: null,
                    investAmount: '',
                    investAmountAnnual: '',
                },
                '3': {
                    invested: null,
                    registered: null,
                    investedFirstTime: null,
                    investAmount: '',
                    investAmountAnnual: '',
                },
                '4': {
                    invested: null,
                    registered: null,
                    investedFirstTime: null,
                    investAmount: '',
                    investAmountAnnual: '',
                }
            },
            graph: {
                '1': {
                    date: [],
                    value: [],
                    valueAnnual: []
                },
                '2': {
                    date: [],
                    value: [],
                    valueAnnual: []
                },
                '3': {
                    date: [],
                    value: [],
                    valueAnnual: []
                },
                '4': {
                    date: [],
                    value: [],
                    valueAnnual: []
                }
            }
        })
    }

    fetchTabData = tabNo => {
        this.fetchGraphData(tabNo);
        this.fetchInvestorData(tabNo);
    }

    fetchGraphData = tabNo => {
        this.get('/api/finManager/achievement/v2/stat.json', {
            type: tabNo,
            userId: '543'
        }).then(({ result }) => {
            this.data.graph[tabNo] = {
                date: result.timeDimension,
                value: result.accInvestAmtList,
                valueAnnual: result.annualInvestAmtList
            };
        })
    }

    fetchInvestorData = tabNo => {
        this.get('/api/finManager/achievement/v2/investInfo.json', {
            type: tabNo,
            userId: '543'
        }).then(({ result }) => {
            this.data.investor[tabNo] = {
                invested: result.investCustCount,
                registered: result.regCustCount,
                investedFirstTime: result.firstInvestCustCount,
                investAmount: result.totalInvestAmt,
                investAmountAnnual: result.totalYearAmt
            };
        })
    }

}