export class NegociaçãoDao {
    #connection
    #store
    constructor(connection) {

        this.#connection = connection
        this.#store = 'Negociações'
    }

    adicionar(negociação) {

        return new Promise( (resolve, reject) => {

            let request = this.#connection
                            .transaction([this.#store], 'readwrite')
                            .objectStore(this.#store)
                            .add({data: negociação.data, quantidade:  negociação.quantidade, valor:  negociação.valor})

            request.onerror = e => {

                console.log('Não foi possível adicionar a negociação.')
                reject(e.target.error);
            }

            request.onsuccess = e => {

                resolve();
            }

        })
    }

    listaDeTodos() {

        return new Promise ((resolve, reject) => {

            let negociações = []

            let cursor = this.#connection
                            .transaction([this.#store], 'readwrite')
                            .objectStore(this.#store)
                            .openCursor()

            cursor.onsuccess = e => {

                let atual = e.target.result

                if(atual) {

                    let dado = atual.value 

                    negociações.push(dado)

                    atual.continue()
                } 
                else {

                    resolve(negociações)
                }
            }

            cursor.onerror = e => {

                reject(`Não foi possível listar as negociações.`)

                console.log(e.target.error)
            }
        })
    }

    apagarTodos() {

        return new Promise( (resolve, reject) => {

            let request = this.#connection
            .transaction([this.#store], 'readwrite')
            .objectStore(this.#store)
            .clear();

            request.onsuccess = () => resolve('Negociações apagadas com sucesso.')

            request.onerror = e => {

                console.log(e.target.error)
                reject('Não foi possível apagar a negociação.')
            }
        })
    }
    
}



