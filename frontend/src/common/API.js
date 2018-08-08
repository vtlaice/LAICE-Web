class API {
    static request(options) {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        if (localStorage.getItem('accessToken')) {
            headers.append("Authorization", "Bearer " + localStorage.getItem('accessToken'))
        }
        console.log(localStorage.getItem('accessToken'));

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

    static getPacketsForMonth(month, year) {
        return this.request({
            url: "/api/schedule/calendarPage/" + month + "/" + year,
            method: "GET"
        })
    }

    static getPacket(id) {
        return this.request({
            url: "/api/schedule/packet/" + id,
            method: "GET"
        })
    }

    static schedulePacket(startTime, endTime, packet) {
        return this.request({
            url: "/api/packet/schedulePacket",
            method: "POST",
            body: JSON.stringify({
                startTime: startTime,
                endTime: endTime,
                schedulePacket: packet
            })
        })
    }

    static updatePacket(startTime, endTime, packet, id) {
        return this.request({
            url: "/api/packet/updatePacket/" + id,
            method: "POST",
            body: JSON.stringify({
                startTime: startTime,
                endTime: endTime,
                schedulePacket: packet
            })
        })
    }

    static exportPacket(id) {
        return this.request({
            url: "/api/schedule/export/" + id,
            method: "GET"
        })
    }

    static deletePacket(id) {
        return this.request({
            url: "/api/packet/deletePacket/" + id,
            method: "GET"
        })
    }

    static updatePassword(oldPassword, newPassword) {
        return this.request({
            url: "/api/auth/updatePassword",
            method: "POST",
            body: JSON.stringify({
                oldPassword: oldPassword,
                newPassword: newPassword
            })
        })
    }

    static updateUserDetails(details) {
        return this.request({
            url: "/api/users/me/updateDetails",
            method: "POST",
            body: JSON.stringify(details)
        })
    }
}


export default API