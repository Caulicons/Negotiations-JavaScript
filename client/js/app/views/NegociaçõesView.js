import { DateHelpers } from "../helpers/DateHelpers.js"
import { View } from "./View.js"
import { currentInstance } from "../controllers/NegociaçãoController.js"

export class NegociaçõesView extends View {

    constructor(elemento) {

        super(elemento)

        elemento.addEventListener('click', function(event) {

            if(event.target.nodeName == 'TH') currentInstance().ordena(event.target.textContent.toLowerCase());
        })
    }

  tabela(negócios) {
      return `<table class="table table-hover table-bordered">
            <thead>
                    <tr>
                        <th data-th="data">DATA</th>
                        <th data-th="quantidade">QUANTIDADE</th>
                        <th data-th="valor">VALOR</th>
                        <th data-th="volume">VOLUME</th>
                    </tr>
            </thead>
            <tbody>
              ${negócios.negociações.map(n =>  `
                   <tr>
                      <td>${DateHelpers.dataParaTexto(n.data)}</td>
                      <td>${n.quantidade}</td>
                      <td>${n.valor}</td>
                      <td>${n.volume}</td>
                   </tr>`
                   ).join('')
              }
          
          </tbody>
              <td colspan="3" style="text-align: right; font-weight:bold">TOTAL  :</td> 
              <td>
              ${negócios.volume}
              </td>
           <tfoot>
          </tfoot>
      </table>
      `
  }

}