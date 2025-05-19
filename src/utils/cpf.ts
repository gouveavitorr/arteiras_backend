export class CPF {
    private value: string

    constructor(value: string){
        
        if(!CPF.isValid(value)) throw new Error("CPF inválido") 
        this.value = value
    }

    private static isValid(value: string) : boolean{
        //limpar o cpf e obter só os números
        
        //primeiro dígito: multi 9 primeiros dígitos da esq p dir por 10 até chegar em 2
        //somar todos os resultados e dividir o total por 11
        //res < 2? 1º dígito = 0
        //res >= 2? 1º dígito = 11 - remainder
        let firstVerifDigit = 0
        let j = 10

        for (let i = 0; i <= 8; i++) {
            let digit = parseInt(value[i])
            digit *= j
            firstVerifDigit += digit
            j--
        }

        let remainder = firstVerifDigit % 11
        if(remainder < 2){
            firstVerifDigit = 0
        } else {
            firstVerifDigit = 11 - remainder
        }
        //segundo dígito: multi 10 dígitos (firstVerifDigit incluso)
        //repetir todos os passos, mas j é 11

        let secondVerifDigit = 0
        j = 11

        for (let i = 0; i <= 9; i++) {
            let digit = parseInt(value[i])
            digit *= j
            secondVerifDigit += digit
            j--
        }

        remainder = secondVerifDigit % 11
        if(remainder <= 2){
            secondVerifDigit = 0
        } else {
            secondVerifDigit = 11 - remainder
        }

        if(parseInt(value[9]) == firstVerifDigit && parseInt(value[10]) == secondVerifDigit){
            return true
        }

        return false
    }

    public toString(){
        return this.value
    }
}