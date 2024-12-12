import {bankaccounts, transactions} from "@/datasource/data";
import {v4 as uuidv4} from "uuid";

function getAccount(data){
    if (!data.number) return { error: 1, status: 404, data: 'aucun compte' }
    let account = bankaccounts.find(e => e.number === data.number)
    if (!account) return { error: 1, status: 404, data: 'compte incorrect' }
    return { error: 0, status: 200, data: account }
}

function createWithdrawal(data){
    if (!data.number) return { error: 1, status: 404, data: 'aucun compte' }
    let account = bankaccounts.find(e => e.number === data.number)
    if (!account) return { error: 1, status: 404, data: 'compte incorrect' }
    if (account.amount < data.amount) return { error: 1, status: 404, data: 'solde insuffisant' }

    const transaction = {
        _id: uuidv4(),
        amount: -data.amount,
        account: data.number,
        date: { $date: new Date().toISOString() },
        uuid: uuidv4()
    };

    transactions.push(transaction);

    let respData = {
        amount: data.amount,
        transaction: transaction,
    }

    return { error: 0, status: 200, data: respData }
}

function createPayment(data) {
    if (!data.number) return { error: 1, status: 404, data: 'aucun compte' }
    let account = bankaccounts.find(e => e.number === data.number)
    if (!account) return { error: 1, status: 404, data: 'compte incorrect' }
    if (account.amount < data.amount) return { error: 1, status: 404, data: 'solde insuffisant' }

    let recipientAccount = bankaccounts.find(e => e.number === data.recipient)
    if (!recipientAccount) return { error: 1, status: 404, data: 'compte destinataire incorrect' }

    const transaction = {
        _id: uuidv4(),
        amount: -data.amount,
        account: data.number,
        date: { $date: new Date().toISOString() },
        uuid: uuidv4()
    };

    const recipientTransaction = {
        _id: uuidv4(),
        amount: data.amount,
        account: data.recipient,
        date: { $date: new Date().toISOString() },
        uuid: uuidv4()
    };

    transactions.push(transaction);
    transactions.push(recipientTransaction);

    recipientAccount.amount += data.amount;

    let respData = {
        amount: data.amount,
        transaction: transaction,
    }

    return { error: 0, status: 200, data: respData }
}

function getAccountAmount(data) {
    if (!data.number) return { error: 1, status: 404, data: 'aucun compte' }

    let account = bankaccounts.find(e => e.number === data.number)

    if (!account) return { error: 1, status: 404, data: 'compte incorrect' }

    let amount = account.amount
    return { error: 0, status: 200, data: amount }
}

function getAccountTransactions(data) {
    if (!data.number) return { error: 1, status: 404, data: 'aucun compte' }
    let account = bankaccounts.find(e => e.number === data.number)
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
    createWithdrawal,
    createPayment,
    getAccountAmount,
    getAccountTransactions,
}