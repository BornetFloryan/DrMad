import {bankaccounts, transactions} from "@/datasource/data";

function getAccount(data){
    if (!data) return { error: 1, status: 404, data: 'aucun compte' }
    let account = bankaccounts.find(e => e.number === data.number)
    if (!account) return { error: 1, status: 404, data: 'compte incorrect' }
    return { error: 0, status: 200, data: account }
}

function getTransactions(data){
    if (!data) return { error: 1, status: 404, data: 'aucun compte' }
    let account = bankaccounts.find(e => e.number === data.number)
    if (!account) return { error: 1, status: 404, data: 'compte incorrect' }
    let accountTransactions = transactions.filter(e => e.account === account._id)
    return { error: 0, status: 200, data: accountTransactions }
}

function createWithdrawal(data){
    if (!data) return { error: 1, status: 404, data: 'aucun compte' }
    let account = bankaccounts.find(e => e.number === data.number)
    if (!account) return { error: 1, status: 404, data: 'compte incorrect' }
    if (account.amount < data.amount) return { error: 1, status: 404, data: 'solde insuffisant' }
    account.amount -= data.amount
    return { error: 0, status: 200, data: account.amount }
}

function createPayment(data){
    if (!data) return { error: 1, status: 404, data: 'aucun compte' }
    let account = bankaccounts.find(e => e.number === data.number)
    if (!account) return { error: 1, status: 404, data: 'compte incorrect' }
    account.amount += data.amount
    return { error: 0, status: 200, data: account.amount }
}

function getAccountAmount(number) {
    if (!number) return { error: 1, status: 404, data: 'aucun compte' }

    let account = bankaccounts.find(e => e.number === number.number)

    if (!account) return { error: 1, status: 404, data: 'compte incorrect' }

    let amount = account.amount
    return { error: 0, status: 200, data: amount }
}

function getAccountTransaction(number) {
    if (!number) return { error: 1, status: 404, data: 'aucun compte' }
    let account = bankaccounts.find(e => e.number === number.number)
    if (!account) return { error: 1, status: 404, data: "compte incorrect" }
    let accountTransactions = transactions.filter(e => e.account === account._id)

    let transactionsData = accountTransactions.map(transaction => {
        return {
            account: transaction.account,
            amount: transaction.amount,
            date: transaction.date,
            uuid: transaction.uuid
        }
    });

    return { error: 0, status: 200, data: transactionsData }
}

export default {
    getAccount,
    getTransactions,
    createWithdrawal,
    createPayment,
    getAccountAmount,
    getAccountTransaction,
}