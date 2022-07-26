export class ListaNegociações {
    #negociações
    constructor() {

        this.#negociações = []
    }

    adiciona(negociação){
        
        this.#negociações.push(negociação)
    }

     get negociações() {

       return [].concat(this.#negociações)
    }

     esvaziar() {
      
      this.#negociações = []
     }

     get volume() {
       
       return this.negociações.reduce((t, n) => t + n.volume, 0.0)
     }

      ordena(coluna) {

        this.#negociações.sort((a, b) => a[coluna] - b[coluna]) 
     }

     inverteOrdem() {

      this.#negociações.reverse()
     }
}