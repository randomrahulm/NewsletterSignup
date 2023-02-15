const express = require("express");
const bodyParser = require("body-parser");

const http = require("https");
const { dirname } = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})
app.post("/", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailAdd = req.body.mail;
    const password = req.body.password;
    const data = {
        members: [
            {
                email_address: emailAdd,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us12.api.mailchimp.com/3.0/lists/598d11d30d"
    const options = {
        method: "post",
        auth: "rahul:4f2e1d3141a727dad92808b5477f381f-us12"
    }
    const request = http.request(url, options, (response) => {

        if (response.statusCode==200){
            res.sendFile(__dirname+"/sucess.html");
        }
        else{
            res.sendFile(__dirname+'/failure.html');
        }
        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })

    });
    request.write(jsonData);
    request.end()
})





app.listen(process.env.PORT || 3000, (req, res) => {
    console.log("listening to 3000");
});