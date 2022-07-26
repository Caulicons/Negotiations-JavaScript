import { NegociaçãoDao } from "../dao/NegociaçõesDao.js"
import { HttpService } from "./HttpService.js"
import { ConnectionFactory } from "./ConnectionFactory.js"
import { Negociação } from "../models/Negociação.js"

 export class NegociaçõesServices {
    #http 
    constructor() {

        this.#http = new HttpService()
    }

    async obterNegociações() {

       return Promise.all([
            this.#obterNegociaçõesDaSemana(),
            this.#obterNegociaçõesDaSemanaAnterior(),
            this.#obterNegociaçõesDaSemanaRetrasada() 
        ])
        .then(listaNegociaçõesImportadas => {
          return listaNegociaçõesImportadas.reduce((únicoArr, arr) => únicoArr.concat(arr), [])
        })
        .catch( err => {throw new Error(err)})
    }
    
    #obterNegociaçõesDaSemana() {

      return new Promise( (response, reject) => {
        this.#http
        .get('http://localhost:300negociacoes/semana')
        .then(res => response(res))
        .catch( () => reject('Não foi possível importa as negociações dessa semana.'))}
        )
    }
        
    #obterNegociaçõesDaSemanaAnterior() {
         
        return new Promise( (response, reject) => {
        this.#http
        .get('http://localhost:300negociacoes/anterior')
        .then(res => response(res))
        .catch( () => reject('Não foi possível importa as negociações da semana anterior.'))}
        )
    }

    #obterNegociaçõesDaSemanaRetrasada() { 

        return new Promise( (response, reject) => {
            this.#http
            .get('http://localhost:300negociacoes/retrasada')
            .then(res => response(res))
            .catch( () => reject('Não foi possível importa as negociações da semana retrasada'))}
            )
        }

    async cadastra(negociação) {
        
          return ConnectionFactory
            .getConnection()
            .then( connection => {

                new NegociaçãoDao(connection)
                .adicionar(negociação)
                .then( () => 'Negociação adicionada com sucesso')
                .catch( () => {throw new Error('Não foi possível adicionar a negociação')})
        })
    }

    async lista() {

       return ConnectionFactory
                .getConnection()
                .then( connection => new NegociaçãoDao(connection))
                .then(dao => dao.listaDeTodos())
                .catch(err => err)
        }

    async apagar() {

        return ConnectionFactory
                .getConnection()
                    .then(connection => new NegociaçãoDao(connection))
                    .then(dao => dao.apagarTodos())
                    .then( () =>  'Negociações apagadas com sucesso.')
                    .catch( err => {
                        console.log(err)
                        throw new Error('Não foi possível importa as negociações')
                    })
                }

    async importa(listaAtual) {

       return this.obterNegociações()
        .then(dadosImportados =>  dadosImportados
            .map(dado => new Negociação(new Date(dado.data), dado.quantidade, dado.valor))
            )
        .then(negociaçõesImportadas =>  
                negociaçõesImportadas  
                    .filter( negociaçãoImportada => 
                        !listaAtual.some( negociaçãoExistente => 
                            negociaçãoExistente.isEquals(negociaçãoImportada))))
        .catch(err => {
            console.log(`${err}. Verifique a url digitada para requisição ou veja ser subiu o servidor.`)
            throw new Error(err)
        }) 
    }            
    }

     
 
    
