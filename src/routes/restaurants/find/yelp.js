import fetch from 'node-fetch';

export async function post(req, res, next) {

    console.log(req.params);

    if (!req.body.locationData.locationType) {
        console.log("No location data");
        return;
    }

    const queryString = makeQueryString(req.body);
    console.log(queryString);

    const yelpData = await getYelpData(queryString);
    console.log(yelpData);

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    res.end(JSON.stringify(yelpData));
}

export async function get(req, res, next) {
    console.log(req.query);

    if (!req.query.locationType) {
        console.log("No location data");
        return;
    }

    const queryString = makeQueryString(req.query);
    console.log(queryString);

    const yelpData = await getYelpData(queryString);
    console.log(yelpData);

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    res.end(JSON.stringify(yelpData));
}

function makeQueryString(formData) {
    let query = "https://api.yelp.com/v3/businesses/search?";

    if (Object.keys(formData).length > 0) {

        let location;
        if (formData.locationType === "address") {
            location = "location=" + formData.address;
        } else {
            location = "latitude=" + formData.latitude + "&longitude=" +formData.longitude;
        }

        query += location;


        let categories = "&categories=" + formData.categories;
        query += categories;
    }

    return query;
}

const getYelpData = async (queryString) => {
    try {
        const response = await fetch(queryString, {
            method: 'GET',
            headers:  {
                'Authorization': 'Bearer ' + process.env.YELP_API_KEY,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return response.json();
    } catch (error) {
        console.log(error);
    }

};