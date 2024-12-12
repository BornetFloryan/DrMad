import LocalSource from "@/datasource/controllers/bank.controller";

async function getAccountFromLocalSource(data) {
    return LocalSource.getAccount(data);
}

async function getTransactionsFromLocalSource(data) {
    return LocalSource.getTransactions(data);
}

async function createWithdrawalFromLocalSource(data) {
    return LocalSource.createWithdrawal(data);
}

async function createPaymentFromLocalSource(data) {
    return LocalSource.createPayment(data);
}

async function getAccountAmountFromLocalSource(number) {
    return LocalSource.getAccountAmount(number);
}

async function getAccountTransactionFromLocalSource(account) {
    return LocalSource.getAccountTransaction(account);
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

async function getTransactions(data) {
    let response = null;
    try {
        response = await getTransactionsFromLocalSource(data);
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

async function getAccountTransaction(account) {
    let response = null;
    try {
        response = await getAccountTransactionFromLocalSource(account);
    } catch (err) {
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des viruses' };
    }
    return response;
}

export default {
    getAccount,
    getTransactions,
    createWithdrawal,
    createPayment,
    getAccountAmount,
    getAccountTransaction
};