// Import the server ->
import Server from './models/server'



//Starting function ->
const main = () => {
    const app = new Server( 4500 );

    app.listen();
}

// play the game ->
main();