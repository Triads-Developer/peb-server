import express from "express";
import fs from "fs";
import FindFiles from 'file-regex';
import csvParser from "csv-parser";

async function run() {
    console.log("Pinged your deployment. You successfully connected!");
}

run().catch(console.dir);
const app = express();
const port = 3001;

app.get('/status', (req, res) => {
    const status = {
        "Status": "Running"
    };

    res.send(status);
});

app.get('/images/icons/:id', async (req, res) => {
    const pattern = `.*${req.params.id}_1done.jpg`;
    const path = '/Users/gregoryporter/Projects/botany-server/data/';
    const result = await FindFiles(path, pattern);

    if (result && result[0]) {
        let filename = path + result[0].file;
        res.sendFile(filename);
    } else {
        res.sendFile('/Users/gregoryporter/Projects/botany-server/Cassia_abbreviata_A_Ventral_95-0018.jpg');
    }
});

app.get('/images/dropdown/:name', (req, res) => {
    res.sendFile('/Users/gregoryporter/Projects/botany-server/dropdown/' + req.params.name + '.png');
});

app.get('/data', (req, res) => {
    const result = [];

    fs.createReadStream("./data.csv")
        .pipe(csvParser())
        .on("data", (data) => {
            result.push(data);
        })
        .on("end", () => {
            res.send({data : result});
        });
});

let server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//when running, uncomment export default server
//export default server;

//when testing, uncomment export default server
module.exports = server;
