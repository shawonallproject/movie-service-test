require('dotenv').config()
var axios = require('axios');
var omdbApiKey = process.env.OMDBAPIKEY
var MovieModel = require("../models/Movie");

// Retrieve all movies by user.
exports.findByUser = async (req, res) => {
    var searchParam = {
        UserId:req.user.userId
    }
    var movieList = await MovieModel.find(searchParam);
    res.status(200).json({ success: true, data:movieList })
};


// Create movie by user.
exports.create =async (req, res) => {
    var user = req.user;
    var title = req.body.title;

    /**Check Movie Creation Access */
    var checkAccess = await checkUserAccess(user);

    if(checkAccess){

        /**Fetch Movie Details with title */
        var movieDetails =await getMovieFromOmdb(title);

        if((String(movieDetails.Response).toLowerCase() == "true")){

            /**Save movie object to DB */
            var save = await saveToDB(movieDetails,user.userId);

            if(save.success){
                res.status(200).json({ success: true, message:"Movie Created Successfully", data:save.data})
            }else{
                res.status(500).json({ success: false, message:save.message})
            }
            
        }else{
            res.status(200).json({ success: false, message:movieDetails.Error})
        }
    }else{
        res.status(200).json({ success: false, message:"Your movie creation limit is full for this month."})
    }
    
};

/**
 * User Access check function
 * @param {user all information} user 
 */
const checkUserAccess = async(user) => {
    return new Promise(async (resolve, reject) => {
        
        if(user.role=='basic'){
            const date = new Date();
            const dateFrom = new Date(date.getFullYear(), date.getMonth(), 1);
            const dateTo = new Date(date.getFullYear(), date.getMonth()+1, 1);

            var searchParam = {
                UserId:user.userId,
                createdAt:{
                    $gte: new Date(dateFrom),
                    $lt: new Date(dateTo)
                }
            }

            var count = await MovieModel.count(searchParam);
            console.log(count)
            if(count<5){
                resolve(true)
            }else{
                resolve(false)
            }
        }else{
            resolve(true)
        }     
    })
    .catch(error => {
        throw error
     });
}

/**
 * Movie Object Save Function
 * @param {fetched movie details} movieDetails 
 * @param {user id} userId 
 */
const saveToDB = async(movieDetails,userId) => {
    return new Promise(async (resolve, reject) => {
        let dataToSave = {
            Title:movieDetails.Title,
            Released: movieDetails.Released,
            Genre: movieDetails.Genre,
            Director: movieDetails.Director,
            UserId:userId
        }
        const savedData = await MovieModel.create(dataToSave);
        resolve({success:true, data:savedData })
    })
    .catch(error => {
        throw error
    });
}

/**
 * Fetch Movie Details With OMDB Api Function
 * @param {user sent movie title} title 
 */
const getMovieFromOmdb = async(title) => {
    return new Promise(async (resolve, reject) => {
        await axios({
            method: 'GET',
            url: 'http://www.omdbapi.com',
            params: {
                t: title,
                apikey:omdbApiKey
              }
            })
            .then(function (response) {
                resolve(response.data);       
            })
            .catch(function (error) {
                    reject(error)
            });
    })
    .catch(error => {
        throw error
     });
  
}