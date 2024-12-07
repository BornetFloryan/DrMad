import { items, shopusers, bankaccounts, transactions } from './data'
import { v4 as uuidv4 } from 'uuid'
const bcrypt = require('bcryptjs');

/* controllers: les fonctions ci-dessous doivent mimer ce que renvoie l'API en fonction des requêtes possibles.
  Dans certains cas, ces fonctions vont avoir des paramètres afin de filtrer les données qui se trouvent dans data.js
  Ces paramètres sont généralement les mêmes qu'ils faudrait envoyer à l'API, mais pas forcément.
  Exemple 1 : se loguer auprès de la boutique
 */

function shopLogin(data) {
  if ((!data.login) || (!data.password))
    return { error: 1, status: 404, data: 'aucun login/pass fourni' }
  // pour simplifier : test uniquement le login
  let user = shopusers.find(e => e.login === data.login)
  if (!user)
    return { error: 1, status: 404, data: 'login/pass incorrect' }
  // vérifier le mot de passe
  const isMatch = bcrypt.compareSync(data.password, user.password)
  if (!isMatch) {
    return { error: 1, status: 404, data: 'password incorrect' }
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
  return { error: 0, status: 200, data: u }
}

function getAllViruses() {
  return { error: 0, data: items }
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

function updateBasket(data) {
  if (!data.login) {
    return { error: 1, status: 404, data: 'login not provided' };
  }

  if (!data.item) {
    return { error: 1, status: 404, data: 'item not provided' };
  }

  if (!data.quantity) {
    return { error: 1, status: 404, data: 'amount not provided' };
  }

  let user = shopusers.find(e => e.login === data.login.login);
  if (!user) {
    return { error: 1, status: 404, data: 'user not found' };
  }

  let stock = items.find(e => e._id === data.item._id).stock;

  if (stock < data.quantity) {
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

  return { error: 0, status: 200, data: login };
}

function removeItemFromBasket(data) {
  if (!data.login) {
    return { error: 1, status: 404, data: 'login not provided' };
  }

  if (!data.item) {
    return { error: 1, status: 404, data: 'item not provided' };
  }

  let user = shopusers.find(e => e.login === data.login.login);
  if (!user) {
    return { error: 1, status: 404, data: 'user not found' };
  }

  let item = user.basket.items.find(e => e.item._id === data.item.item._id);
  if (!item) {
    return { error: 1, status: 404, data: 'item not found' };
  }

  return { error: 0, status: 200, data: data };
}

async function createOrder(data) {
  const user = shopusers.find(u => u._id === data.userId);
  if (!user) {
    return { error: 1, status: 404, data: 'User not found' };
  }

  const order = {
    items: data.items.map(item => ({
      item: {
        name: item.item.name,
        description: item.item.description,
        price: item.item.price,
        promotion: item.item.promotion,
        object: item.item.object,
      },
      amount: item.amount,
    })),
    date: new Date(),
    total: data.items.reduce((total, item) => {
      const discount = item.item.promotion.reduce((acc, promo) => acc + promo.discount, 0);
      return total + (item.item.price - discount) * item.amount;
    }, 0),
    status: 'waiting_payment',
    uuid: uuidv4(),
  };

  user.orders = user.orders || [];
  user.orders.push(order);

  return { error: 0, data: { uuid: order.uuid } };
}

async function finalizeOrder(orderId, userId) {
  const user = shopusers.find(u => u._id === userId);
  if (!user) {
    return { error: 1, status: 404, data: 'User not found' };
  }

  const order = user.orders.find(o => o.uuid === orderId);
  if (!order) {
    return { error: 1, status: 404, data: 'Order not found' };
  }

  order.status = 'finalized';
  return { error: 0, data: 'Order finalized successfully' };
}

function getOrders(userId) {
  const user = shopusers.find(u => u._id === userId);
  if (!user) {
    return { error: 1, status: 404, data: 'User not found' };
  }
  return { error: 0, data: user.orders || [] };
}

function cancelOrder(orderId, userId) {
  const user = shopusers.find(u => u._id === userId);
  if (!user) {
    return { error: 1, status: 404, data: 'User not found' };
  }
  const order = user.orders.find(o => o.uuid === orderId);
  if (!order) {
    return { error: 1, status: 404, data: 'Order not found' };
  }
  let status = 'cancelled';
  return { error: 0, data: {orderId, status} };
}


export default {
  shopLogin,
  getAllViruses,
  getAccountAmount,
  getAccountTransaction,
  updateBasket,
  getBasket,
  removeItemFromBasket,
  createOrder,
  finalizeOrder,
  getOrders,
  cancelOrder,
}