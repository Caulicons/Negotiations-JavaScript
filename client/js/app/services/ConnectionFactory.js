const stores = ['Negociações']
const versão = 1
const dbName = 'Negociações'

var connection = null
var close = null

export class ConnectionFactory {

        constructor() {

            throw new Error('Não é possível instância a classe ConnectionFactory')
        }

        static getConnection() {

            return new Promise((resolve, reject) => {

                const requisição = window.indexedDB.open(dbName, versão)

                requisição.onupgradeneeded = e => {

                    ConnectionFactory.#createStores(e.target.result)
                }

                requisição.onerror = e => {
                    
                    console.log(e.target.error.name)
                    reject('Não foi possível haver uma conexão.')
                }

                requisição.onsuccess = e => {

                    if(!connection) {
                        connection = e.target.result

                        close = connection.close.bind(connection)
                        connection.close = function () {

                            throw new Error ('Você não pode fechar diretamente a conexão.')
                        }
                    } 

                    resolve(connection)
                }
            })
        }

        static #createStores(connection) {

            stores.forEach(store => {

                if(connection.objectStoreNames.contains(store))
                    connection.deleteObjectStore(store);
                
                connection.createObjectStore(store, { autoIncrement: true })
            })
        }

        static closedConnection() {

            close()
            connection = null
        } 
    }


