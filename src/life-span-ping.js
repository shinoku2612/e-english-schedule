export function pingToRender() {
    setInterval(() => {
        const data = fetch(process.env.RENDER_PING_URL);
        console.log({ data });
    }, 10000);
}
