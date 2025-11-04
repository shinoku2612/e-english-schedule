export function pingToRender() {
    setInterval(() => {
        fetch(process.env.RENDER_PING_URL)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    }, 10000);
}
