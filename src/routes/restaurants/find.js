import fetch from 'node-fetch';

export async function post(req, res, next) {

    console.log(req.body);
    const queryString = makeQueryString(req.body);

    const yelpData = await getYelpData(queryString);

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    res.end(JSON.stringify(yelpData));
}

function makeQueryString(options) {
    let query = "https://api.yelp.com/v3/businesses/search?";

    let location = "location=Milwaukee";

    query += location;

    if (Object.keys(options).length > 0) {
        let categories = "&categories=";
        for (let option in options) {
            categories += option + ",";
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