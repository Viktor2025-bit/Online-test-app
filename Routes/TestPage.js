const express = require("express")
const axios = require("axios")
const router = express.Router()

//Fetch test questions from an external Api

router.get("/test/:testId/questions", async (req, res) => {
    const { testId } = req.params
    try {
        //To make the request to the external api to fetch the questions
        const response = await axios.get('https://opentdb.com/api.php', { 
            params : {
                amount : 10,
                category : 9,
                type : 'multiple'
            }
        })
        res.status(200).json(response.data.results)
    } catch (error) {
        
        console.error("Error fetching test questions : ", error)
        res.status(500).json({ error : "Failed to fetch test questions" })
    }

})

module.exports = router