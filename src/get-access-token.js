export default async function getAccessToken() {
    try {
        const username = process.env.E_ENGLISH_USERNAME;
        const password = process.env.E_ENGLISH_PASSWORD;
        const response = await fetch(
            "https://service.eenglish.vn/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            }
        );
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        const accessToken = data.data.accessToken
        return accessToken;
    } catch (error) {
        console.log(error);
        return null;
    }
}
