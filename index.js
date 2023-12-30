import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

const randomURL = "https://api.openbrewerydb.org/v1/breweries/random";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req, res)=>{
    res.render("index.ejs");
})

app.post("/get-random", async(req, res)=>{
    try{
        const result = await axios.get(randomURL)
        res.render("index.ejs",{
            name: result.data[0].name,
            city: result.data[0].city,
            country: result.data[0].country,
            state: result.data[0].state,
            postalCode: result.data[0].postal_code,
            web: result.data[0].website_url
        })
    }catch(error){
        res.render("index.ejs",{
            name: JSON.stringify(error.response.data),
            city: JSON.stringify(error.response.data),
            country: JSON.stringify(error.response.data),
            state: JSON.stringify(error.response.data),
            postalCode: JSON.stringify(error.response.data),
            web: JSON.stringify(error.response.data)
        })
    }
})

app.post("/get-by-state", async(req, res)=>{
    var state = req.body.state;
    state = state.toLowerCase().split(' ').join('_')
    try{
        const result = await axios.get(`https://api.openbrewerydb.org/v1/breweries?by_state=${state}`)
        const rng = Math.floor(Math.random() * result.data.length)
        const resultWithIndex = result.data[rng]
        res.render("index.ejs", {
            name: resultWithIndex.name,
            city: resultWithIndex.city,
            country: resultWithIndex.country,
            state: resultWithIndex.state,
            postalCode: resultWithIndex.postal_code,
            web: resultWithIndex.website_url
        })
    }catch(error){
        res.render("index.ejs",{
            name: JSON.stringify(error.response.data),
            city: JSON.stringify(error.response.data),
            country: JSON.stringify(error.response.data),
            state: JSON.stringify(error.response.data),
            postalCode: JSON.stringify(error.response.data),
            web: JSON.stringify(error.response.data)
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})