const {Router} = require("express")
const router = Router()



router.get('/', (req, res) => {
    res.json("This actually works")
})


module.exports = router