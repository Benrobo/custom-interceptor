import { DecodeJWT } from "./decodeJwt.js"

const decode = new DecodeJWT()


function $(elm) {
    return document.querySelector(elm)
}

function $all(elm) {
    return document.querySelectorAll(elm)
}

function saveLocalstorage(payload) {
    localStorage.setItem("interceptor", JSON.stringify(payload))
}

function saveToCookie(value) {
    document.cookie = `Bearer=${value}`
}

function getLocalstorage() {
    return JSON.parse(localStorage.getItem("interceptor"))
}

let mail = $(".mail")
let pwd = $(".pwd")
let name = $(".name")
let loginbtn = $(".login-btn")
let signupbtn = $(".signup-btn")
let profileCont = $(".profile-cont")

if (signupbtn !== null) {
    signupbtn.addEventListener("click", async () => {
        await signup()
    })
}
if (loginbtn !== null) {
    loginbtn.addEventListener("click", async () => {
        await login()
    })

}

async function login() {
    if (pwd.value === "" || mail.value === "") return

    let url = "http://localhost:5000/api/auth/login"
    let res = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            email: mail.value,
            password: pwd.value
        })
    })

    let data = await res.json()

    if (data && data.error === true) {
        return alert(data.message)
    }

    alert(data.message)

    saveLocalstorage({ refreshToken: data.refreshToken })

    saveToCookie(data.accessToken)

    setTimeout(() => {
        window.location = "home.html"
    }, 1000)
}

async function signup() {
    if (pwd.value === "" || mail.value === "" || name.value === "") return

    let url = "http://localhost:5000/api/auth/register"
    let res = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            name: name.value,
            email: mail.value,
            password: pwd.value
        })
    })

    let data = await res.json()

    if (data && data.error === true) {
        return alert(data.message)
    }

    alert(data.message)

    setTimeout(() => {
        window.location = "index.html"
    }, 1000)
}

async function userData() {
    const cookie = document.cookie
    let token = cookie.split("=")[1];

    const { id } = decode.parseJwt(token);

    const config = {
        method: "post",
        body: JSON.stringify({ id })
    }
    const { res, data } = await customFetch("http://localhost:5000/api/user/get", config)

    if (data && data.error === true) {
        return profileCont.innerHTML = `
            <p> ${data.message} </p>
        `
    }

    if (data && data.result && data.result.length > 0) {
        data.result.map((user) => {
            profileCont.innerHTML = `
                <h3> ${user.name} </h3>
                <h3> ${user.email} </h3>
            `
        })
    }
}

userData()

async function refreshToken(token) {
    if (token !== undefined || token !== "") {

        try {
            let url = "http://localhost:5000/api/token/refresh"
            let res = await fetch(url, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ token })
            })

            let data = await res.json()

            if (data && data.error === true) {
                throw new Error(data.message)
            }

            const { accessTokens, refreshTokens } = data;

            saveLocalstorage({ refreshToken: refreshTokens })
            saveToCookie(accessTokens)
            return data;
        } catch (err) {
            throw new Error(err.message)
        }
    }
}

async function customFetch(url, config = {}) {
    const cookie = document.cookie
    let token = cookie.split("=")[1];

    // exp gives us date in milliseconds
    let { exp } = decode.parseJwt(token);

    // convert milliseconds -> seconds
    let date = new Date().getTime() / 1000;
    // check if exp date is < the present date
    if (exp < date) {
        const reftoken = getLocalstorage()
        let authToken = await refreshToken(reftoken.refreshToken)
        token = authToken.accessTokens
    }
    config["headers"] = {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
    }

    let res = await fetch(url, config);
    let data = await res.json();

    return { res, data }
}