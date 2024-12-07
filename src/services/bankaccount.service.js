import LocalSource from "@/datasource/controller";

async function getAccountAmountFromLocalSource(number){
    return LocalSource.getAccountAmount(number)
}

async function getAccountTransactionFromLocalSource(account){
    return LocalSource.getAccountTransaction(account)
}

async function getAccountAmount(number){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getAccountAmountFromLocalSource(number)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des viruses'  }
    }
    return response
}

async function getAccountTransaction(account){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getAccountTransactionFromLocalSource(account)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des viruses'  }
    }
    return response
}

export default {
    getAccountAmount,
    getAccountTransaction,
}