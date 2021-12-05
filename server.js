const express = require( 'express' );
const mongoose = require( 'mongoose' );

mongoose.connect('mongodb://localhost/message_board_db', {useNewUrlParser: true});

const {MessageModel} = require( './models/Models' );

const app = express();

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );


app.use( express.urlencoded({extended:true}) );

app.get( '/', function( request, response ){
    MessageModel
        .getMessages()
        .then( data => {
            console.log( data );
            response.render( 'index', { users : data } );
        });
});

app.post( '/newMessage', function( request, response ){
    console.log( request.body );
    const name = request.body.name;
    const message = request.body.message;


    const newMessage = {
        name,
        message
    };
    console.log( newMessage );
    MessageModel
        .createMessage( newMessage )
        .then( result => {
            console.log( result );
        })
        .catch( err => {
            console.log( err );
        })

    response.redirect( '/' );
});

app.post( '/newComment/', function( request, response ){
    console.log( request.body );
    const id = request.body.MessageId;
    const name = request.body.name;
    const comment = request.body.comment;


    const newComment = {
        name,
        comment
    };
    console.log( newComment );
    MessageModel
        .AddCommentToMessage(id, newComment)
        .then( result => {
            console.log( result );
        })
        .catch( err => {
            console.log( "Something went wrong!" );
            console.log( err );
        })

    response.redirect( '/' );
});



app.listen( 8000, function(){
    console.log( "The users server is running in port 8000." );
});