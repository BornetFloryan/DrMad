import {bankaccounts, items, shopusers} from '../data'
import { v4 as uuidv4 } from 'uuid'
const bcrypt = require('bcryptjs');

/* controllers: les fonctions ci-dessous doivent mimer ce que renvoie l'API en fonction des requêtes possibles.
  Dans certains cas, ces fonctions vont avoir des paramètres afin de filtrer les données qui se trouvent dans data.js
  Ces paramètres sont généralement les mêmes qu'ils faudrait envoyer à l'API, mais pas forcément.
  Exemple 1 : se loguer auprès de la boutique
 */

function shopLogin(data) {
  if ((!data.login) || (!data.password))
    return { error: 1, status: 404, data: 'Aucun login/pass fourni' }
  // pour simplifier : test uniquement le login
  let user = shopusers.find(e => e.login === data.login)
  if (!user)
    return { error: 1, status: 404, data: 'Login/pass incorrect' }
  // vérifier le mot de passe
  const isMatch = bcrypt.compareSync(data.password, user.password)
  if (!isMatch) {
    return { error: 1, status: 404, data: 'Mot de passe incorrect' }
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

function updateBasket(data) {
  if (!data.login) {
    return { error: 1, status: 404, data: 'Login non fourni' };
  }

  if (!data.item) {
    return { error: 1, status: 404, data: 'Article non fourni' };
  }

  if (!data.quantity) {
    return { error: 1, status: 404, data: 'Montant non fourni' };
  }

  let user = shopusers.find(e => e.login === data.login.login);
  if (!user) {
    return { error: 1, status: 404, data: 'Utilisateur non trouvé' };
  }

  let stock = items.find(e => e._id === data.item._id).stock;

  if (stock < data.quantity) {
    return { error: 1, status: 404, data: 'Pas assez de stock' };
  }

  return { error: 0, status: 200, data: data };
}

function getBasket(login) {
  if (!login) {
    return { error: 1, status: 404, data: 'Login non fourni' };
  }

  let user = shopusers.find(e => e.login === login);
  if (!user) {
    return { error: 1, status: 404, data: 'Utilisateur non trouvé' };
  }

  return { error: 0, status: 200, data: login };
}

function removeItemFromBasket(data) {
  if (!data.login) {
    return { error: 1, status: 404, data: 'Login non fourni' };
  }

  if (!data.item) {
    return { error: 1, status: 404, data: 'Article non fourni' };
  }

  let user = shopusers.find(e => e.login === data.login.login);
  if (!user) {
    return { error: 1, status: 404, data: 'Utilisateur non trouvé' };
  }

  let item = user.basket.items.find(e => e.item._id === data.item.item._id);
  if (!item) {
    return { error: 1, status: 404, data: 'Article non trouvé' };
  }

  return { error: 0, status: 200, data: data };
}

async function createOrder(data) {
  const user = shopusers.find(u => u._id === data.userId);
  if (!user) {
    return { error: 1, status: 404, data: 'Utilisateur non trouvé' };
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
    date: { $date: new Date().toISOString() },
    status: 'waiting_payment',
    total: data.items.reduce((total, item) => {
      const applicablePromotion = item.item.promotion
          .filter(promo => item.amount >= promo.amount)
          .sort((a, b) => b.amount - a.amount)[0];
      const discount = applicablePromotion ? applicablePromotion.discount : 0;
      return total + (item.item.price * item.amount) * (1 - discount / 100);
    }, 0),
    uuid: uuidv4(),
  };

  user.orders = user.orders || [];
  user.orders.push(order);

  return { error: 0, data: { uuid: order.uuid } };
}

async function finalizeOrder(orderId, transaction, userId) {
  if (!orderId || !transaction) {
    return { error: 1, status: 404, data: 'ID de commande ou ID de transaction non fourni' };
  }

  const user = shopusers.find(u => u._id === userId);
  if (!user) {
    return { error: 1, status: 404, data: 'Utilisateur non trouvé' };
  }

  const order = user.orders.find(o => o.uuid === orderId);
  if (!order) {
    return { error: 1, status: 404, data: 'Commande non trouvée' };
  }

  let transactionAmount = Number(transaction.amount);
  const orderTotal = Number(order.total);

  if(transactionAmount < 0){
    transactionAmount = -transactionAmount
  }

  if (transactionAmount !== orderTotal) {
    return { error: 1, status: 404, data: 'Le montant de la transaction ne correspond pas au total de la commande' };
  }

  const bankAccount = bankaccounts.find(u => u.number === 'FRSHOP4578901234567890-0000999');

  if (transaction.account !== bankAccount._id) {
    return { error: 1, status: 404, data: 'Le compte de transaction ne correspond pas au compte de la boutique' };
  }

  order.status = 'finalized';
  return { error: 0, data: 'Commande finalisée avec succès' };
}

function getOrders(userId) {
  const user = shopusers.find(u => u._id === userId);
  if (!user) {
    return { error: 1, status: 404, data: 'Utilisateur non trouvé' };
  }
  return { error: 0, data: user.orders || [] };
}

function cancelOrder(orderId, userId) {
  const user = shopusers.find(u => u._id === userId);
  if (!user) {
    return { error: 1, status: 404, data: 'Utilisateur non trouvé' };
  }
  const order = user.orders.find(o => o.uuid === orderId);
  if (!order) {
    return { error: 1, status: 404, data: 'Commande non trouvée' };
  }
  let status = 'cancelled';
  return { error: 0, data: {orderId, status} };
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