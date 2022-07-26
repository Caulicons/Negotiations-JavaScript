import { Negociação } from "../models/Negociação.js"
import { DateHelpers } from "../helpers/DateHelpers.js"
import { ListaNegociações } from "../models/listaNegociações.js"
import { Mensagem } from "../models/Mensagem.js"
import { NegociaçõesView } from "../views/NegociaçõesView.js"
import { MensagemView } from "../views/MensagemView.js"
import { Bind } from "../helpers/Bind.js"
import { NegociaçõesServices } from "../services/NegociaçõesServices.js"

export class NegociaçãoController {
    #data
    #quantidade
    #valor
    #listaNegociações
    #mensagem
    #service
    #ordemAtual
    constructor(){

        let $ = document.querySelector.bind(document);
        this.#data = $('#data');
        this.#quantidade = $('#quantidade');
        this.#valor = $('#valor');

        this.#listaNegociações = new Bind(
            new ListaNegociações(),
            new NegociaçõesView($('#negociação-view')),
            'esvaziar', 'adiciona', 'ordena', 'inverteOrdem'
        )
                
        this.#mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagem-view')),
            'texto'
        )

        this.#ordemAtual = ''

        this.#service = new NegociaçõesServices()

        this.#init()
    }

    #init() {

        this.#service
        .lista()
        .then(negociações => 
                negociações.forEach( neg => 
                    this.#listaNegociações.adiciona(new Negociação(neg.data, neg.quantidade, neg.valor))))
        .catch(err => this.#mensagem.texto = err)

        setInterval( () => {
                this.#importarNegociações()
            }, 3000)    
    }

    adicionar(e) {

        e.preventDefault()

        let negociação = this.#criaNegociação()
        
        this.#service
        .cadastra(negociação) 
        .then( () => {
            
            this.#listaNegociações.adiciona(negociação)
            this.#mensagem.texto = 'Negociação adicionada com sucesso' 
            this.#limparFormulários() }
            )
        .catch(err =>  this.#mensagem.texto = err)
    }

    apagar() {

        this.#service
        .apagar()
        .then(resolve => {

            this.#mensagem.texto = resolve
            this.#listaNegociações.esvaziar()
        })
        .catch(err => {

            this.#mensagem.texto = err
            console.log(err)
        }) 
    }

    ordena(coluna) {

        if(this.#ordemAtual == coluna) {
            this.#listaNegociações.inverteOrdem()
        } else {this.#listaNegociações.ordena(coluna)}
        
        this.#ordemAtual = coluna
    }

     #importarNegociações() {

        this.#service
        .importa(this.#listaNegociações.negociações)
        .then(negociações =>  negociações
            .filter(negociação => 
                !this.#listaNegociações.negociações
                    .some(negociaçõesExistentes => 
                        JSON.stringify(negociaçõesExistentes) == JSON.stringify(negociação) )))
        .then( negociações => negociações
                                .forEach( negociação => {
                                    this.#listaNegociações.adiciona(negociação)
                                    this.#mensagem.texto = 'Negociações importada com sucesso.'}))
        .catch(err =>  this.#mensagem.texto = err);
    } 

    #limparFormulários() {

        this.#data.value = ''
        this.#quantidade.value = 1
        this.#valor.value = 0.0
        this.#data.focus()
    }

    #criaNegociação() {

        return new Negociação(
            
            DateHelpers.textoParaData(this.#data.value),
            Number(this.#quantidade.value), 
            Number(this.#valor.value)
            )
    }
}

let negociaçãoController  = new NegociaçãoController()

export function currentInstance() {

    return negociaçãoController
}