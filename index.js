const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use("/auth", require("./routes/auth.Routes"));
app.use("/posts", require("./routes/posts.Routes"));
app.use("/gym", require("./routes/gymCreation.Routes"));


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
