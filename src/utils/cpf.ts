export class CPF {
    private value: string

    constructor(value: string){
        
        if(!CPF.isValid(value)) throw new Error("CPF inválido") 
        this.value = value
    }

    private static isValid(value: string) : boolean{

        //verificar

        return true
    }

    public toString(){
        return this.value
    }
}