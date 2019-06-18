const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('./keys.json')
const bcrypt = require('bcrypt')

// importar models
const User = require('../models/User')
const Guser = require('../models/google')

/************Estrategia de login por facebook**********/

/*************Estrategia de login por google **********/
console.log(`google ci: ${keys.google.client_id}`)
console.log(`google cs: ${keys.google.client_secret}`)
console.log(`google redirect_uris: ${keys.google.redirect_uris}`)
passport.use(
    new GoogleStrategy({
        // opcao para google strategy
        callbackURL: '/auth/google/redirect',
        // callbackURL: keys.google.redirect_uris,
        clientID: keys.google.client_id,
        clientSecret: keys.google.client_secret
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback (redirect do google)
        console.log(profile)

        //ver se o utilizador ja existe no banco de dados
        console.log('googleUser: '+profile.id)
        console.log('googleUser: '+profile.displayName)
        console.log('googleUser: '+profile.name.familyName)
        console.log('googleUser: '+profile.name.givenName)
        console.log('googleUser: '+profile.photos[0].value)
        
        Guser.findOne({
            where: {
                googleId: profile.id
            }
        }).then(atualUser => {
            if(atualUser){
                //usuario ja existe
                console.log('user is: '+ atualUser)
                done(null, atualUser)
            }else {
                //usuario nao existe, entao crie-o
                //create user into a database
                Guser.create({
                    username: profile.displayName,
                    googleId: profile.id
                }).then( newUser => {
                    console.log('Novo User: '+ newUser)
                    done(null, newUser)
                })
            }
        })
    })
)
/********** estrategia de login local ****************/
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
    console.log('serialize user: '+user.googleId)
    done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
    Guser.findByPk(id).then( user => {
        console.log('deserialize user: '+user)
        done(null, user)
    }).catch( err => {
        console.log('erro no deserialize user: '+err)
    })
})