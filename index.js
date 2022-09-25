
const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());


app.post('/getmeip',(req,res)=>{
 
 
    const dns = require("dns");
    

     fs.readFile('./products.json',{encoding : 'utf-8'},(err,data)=>{
if(err){
    return res.send("error");
}
   let obj = req.body
         let data2 = JSON.parse(data);
         let x = {...data2,...obj}
         let url = obj.website_name;

            fs.writeFile('web.json',JSON.stringify(x),{encoding :"utf-8"},()=>{
           
                dns.resolve4(url, { ttl: true }, (err, addresses) => {
                    if (err) {
                        console.err(err);
                        return;
                      }
                      res.send(addresses[0].address);
                    });
          })


     })
       
    })




app.listen(8091,()=>{
    console.log("start server");
})