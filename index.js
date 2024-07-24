const express = require("express");
const bodyParser = require("body-parser");
const Routes = require('./src/routes/routes');
const swagger = require("./swagger")

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/', Routes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    swagger.swaggerDocs1(app, port)
});
