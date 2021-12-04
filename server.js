const app= require("./index");
const connect=require("../src/configs/db");
app.listen(4545,async function (){
    await connect();
    console.log("listening on port 4545")
})