function $(elm) {
    return document.querySelector(elm)
}

function $all(elm) {
    return document.querySelectorAll(elm)
}


async function customFetch() {

}

async function refresh() {

}

function interceptor(payload, url, method) {

    let token = localStorage.getItem()

        (async () => {

            let res = await fetch(url, {
                method,
                headers: {

                }
            })

        })
}
