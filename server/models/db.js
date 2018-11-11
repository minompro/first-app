const mongoose = require("mongoose");
const dbURI = "mongodb://misha999:enormouslemontree92@ds061354.mlab.com:61354/my-app";
mongoose.connect(dbURI);

mongoose.connection.on("connected", () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on("error", () => {
    console.error(`Mongoose failed to connect: ${error}`)
});

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
});

function shutDownGracefully(message, callback) {
    mongoose.connection.close(() => {
        console.log(message);
        callback();
    });
}

process.on("SIGINT", () => {
    shutDownGracefully("app terminated", () => {
        process.exit(0);
    });
});

process.once("SIGUSR2", () => {
    shutDownGracefully("nodemon restarted", () => {
        process.kill(process.pid, "SIGUSR2");
    });
});

require("./model");

