Backend - This service integrates with Trello’s REST API, exposes custom endpoints for lists/cards and receives webhooks from Trello to broadcast 
real-time updates to the frontend using Socket.IO.

Environment & Setup Guide -
This backend service integrates with the Trello REST API and requires a set of environment variables to authenticate requests and configure the webhook callback.
For security reasons, the actual .env file is not included in the repository and is replaced with a .env file containing placeholder values.

Real-Time Updates - Trello → Webhook → Backend → Socket.IO → Frontend

To run the backend -
1. Update the .env file with your own credentials for trello and ngrok
2. Where to find these?
   a)Get Your Trello API Key & Token
      Step 1 — Get API Key -> Log in to Trello -> Visit- https://trello.com/app-key -> Copy the Developer API Key -> Paste in .env
      Step 2 — Generate Token -> On the same page, click: "Token" -> Follow prompts → Allow access → Copy the generated token -> Paste in .env
   b)Board ID - https://trello.com/b/{BOARD_ID}/board-name -> Copy Board id and Paste in .env
   c)Webhook URL - Generated via ngrok -> Copy the url and paste in .env
4. Run backend locally -
   a)Install dependencies - npm install
   b)Start node server - node server.js - Backend starts at localhost:5001
   c)Start ngrok - ngrok http 5001


Frontend - The frontend communicates with the backend to manage lists, cards, and provides real-time updates on all Trello events.
A Trello-like UI built using - 
1. React
2. Axios(For API communication)
3. Socket.IO(For real-time updates)
4. @hello-pangea/dnd(For drag and drop support). 
5. CRUD Operations - Create List, Delete List, Create Card, Edit Card, Delete Card, Move Card

To run frontend - 
1. Install dependencies - npm install
2. Start development server - npm run dev




