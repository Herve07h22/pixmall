# PixMall

An 2D immersive game in a mall to turn shopping into a fun experience

## Getting started

Create 2 files :

- `frontend/.env.local`
- `server/.env`

with the setting : `PIXMALL_HOST=<IP adress of your server>`

Start the Yjs websocket server : `cd server && yarn start`

Start the mall server : `cd server && node index.js`

Start the frontend : `cd frontend && yarn dev`
