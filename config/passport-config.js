const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./keys.json')
const bcrypt = require('bcrypt')

// importar models
const User = require('../models').User

/************Estrategia de login por facebook**********/
passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: keys.facebook.callbackURL,
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {

        // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        // return cb(err, user);
        // });
        console.log('facebook Profile: '+profile.id)
        console.log('facebook Profile: '+profile.displayName)
        console.log('facebook Profile: '+profile.emails[0].value)
        console.log('facebook Profile: '+profile.photos[0].value)

        User.findOne({
            where: {
                facebookId: profile.id
            }
        }).then(atualUser => {
            if(atualUser){
                //usuario ja existe
                console.log('user is: '+ atualUser.username)
                done(null, atualUser)
            }else {
                //usuario nao existe, entao crie-o
                //create user into a database
                User.create({
                    firstName: profile.displayName,
                    email: profile.emails[0].value,
                    photo: profile.photos[0].value,                    
                    facebookId: profile.id,
                    status: 10,
                    access: 1,
                    localId: false
                }).then( newUser => {
                    console.log('Novo User: '+ newUser)
                    done(null, newUser)
                })
            }
        })
    }
));
100

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
        console.log('googleUser: '+profile.emails[0].value)
        
        User.findOne({
            where: {
                email: profile.emails[0].value
            }
        }).then(atualUser => {
            if(atualUser){
                //usuario ja existe
                console.log('user is: '+ atualUser)
                done(null, atualUser)
            }else {
                //usuario nao existe, entao crie-o
                //create user into a database
                User.create({
                    firstName: profile.name.familyName,
                    lastName: profile.name.givenName,
                    photo: profile.photos[0].value,
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    status: 10,
                    access: 1,
                    localId: false
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
    // console.log('serialize user: '+user)
    // console.log('serialize user: '+user.facebookId)
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