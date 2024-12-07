import LocalSource from "@/datasource/controller";

async function shopLoginFromLocalSource(data) {
    // rÃ©cupÃ©ration auprÃ¨s de la source locale
    return LocalSource.shopLogin(data)
}
/*
async function shopLoginFromAPI(data) {
  // a Ã©crire quand l'API est fonctionnelle
  return {}
}
 */

async function getAllVirusesFromLocalSource() {
    // rÃ©cupÃ©ration auprÃ¨s de la source locale
    return LocalSource.getAllViruses()
}

async function updateBasketFromLocalSource(data) {
    // rÃ©cupÃ©ration auprÃ¨s de la source locale
    return LocalSource.updateBasket(data)
}

async function getBasketFromLocalSource() {
    // rÃ©cupÃ©ration auprÃ¨s de la source locale
    return LocalSource.getBasket()
}

/*
async function getAllVirusesFromAPI() {
  // a Ã©crire quand l'API est fonctionnelle
  return {}
}
*/

async function shopLogin(data) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await shopLoginFromLocalSource(data)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de se loguer'  }
    }
    return response
}


async function getAllViruses() {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getAllVirusesFromLocalSource()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des viruses'  }
    }
    return response
}

async function updateBasket(data) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await updateBasketFromLocalSource(data)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de mettre Ã  jour le panier'  }
    }
    return response
}

async function getBasket() {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getBasketFromLocalSource()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer le panier'  }
    }
    return response
}

export default {
    shopLogin,
    getAllViruses,
    updateBasket,
    getBasket,
}