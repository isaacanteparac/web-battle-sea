const baseUrl = process.env.REACT_APP_API_URL+"/data/";

export const fetch_ = async (endpoint, data = "", method = "GET") => {
    const url = `${baseUrl}${endpoint}`;

    if (method === "GET" || method === "DELETE") {
        const resp = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await resp.json();
    } else {
        const resp = await fetch(url, {
            method,
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return await resp.json();
    }
};
