import LocalSource from "@/datasource/controllers/shop.controller";

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

async function getBasketFromLocalSource(data) {
    // rÃ©cupÃ©ration auprÃ¨s de la source locale
    return LocalSource.getBasket(data)
}

async function removeItemFromBasketFromLocalSource(data) {
    // rÃ©cupÃ©ration auprÃ¨s de la source locale
    return LocalSource.removeItemFromBasket(data)
}

async function createOrderFromLocalSource(data) {
    // rÃ©cupÃ©ration auprÃ¨s de la source locale
    return LocalSource.createOrder(data)
}

async function finalizeOrderFromLocalSource(orderId, transactionID, userId) {
    // rÃ©cupÃ©ration auprÃ¨s de la source locale
    return LocalSource.finalizeOrder(orderId, transactionID, userId)
}

async function getOrdersFromLocalSource(userId) {
    // rÃ©cupÃ©ration auprÃ¨s de la source locale
    return LocalSource.getOrders(userId)
}

async function cancelOrderFromLocalSource(orderId, userId) {
    // rÃ©cupÃ©ration auprÃ¨s de la source locale
    return LocalSource.cancelOrder(orderId, userId)
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

async function getBasket(data) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getBasketFromLocalSource(data)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de récupérer le panier'  }
    }
    return response
}

async function removeItemFromBasket(data) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await removeItemFromBasketFromLocalSource(data)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de mettre Ã  jour le panier'  }
    }
    return response
}

async function createOrder(data) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await createOrderFromLocalSource(data)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de passer la commande'  }
    }
    return response
}

async function finalizeOrder(orderId, transactionID, userId) {
    let response = null;
    try {
        response = await finalizeOrderFromLocalSource(orderId, transactionID, userId);
    } catch (err) {
        response = { error: 1, status: 404, data: 'Network error, unable to finalize order' };
    }
    return response;
}

async function getOrders(userId) {
    let response = null;
    try {
        response = await getOrdersFromLocalSource(userId);
    } catch (err) {
        response = { error: 1, status: 404, data: 'Network error, unable to get orders' };
    }
    return response;
}

async function cancelOrder(orderId, userId) {
    let response = null;
    try {
        response = await cancelOrderFromLocalSource(orderId, userId);
    } catch (err) {
        response = { error: 1, status: 404, data: 'Network error, unable to cancel order' };
    }
    return response;
}

export default {
    shopLogin,
    getAllViruses,
    updateBasket,
    getBasket,
    removeItemFromBasket,
    createOrder,
    finalizeOrder,
    getOrders,
    cancelOrder,
}