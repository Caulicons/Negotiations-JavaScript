export class HttpService {

    async get (url) {

        return await fetch(url)
                .then(res => this.#tratandoErros(res))
                .then(res => res.json())
                .catch(err => {throw new Error(err)})
    }

    async post (url, dado) {

        return await fetch(url, {
                method: "POST",
                body: JSON.stringify(dado),
                headers: {"Content-type": "application/json"}
            })
            .then(res => this.#tratandoErros(res))
            .then(res => res.json())
            .catch(err => err)
        }

    #tratandoErros(res) {

        if(!res.ok) {
            throw new Error(res.statusText)
        } else {
            return res;
        }
    }

}