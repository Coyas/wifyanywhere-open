const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const keys = require('./keys.json')
const User = require('../models/User')
const bcrypt = require('bcrypt')


passport.use(new LocalStrategy(
    // {
    //     usernameField: 'email'
    //     passwordField: 'password' 
    // },
    function(username, password, done) {
        console.log('local estrategy');
        console.log('local strategy username: '+username);
        console.log('local strategy username: '+password);
        // return done(null, false);
        console.log('encima do user.findone');
        User.findOne({
            where: {
                email: username,
            }
        }).then( user => {
            if (!user) {
                return done(null, false, { message: 'Este email parece nao existir.' });
            }
            console.log('if.bcrypt  do user.findone');
            if (!bcrypt.compareSync(password, user.password)) {
                console.log('erro ao compara o password com bcrypt')
                return done(null, false, { message: 'Incorrect password.' });
            }
        
            return done(null, user);
        }).catch( err => {
            console.log('dentro do callback do user.findone');
            return done(err);
        })
    }
))


    


passport.serializeUser((user, done) => {
    console.log('serialize user: '+user)
    done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
    User.findByPk(id).then( user => {
        console.log('deserialize user: '+user)
        done(null, user)
    }).catch( err => {
        console.log('erro no deserialize user: '+err)
    })
})