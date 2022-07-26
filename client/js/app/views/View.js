export class View {
    #elemento
    
    constructor(elementoDOM) {
        if(this.constructor == View)
            throw new Error('A classe View não deve ser instanciada diretamente')
        
        this.#elemento = elementoDOM
    }
  
    tabela(modelo) {
        throw new Error('A tabela tem que ser instanciada.')
    }
  
    update(modelo) {
       this.#elemento.innerHTML = this.tabela(modelo)
    }
}