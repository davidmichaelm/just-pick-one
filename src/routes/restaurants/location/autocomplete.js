import {Client} from "@googlemaps/google-maps-services-js";

const mapClient = new Client({});

export async function get(req, res, next) {
    if (!req.query.input)
        return;

    mapClient.placeAutocomplete({
        params: {
            input: req.query.input,
            types: "geocode",
            key: process.env.GCP_API_KEY
        },
        timeout: 1000
    })
        .then((r) => {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(r.data.predictions));
        })
        .catch((e) => {
            console.log(e);
            console.log(e.response.data.error_message);
        });
}
