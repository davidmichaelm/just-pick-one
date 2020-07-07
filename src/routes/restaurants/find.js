import fetch from 'node-fetch';

export async function post(req, res, next) {

    console.log(req.body);

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

function makeQueryString(formData) {
    let query = "https://api.yelp.com/v3/businesses/search?";

    if (Object.keys(formData).length > 0) {

        let location;
        if (formData.locationData.locationType == "address") {
            location = "location=" + formData.locationData.address;
        } else {
            location = "latitude=" + formData.locationData.latitude + "&longitude=" +formData.locationData.longitude;
        }

        query += location;


        let categories = "&categories=";
        for (let category in formData.categories) {
            categories += category + ",";
        }
        categories = categories.slice(0, -1); // remove end comma
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