
const dialogflow = require('@google-cloud/dialogflow');
const { send } = require('process');
const uuid = require('uuid');

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
console.log('Texto prueba');

async function runSample(mensaje) {
  // A unique identifier for the given session
  const sessionId = uuid.v4();
  console.log('Entro a la funcion')

  // Create a new session
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: "botprueba.json"
});
  const sessionPath = sessionClient.projectAgentSessionPath(
    'botprueba-379204',
    sessionId
  );

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: mensaje,
        languageCode: 'es-MX',
      },
    },
  };

  // Send request and log result
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

runSample('credencial');
