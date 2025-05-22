export class CPF {
    private value: string

    constructor(value: string){
        
        if(!this.isValid()) throw new Error("Invalid CPF") 
        this.value = value
    }

    private isValid() : boolean{
 
        let firstVerifDigit = 0
        let j = 10

        for (let i = 0; i <= 8; i++) {
            let digit = parseInt(this.value[i])
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

        let secondVerifDigit = 0
        j = 11

        for (let i = 0; i <= 9; i++) {
            let digit = parseInt(this.value[i])
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

        if(parseInt(this.value[9]) == firstVerifDigit && parseInt(this.value[10]) == secondVerifDigit){
            return true
        }

        return false
    }

    public toString(){
        return this.value
    }
}