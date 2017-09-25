import { extendObservable } from 'mobx'

// fake APIs
const fakeInvestorAPI = no => {
    const investor = [{
        invested: 12,
        registered: 10,
        investedFirstTime: 3,
        investAmount: '12000',
        investAmountAnnual: '15000',
    }, {
        invested: 120,
        registered: 100,
        investedFirstTime: 30,
        investAmount: '120000',
        investAmountAnnual: '150000',
    }, {
        invested: 1200,
        registered: 1000,
        investedFirstTime: 300,
        investAmount: '1200000',
        investAmountAnnual: '1500000',
    }, {
        invested: 12000,
        registered: 10000,
        investedFirstTime: 3000,
        investAmount: '12000000',
        investAmountAnnual: '15000000',
    }]
    return investor[no]
}

const fakeGraphAPI = no => {
    const graph = [{
        date: ['9.21', '9.22'],
        value: ['20', '25'],
        valueAnnual: ['22', '27']
    }, {
        date: ['9.16', '9.17', '9.18', '9.19', '9.20', '9.21', '9.22'],
        value: ['20', '25', '10', '35', '10', '25', '40'],
        valueAnnual: ['20', '25', '40', '55', '30', '25', '10']
    }, {
        date: ['9.1', '9.8', '9.15', '9.22'],
        value: ['10', '35', '10', '25'],
        valueAnnual: ['30', '25', '10', '35']
    }, {
        date: ['4.22', '5.22', '6.22', '7.22', '8.22', '9.22'],
        value: ['25', '40', '55', '30', '25', '10'],
        valueAnnual: ['20', '25', '10', '35', '10', '25']
    }]
    return graph[no]
}
// delete after test

export default class Stats {

    constructor(Get) {
        this.get = Get;

        this.data = { };
        extendObservable(this.data, {
            investor: [{
                invested: null,
                registered: null,
                investedFirstTime: null,
                investAmount: '',
                investAmountAnnual: '',
            }],
            graph: [{
                date: [],
                value: [],
                valueAnnual: []
            }]
        })
    }

    fetchTabData = tabNo => {
        this.data.investor[tabNo] = fakeInvestorAPI(tabNo);
        this.fetchGraphData(tabNo);
    }

    fetchGraphData = tabNo => {
        const type = String(tabNo + 1);
        this.get('/api/finManager/achievement/v2/stat.json', {
            type: type,
            userId: '543'
        }).then(({ result }) => {
            const graphItem = this.data.graph[tabNo];
            graphItem.date = [...result.timeDimension];
            graphItem.value = [...result.accInvestAmtList];
            graphItem.valueAnnual = [...result.annualInvestAmtList];
        })
    }

}