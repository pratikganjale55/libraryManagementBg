const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    return res.status(201).send({message : "Home page"}) ;
})
module.exports = router;