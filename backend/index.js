const express = require("express");
const cors = require("cors");
require("./db/config");
require('dotenv').config();
const User = require("./db/User");
const Product = require("./db/Product");

const jwt = require("jsonwebtoken");
const jwtkey = "e-comm";

const app = express();
const port = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());

// post api for register in this page p

app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;

  jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      resp.send({
        result: "Something went wrong,Please try after sometime",
      });
    }
    resp.send({ result, auth: token });
  });
  
}); 

// post api for login page

app.post("/login", async (req, resp) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send({
            result: "Something went wrong,Please try after sometime",
          });
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send({ result: "No user found" });
    }
  } else {
    resp.send({ result: "No user found" });
  }
});

// post api for add product

app.post("/add-product", verifyToken ,async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

// get api for finding all product

app.get("/product", verifyToken, async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "not found" });
  }
});

// delete api for deleting product

app.delete("/product/:id", verifyToken, async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

// get api for finding one product

app.get("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No Record Found" });
  }
});

// put api for finding product

app.put("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  resp.send(result);
});

// get api for searching product

app.get("/search/:key", verifyToken, async (req, resp) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});

// middeleware

function verifyToken(req, resp, next){
  let token = req.headers['authorization'];
  if(token){
    token = token.split(' ')[1];
    jwt.verify(token, jwtkey, (err, valid)=>{
      if(err){
        resp.status(401).send({ result:"Please provide token"});
      }else{
        next();
      }
    });

  }else{
    resp.status(403).send({ result:"Please add token with header"})
  }

}

app.listen(9000);
