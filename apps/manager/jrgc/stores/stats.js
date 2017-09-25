import { extendObservable, computed } from 'mobx'


export default class Stats {

    constructor(Get) {
        this.get = Get;

        this.data = { };
        extendObservable(this.data, {
            currentTab: '1',
            graph: {
                '1': { },
                '2': { },
                '3': { },
                '4': { }
            },
            investor: {
                '1': { },
                '2': { },
                '3': { },
                '4': { }
            }
        })
    }

    @computed get graphFormatted() {
        const { currentTab, graph } = this.data;
        let graphData = graph[currentTab];
        if (Object.keys(graphData) < 1) {
            graphData = {
                date: [],
                value: [],
                valueAnnual: []
            }
        }
        return graphData
    }

    @computed get investorFormatted() {
        const { currentTab, investor } = this.data;
        let investorData = investor[currentTab];
        if (Object.keys(investorData) < 1) {
            investorData = {
                invested: '',
                registered: '',
                investedFirstTime: '',
                investAmount: '',
                investAmountAnnual: ''
            }
        }
        return investorData
    }

    setCurrentTab = tabNo => this.data.currentTab = tabNo

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