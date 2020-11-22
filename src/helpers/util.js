
const getTabBySign = sing => {
    const tabs = new Map();
    tabs.set('3ff80014eeec26e5e11a942bd96e375d13c48ec0', 1);
    tabs.set('835591af450b9423224678b6d9ff06f5c889f8d6', 2);
    tabs.set('2f8c9f0dd742c22c091134b4a675c67d5fdb9c75', 3);
    return tabs.get(sing);
}

const getModule = () => {
    const search = window.location.search.substring(1);
    const params = new URLSearchParams(search);
    //const param = params.get('module');
    const param = getTabBySign(params.get('module'));
    return (param && !isNaN(param) && param > 0 && param <= 3) ? parseInt(param) : 1; 
}

export {
    getModule
}