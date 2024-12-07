import { items, shopusers, bankaccounts, transactions } from './data'
import {v4 as uuidv4} from 'uuid'
const bcrypt = require('bcryptjs');
/* controllers: les fonctions ci-dessous doivent mimer ce que renvoie l'API en fonction des requêtes possibles.

  Dans certains cas, ces fonctions vont avoir des paramètres afin de filtrer les données qui se trouvent dans data.js
  Ces paramètres sont généralement les mêmes qu'ils faudrait envoyer à l'API, mais pas forcément.

  Exemple 1 : se loguer auprès de la boutique
 */


function shopLogin(data) {
  if ((!data.login) || (!data.password))
    return {error: 1, status: 404, data: 'aucun login/pass fourni'}
  // pour simplifier : test uniquement le login
  let user = shopusers.find(e => e.login === data.login)
  if (!user)
    return {error: 1, status: 404, data: 'login/pass incorrect'}
  // vérifier le mot de passe
  const isMatch = bcrypt.compareSync(data.password, user.password)
  if (!isMatch) {
    return {error: 1, status: 404, data: 'password incorrect'}
  }

  // générer un uuid de session pour l'utilisateur si non existant
  if (!user.session) {
    user.session = uuidv4()
  }
  // retourne uniquement les champs nécessaires
  let u = {
    _id: user._id,
    name: user.name,
    login: user.login,
    email: user.email,
    session: user.session
  }
  return {error: 0, status: 200, data: u}
}

function getAllViruses() {
  return {error: 0, data: items}
}

function getAccountAmount(number){
  if (!number) return {error: 1, status: 404, data: 'aucun compte'}

  let account = bankaccounts.find(e => e.number === number.number)

  if (!account) return {error: 1, status: 404, data: 'compte incorrect'}

  let amount = account.amount
  return {error: 0, status: 200, data: amount}
}

function getAccountTransaction(number){
  if (!number) return {error: 1, status: 404, data: 'aucun compte'}
  let account = bankaccounts.find(e => e.number === number.number)
  console.log(account._id)
  if (!account) return {error: 1, status: 404, data: "compte incorrect"}
  let accountTransactions = transactions.filter(e => e.account === account._id)

  let transactionsData = accountTransactions.map(transaction => {
    return {
      account: transaction.account,
      amount: transaction.amount,
      date: transaction.date,
      uuid: transaction.uuid
    }
  });
  console.log(transactionsData)
  return {error: 0, status: 200, data: transactionsData}
}

function updateBasket(data) {
  if (!data.login || !data.item) {
    return { error: 1, status: 404, data: 'login or item not provided' };
  }

  if(!data.quantity){
    return { error: 1, status: 404, data: 'amount not provided' };
  }

  let user = shopusers.find(e => e.login === data.login.login);
  if (!user) {
    return { error: 1, status: 404, data: 'user not found' };
  }

  let stock = items.find(e => e._id === data.item._id).stock;

  if(stock < data.quantity){
    return { error: 1, status: 404, data: 'not enough stock' };
  }

  return { error: 0, status: 200, data: data };
}

function getBasket(login) {
  if (!login) {
    return { error: 1, status: 404, data: 'login not provided' };
  }

  let user = shopusers.find(e => e.login === login);
  if (!user) {
    return { error: 1, status: 404, data: 'user not found' };
  }

  return { error: 0, status: 200, data: user.basket };
}

export default{
  shopLogin,
  getAllViruses,
  getAccountAmount,
  getAccountTransaction,
  updateBasket,
  getBasket,
}