export class ProxyFactory {
    
    static create(object, props, ação) {
        
      return new Proxy(object, {

            get(target, prop){
                
                if(props.includes(prop) && ProxyFactory.#ehFunção(target[prop])){

                    return function () {

                    Reflect.apply(target[prop], target, arguments)
                    return ação(target)
                }
                }
                
                return target[prop] 
            },
            
            set(target, prop, value) {

                if(props.includes(prop)){
                    target[prop] = value
                    ação(target)
                } 
                return target[prop] = value
            }
        })
    } 

    static #ehFunção(func){
        return typeof (func) == typeof(Function);
    }
    
}