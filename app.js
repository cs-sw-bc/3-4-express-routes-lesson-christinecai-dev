import express from "express";


const app = express();
const PORT = 3000;

/* ---------------------------------------------
   SERVER LISTEN
---------------------------------------------- */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});