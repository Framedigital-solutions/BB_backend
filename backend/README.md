MongoDB Atlas setup and wiring for this backend

This backend already uses `process.env.MONGO_URI` to connect via Mongoose (see `index.js`). Follow these steps to connect to MongoDB Atlas safely.

1) Create an Atlas cluster
   - Sign in to https://www.mongodb.com/cloud/atlas and create a free cluster.
   - Create a database user (note username and password).
   - In Network Access, add an IP whitelist entry. For development you can allow 0.0.0.0/0 but restrict in production.

2) Get the connection string
   - In Atlas, click "Connect" → "Connect your application" and copy the connection string.
   - Replace `<username>`, `<password>`, and `<dbname>` in the string.

3) Local development options
   Option A: Use a local `.env` file (recommended for dev)
     - Create a file at `backend/.env` (this file should NOT be committed).
     - Paste the variables (example in `.env.example`):

       MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
       JWT_SECRET=your_jwt_secret_here
       FRONTEND_ORIGIN=http://localhost:3000
       PORT=4000

     - The project already calls `require('dotenv').config()` in `index.js`, so `.env` will be loaded automatically.

   Option B: Export environment variables in PowerShell for the current session
     - Open PowerShell in `backend` and run:

```powershell
$env:MONGO_URI = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority'
$env:JWT_SECRET = 'your_jwt_secret_here'
$env:FRONTEND_ORIGIN = 'http://localhost:3000'
# Then start dev server
npm run dev
```

   Option C: Persist env vars (Windows - setx)
     - Use `setx MONGO_URI "your_uri"` to set permanently. Restart the shell afterwards.

4) Security notes
   - Never commit your real `.env` or Atlas credentials to git. Add `backend/.env` to `.gitignore` if not already ignored.
   - Use least-privilege DB users and rotate credentials periodically.

5) Troubleshooting
   - If connection fails, check Atlas Network Access and DB user credentials.
   - Check `index.js` console output. Mongoose logs success or the error object.

If you'd like, I can:
 - create `backend/.env` locally with placeholders (I won't put real secrets),
 - add `backend/.gitignore` to ensure `.env` is ignored,
 - update `index.js` to print whether it's using Atlas or local based on the URI.

Tell me which of the above extras you'd like me to implement next.
