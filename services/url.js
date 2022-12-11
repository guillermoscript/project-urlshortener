
function shorten(url,urls) {
    const id = urls.length
    const data = {
        short_url: id,
        original_url: url
    }
    urls.push(data)
    return data
}

function goTo(id,urls) {
    return urls[id]['original_url']
}

module.exports = {
    shorten,
    goTo
}