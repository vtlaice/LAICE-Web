class API {
    static request(options) {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        if (localStorage.getItem('accessToken')) {
            headers.append("Authentication", "Bearer " + localStorage.getItem('accessToken'))
        }

        const defaults = {headers: headers};
        options = Object.assign({}, defaults, options);

        return fetch(options.url, options).then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json)
                }
                return json
            })
        );
    }

    static login(loginRequest) {
        return this.request({
            url: "/api/auth/login",
            method: "POST",
            body: JSON.stringify(loginRequest)
        });
    }

    static getCurrentUser() {
        if (!localStorage.getItem('accessToken')) {
            return Promise.reject("No access token set.");
        }

        return this.request({
            url: "/api/users/me",
            method: "GET"
        });
    }
}


export default API