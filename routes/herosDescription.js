// @ts-nocheck
const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
let HerosDescription = require("../models/herosDescription.model");

router.get("/", authenticate, function (req, res) {
    HerosDescription.find()
    .then((attribute) => res.json(attribute))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", authenticate, function (req, res) {
    let id= req.body.id;
    let language= req.body.language;
    let description= req.body.description;
  const newHerosDescription = new HerosDescription({
    id,
    description,
    language
  });
  newHerosDescription
    .save()
    .then(() => res.json("Hero Description added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/:heroId", authenticate, async (req, res) => {
    const id= req.params.heroId;
    HerosDescription.remove({id:id}).exec().then(result=>{
        console.log(res)
        res.status(200).json(result)
    }).catch(err=>{
        console.log(err)
        res.status(500).json({error: err})
    });
  });
  router.get("/:heroId", authenticate, async (req, res) => {
    const id= req.params.heroId;
    HerosDescription.find({id:id}).exec().then(result=>{
        console.log(res)
        res.status(200).json(result)
    }).catch(err=>{
        console.log(err)
        res.status(500).json({error: err})
    });
  });

  
  router.patch("/:heroId", authenticate, async (req, res) => {
    const id= req.params.heroId;
    const description = req.body.description;
    HerosDescription.updateOne({id:id}, {description: description}).then(result=>{
        console.log(res)
        res.status(200).json(result)
    }).catch(err=>{
        console.log(err)
        res.status(500).json({error: err})
    });
});
module.exports = router;
