require("dotenv").config();
const app = require("./src/app");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
// app.use(cors());

app.listen(PORT, () => {
  console.log(`Email service running on port ${PORT}`);
});
