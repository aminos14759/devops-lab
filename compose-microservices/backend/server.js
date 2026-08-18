const express = require("express");
const { Pool }=  require("pg");
const pool = new Pool({
 host : process.env.DB_HOST,
 port: process.env.DB_PORT,
user: process.env.DB_USER,
password : process.env.DB_PASSWORD,
database:process.env.DB_NAME});
const app = express();
const PORT = 3000;
app.get("/",(req,res) => {
res.json({
message : "hello from devops api !"});
});
app.get("/health",(req,res) => {
res.json({
status: "UP"});
});
if(require.main === module){
app.listen(PORT,() => {
console.log(`Api running on port ${PORT}`);
});}
module.exports = app;
app.get("/db",async(req,res) =>{
try{
const result = await pool.query("select now ()");
res.json({
database:"connected",
time: result.rows[0].now});
} catch (error){
console.error(error);
res.status(500).json({
database : "error"});
}
});
