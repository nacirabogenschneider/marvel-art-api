// @ts-nocheck
const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
let Heros = require("../models/heros.model");

router.get("/page/:page", authenticate, function (req, res) {
    let page = req.params.page;
    const pageSize= 100;
  Heros.find().skip( (page -1) * pageSize).limit(pageSize)
    .then((attribute) => res.json(attribute))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/count", authenticate, function (req, res) {
 Heros.countDocuments().then((attribute) => res.json(attribute))
 .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/search/:heroName", authenticate, function (req, res){
    let heroName= req.params.heroName;
    Heros.aggregate(
        [
            {
            $search: {
                index: 'default', 
                text: {
                    query: heroName, 
                    path: 'name'
                    }
                }
            },
            {
                $limit: 100
              },
            {
            $project: {
                id:1,
                name:1,
                description: 1,
                thumbnail: 1,
                urls:1,
            }
        }
    ],
    function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.json(result);
        }
      }
    );
})



router.get("/id", authenticate, function (req, res){
    
    Heros.aggregate(
        [   
      
            {
            $project: {
                id:1,
                description: 1,
            }
        }
    ],
    function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.json(result);
        }
      }
    );
})



router.get("/", authenticate, function (req, res) {
    Heros.find()
      .then((attribute) => res.json(attribute))
      .catch((err) => res.status(400).json("Error: " + err));
  });






router.post("/add", authenticate, function (req, res) {
    let id= req.body.id;
    let name= req.body.name;
    let description= req.body.description;
    let thumbnail= req.body.thumbnail;
    let resourceURI=req.body.resourceURI;
    let comics=req.body.comics;
    let series=req.body.series;
    let stories=req.body.stories;
    let events=req.body.events;
    let urls=req.body.urls;
 
  const newHero = new Heros({
    id,
    name,
    description,
    thumbnail,
    resourceURI,
    comics,
    series,
    stories,
    events,
    urls
  });
  newHero
    .save()
    .then(() => res.json("Hero added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/:heroId", authenticate, async (req, res) => {
    const id= req.params.heroId;
    Heros.remove({id:id}).exec().then(result=>{
        console.log(res)
        res.status(200).json(result)
    }).catch(err=>{
        console.log(err)
        res.status(500).json({error: err})
    });
  });

  router.get("/:heroId", authenticate, async (req, res) => {
    const id= req.params.heroId;
    Heros.find({id:id}).exec().then(result=>{
        console.log(res)
        res.status(200).json(result)
    }).catch(err=>{
        console.log(err)
        res.status(500).json({error: err})
    });
  });

module.exports = router;

