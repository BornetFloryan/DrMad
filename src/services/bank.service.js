import LocalSource from "@/datasource/controllers/bank.controller";

async function getAccountFromLocalSource(data) {
    return LocalSource.getAccount(data);
}

async function createWithdrawalFromLocalSource(data) {
    return LocalSource.createWithdrawal(data);
}

async function createPaymentFromLocalSource(data) {
    return LocalSource.createPayment(data);
}

async function getAccountAmountFromLocalSource(data) {
    return LocalSource.getAccountAmount(data);
}

async function getAccountTransactionsFromLocalSource(account) {
    return LocalSource.getAccountTransactions(account);
}

async function getAccount(data) {
    let response = null;
    try {
        response = await getAccountFromLocalSource(data);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des viruses' };
    }
    return response;
}

async function createWithdrawal(data) {
    let response = null;
    try {
        response = await createWithdrawalFromLocalSource(data);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des viruses' };
    }
    return response;
}

async function createPayment(data) {
    let response = null;
    try {
        response = await createPaymentFromLocalSource(data);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des viruses' };
    }
    return response;
}

async function getAccountAmount(number) {
    let response = null;
    try {
        response = await getAccountAmountFromLocalSource(number);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des viruses' };
    }
    return response;
}

async function getAccountTransactions(account) {
    let response = null;
    try {
        response = await getAccountTransactionsFromLocalSource(account);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des viruses' };
    }
    return response;
}

export default {
    getAccount,
    createWithdrawal,
    createPayment,
    getAccountAmount,
    getAccountTransactions,
};