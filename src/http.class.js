export class Http {
    #options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    constructor(options){
        this.#options = options;
    }

    request(options){
        if(options){
            this.#options = options;
        }
        return new Promise((resolve, reject) => {
            const url = this.#options.url;
            fetch(url, {
                method: this.#options.method,
                headers: this.#options.headers
            })
            .then((value) => {
                value.json().then((jsonVal) => {
                    resolve(jsonVal)
                }).catch((error) => {
                    reject(error);
                })
            })
            .catch((error) => {
                reject(error);
            })
        });
    }
}