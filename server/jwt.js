const jwt = require('jsonwebtoken');
//GET TO MY API
app.get('/mon', (req, res) => {
    res.json({
        message : "Welcome To Mon"
    })
})
//THE COOL USER LOGIN TO MY API
app.post('/mon/login', (req, res) => {
    //Cool User 
    const user = {
        id : 1,
        username : 'hrimla',
        email : 'abdelmounaim@gmail.com'
    }
    jwt.sign({user}, 'mySecretKey', {expiresIn : '30s'}, (error, token) => {
        res.json({
            token
        });
    });
})
//FORMAT OF TOKEN
// Authorization : Bearer <access_token>
//Verify Token
function verifyToken(req, res, next){
    //Get auth header Value
    const  bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined
    if(typeof bearerHeader != 'undefined'){
        //Split at the space
        const bearer = bearerHeader.split(':');
        //Get Token From Array
        const bearerToken = bearer[1];
        //Set The Token
        req.token = bearerToken;
        // Next Middleware
        next();
    } else {
        //Forbidden
        res.sendStatus(403);
    }
}
//POST A COMMENT TO MY API
app.post('/mon/comment', verifyToken, (req, res) => {
    jwt.verify(req.token, 'mySecretKey', (error, authData) => {
        if(error) {
            res.sendStatus(403);
        } else {
            res.json({
                message : "Comment Created",
                authData
            });
        }
    });  
});
module.exports = jwt;