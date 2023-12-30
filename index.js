const functions = require('@google-cloud/functions-framework');
const admin = require('firebase-admin');
admin.initializeApp();

functions.cloudEvent('helloPubSub', async cloudEvent => {
  const base64name = cloudEvent.data.message.data;

  const message = JSON.parse(Buffer.from(base64name, 'base64').toString());

  const gameId = message.game_to_process;
  const winningTicketIndex = message.random_int;

  const gameRef = admin.firestore().collection('games').doc(gameId);
  const ticketsRef = gameRef.collection('tickets');
  const ticketsSnapshot = await ticketsRef.get();

  const ticketIds = [];
  ticketsSnapshot.forEach((ticketDoc) => {
    ticketIds.push(ticketDoc.id);
  });


  const winningTicketId = ticketIds[winningTicketIndex];

  await gameRef.update({
    winning_ticket_id: winningTicketId,
    status: 'ended',
    drawn: true
  });

  const winningTicketRef = ticketsRef.doc(winningTicketId);

  // Update the winning ticket document to mark it as the winner.
  await winningTicketRef.update({
    won: true,
  });

});