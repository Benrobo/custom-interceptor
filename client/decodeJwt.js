

export function DecodeJWT() {
    this.b64DecodeUnicode = (str) => {
        return decodeURIComponent(
            Array.prototype.map.call(atob(str), c =>
                '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            ).join(''))
    }


    this.parseJwt = (token) => {
        return JSON.parse(
            this.b64DecodeUnicode(
                token.split('.')[1].replace('-', '+').replace('_', '/')
            )
        )
    }

    // return parseJwt
}



