import { View } from "./View.js";

export class MensagemView extends View {

    tabela(aviso){
        return aviso.texto ? `<p class="alert alert-info">${aviso.texto}</p>` : `<p></p>`
    }
}