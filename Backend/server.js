require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config()
const app = require("./src/app");
const port = process.env.PORT || 4000;
const connectToDB = require("./src/config/database");

connectToDB();

app.listen(port,()=>{
    console.log(`Server is successfully running on port ${port} `)
})