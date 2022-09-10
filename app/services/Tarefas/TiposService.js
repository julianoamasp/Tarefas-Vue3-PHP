export default {
    getAll(callback) {
        const request = new XMLHttpRequest();
        request.onload = (aa) => {
            let jsonres = JSON.parse(aa.target.responseText);
            callback(jsonres)
        }
        request.open("GET", "http://localhost/api/tipo");
        request.send();
    },
}