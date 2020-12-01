const IntentRetriever = require('./IntentRetriever')

const utterance = "I want two large pepperoni pizzas on thin crust please"
const intent = new IntentRetriever(utterance)

intent.getIntent()
  .then(res => console.log(res))
  .catch((err)=>console.log(err))

// console.log(intent.getIntent());