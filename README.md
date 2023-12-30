## Cloud Function that Picks the Winning Ticket

## SETUP

This function is triggered by a punsub message sent by a cron job
whose responsibility is to realize when a Raffle is ripe for drawing.

Drawing occurs when either, the deadline is reached or the last ticket is sold.

A message is Published to the pubsub topic created, and the function runs.

# Ensure you have created the pub sub topic
