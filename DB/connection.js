const  mongoos = require('mongoose')
const connectionString = process.env.DB_Connection_String
mongoos.connect(connectionString).then(()=>{
    console.log("MongoDB atlas Connected with rEServer");
}).catch((err)=>{
    console.log("MongoDB atlas connection Failed!!",err);
})