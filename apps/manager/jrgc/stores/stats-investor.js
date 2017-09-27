import { observable, extendObservable, computed } from 'mobx'


export default class StatsInvestor {

    constructor(Get) {
        this.get = Get;

        this.data = { };
        extendObservable(this.data, {
            investorType: '',
            durationType: '',
            investorRawData: []
        })
    }

    _getSortNo = (sortBy, sortDescending) => {
        let { investorType } = this.data,
            sortNo = '';
        if (investorType === 'invested') {
            if (sortBy === 'amount' && !sortDescending) sortNo = '11'
            if (sortBy === 'amount' && sortDescending) sortNo = '12'
            if (sortBy === 'amountAnnual' && !sortDescending) sortNo = '21'
            if (sortBy === 'amountAnnual' && sortDescending) sortNo = '22'
            if (sortBy === 'balance' && !sortDescending) sortNo = '31'
            if (sortBy === 'balance' && sortDescending) sortNo = '32'
        } else if (investorType === 'registered') {
            if (!sortDescending) sortNo = '41'
            if (sortDescending) sortNo = '42'
        } else if (investorType === 'investedFirstTime') {
            if (sortBy === 'amount' && !sortDescending) sortNo = '51'
            if (sortBy === 'amount' && sortDescending) sortNo = '52'
            if (sortBy === 'time' && !sortDescending) sortNo = '61'
            if (sortBy === 'time' && sortDescending) sortNo = '62'
            if (sortBy === 'balance' && !sortDescending) sortNo = '71'
            if (sortBy === 'balance' && sortDescending) sortNo = '72'
        }
        return sortNo
    }

    initStats = (investorType, durationType) => {
        this.data.investorType = investorType;
        this.data.durationType = durationType;
    }

    fetchInvestorInfo = (sortBy, sortDescending, pageNo) => {
        let { durationType, investorRawData } = this.data,
            sortNo = this._getSortNo(sortBy, sortDescending);

        if (pageNo === 1) investorRawData.splice(0, investorRawData.length);

        return this.get('/api/finManager/achievement/v2/custList.shtml', {
            orderType: sortNo,
            timeType: durationType,
            pageNo: pageNo,
            pageSize: 10
        }).then(({ pageData }) => {
            const investData = pageData.result,
                totalPage = pageData.pagination.totalPage;

            investorRawData.push(...investData);

            pageNo = (totalPage === 0 || totalPage === pageNo) ? 0 : (pageNo + 1);
            return pageNo;
        })
    }

}