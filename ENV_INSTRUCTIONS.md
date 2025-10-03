# Frontend Environment Setup

Create the following files at the frontend root (same folder as package.json):

## .env (used by `npm start`)
```
REACT_APP_API_BASE=http://localhost:8081/api
```

## .env.production (used by `npm run build`)
```
REACT_APP_API_BASE=https://api.yourdomain.com/api
```

After adding or changing these files, restart the React dev server.
