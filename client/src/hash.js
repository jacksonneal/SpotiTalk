function getHash() {
    // Get the hash of the url, where the token will be from spotify
    const hash = window.location.hash
        .substring(1)
        .split("&")
        .reduce(function (initial, item) {
            if (item) {
                var parts = item.split("=");
                initial[parts[0]] = decodeURIComponent(parts[1]);
            }
            return initial;
        }, {});
    window.location.hash = "";
    return hash;
}

export default getHash;