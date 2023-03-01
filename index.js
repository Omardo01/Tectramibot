
const dialogflow = require('@google-cloud/dialogflow');
const { send } = require('process');
const uuid = require('uuid');

console.log('Texto prueba');

async function runDialog(mensaje) {
  const sessionId = uuid.v4();
  console.log('Entro a la funcion')

const sessionClient = new dialogflow.SessionsClient({
  keyFilename: "botprueba.json"
});
  const sessionPath = sessionClient.projectAgentSessionPath(
    'botprueba-379204',
    sessionId
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: mensaje,
        languageCode: 'es-MX',
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  console.log(`${result.fulfillmentText}`)
  //send();
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log('  No intent matched.');
  }
}

runDialog('credencial');
