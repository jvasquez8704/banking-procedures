import { endpoinds, transactions } from "../constants/constants";
/**
 *Doc about groupBy function
 *https://gist.github.com/JamieMason/0566f8412af9fe6a1d470aa1e089a752
 */
 const groupBy = key => array =>
 array.reduce(
     (objectsByKeyValue, obj) => ({
         ...objectsByKeyValue,
         [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj)
     }),
     {}
 );

const groupByYear = groupBy('year');

const getKeys = function(obj){
 var keys = [];
 for(var key in obj){
    keys.push(key);
 }
 return keys;
}

const getTabBySign = sing => {
    const tabs = new Map();
    tabs.set('3ff80014eeec26e5e11a942bd96e375d13c48ec0', 1);
    tabs.set('835591af450b9423224678b6d9ff06f5c889f8d6', 2);
    tabs.set('2f8c9f0dd742c22c091134b4a675c67d5fdb9c75', 3);
    return tabs.get(sing);
}

const getTrxBackend = featureId => {
    const txns = new Map();
    txns.set(1,2010);
    txns.set(2,2011);
    txns.set(3,2008);
    txns.set(4,2009);
    txns.set(5,2012);
    return txns.get(featureId);
}

const getModule = () => {
    const search = window.location.search.substring(1);
    const params = new URLSearchParams(search);
    //const param = params.get('module');
    const param = getTabBySign(params.get('module'));
    return (param && !isNaN(param) && param > 0 && param <= 3) ? parseInt(param) : 1; 
}

const getMonthNameByNumber = number => {
    var months = new Map();
    months.set("01", "Enero");
    months.set("02", "Febrero");
    months.set("03", "Marzo");
    months.set("04", "Abril");
    months.set("05", "Mayo");
    months.set("06", "Junio");
    months.set("07", "Julio");
    months.set("08", "Agosto");
    months.set("09", "Septiembre");
    months.set("10", "Octubre");
    months.set("11", "Noviembre");
    months.set("12", "Diciembre");

    return months.get(number);
}

const getEndPoint = txnId => {
    var target = new Map();
    target.set(transactions.trxGetImage, endpoinds.endPonintGetImage);
    target.set(transactions.trxGetDoc, endpoinds.endPointGetDoc);

    return target.get(txnId);
}

export {
    getModule,
    getTrxBackend,
    groupByYear,
    getKeys,
    getMonthNameByNumber,
    getEndPoint
}