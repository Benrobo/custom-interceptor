## Creating Custom HTTP INTERCEPTOR

This repo demosterate how the axios interceptor works along with `access token` and `refresh tokens`.


It made up of a `client` and `proxy API` server.

```js

    // code exmaple
        
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
        // add headers begfore making requests
        config["headers"] = {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }

        let res = await fetch(url, config);
        let data = await res.json();

        return { res, data }
    }





    // Using the function
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
```


### Interceptors.

The Interceptor helps us to modify the HTTP Request by intercepting it before the Request is sent to the back end. The Interceptor can be useful for adding custom headers to the outgoing request, logging the incoming response, etc.

In a more clear definition, as the name implies, `interceptors` allow us to intercept incoming or outgoing HTTP requests using the HttpClient. This way, we would be able to add our own custom headers to any outgoing client request to any backend server, eg `accessToken` or `X-api-key`


Below are the steps to do revoke your JWT access token:

- When you do log in, send 2 tokens (Access token, Refresh token) in response to the client.
  
- The access token will have less expiry time and Refresh will have long expiry time.
  
- The client (Front end) will store refresh token in his local storage and access token in cookies.
  
- The client will use an access token for calling APIs. But when it expires, you call auth server API to get the new token (refresh token is automatically added to http request since it's stored in cookies).
  
- Your auth server will have an API exposed which will accept refresh token and checks for its validity and return a new access token.
  
- Once the refresh token is expired, the User will be logged out.