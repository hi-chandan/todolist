import { app } from "./index.js";

app.listen(process.env.port, (req, res) => {
  console.log("Server is working properly");
});
