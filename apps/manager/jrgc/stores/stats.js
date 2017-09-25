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

    getGraphData = tabNo => {
        const { graph } = this.data,
            graphData = {
                date: [],
                value: [],
                valueAnnual: []
            };
        if (graph[tabNo] !== undefined) {
            console.log(graph[tabNo]);
            graphData.date = graph[tabNo].date.slice();
            graphData.value = graph[tabNo].value.slice();
            graphData.valueAnnual = graph[tabNo].valueAnnual.slice();
        }
        return graphData
    }

    getInvestorData = tabNo => {
        const { investor } = this.data,
            investorData = {
                invested: null,
                registered: null,
                investedFirstTime: null,
                investAmount: '',
                investAmountAnnual: '',
            };
        if (investor[tabNo] !== undefined) {
            investorData.invested = investor[tabNo].invested;
            investorData.registered = investor[tabNo].registered;
            investorData.investedFirstTime = investor[tabNo].investedFirstTime;
            investorData.investAmount = investor[tabNo].investAmount;
            investorData.investAmountAnnual = investor[tabNo].investAmountAnnual;
        }
        return investorData
    }

}