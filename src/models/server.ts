import express from 'express';
import { Application } from 'express';
import bodyParser from 'body-parser';
require('dotenv').config()



class Server {


    //Aplication attribute ->
    app: Application;
    port: number;

    //Constructor whit the port application ->
    constructor(port: number) {

        this.port = port;
        // Initialized express ->
        this.app = express();
        this.config();

        this.setting()
    }

    private config() {
        this.app.use( bodyParser.json() );
        
        if( process.env.DEV ){
            // cors cofig ->
            this.app.use( (req, res, next) => {
                res.header('Access-Control-Allow-Origin', "*");
                res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
                next();
            })
        }
    }

    // set the port ->
    private setting(): void {
        this.app.set( 'port', this.port || process.env.PORT );
    }


    // Running the server ->
    listen() {
        this.app.listen( this.port, () => {
            console.log("Server running on port: " + this.port);
        });
    }


}


export default Server;