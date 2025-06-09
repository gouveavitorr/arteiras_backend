export class CPF {
    private value: string

    constructor(value: string){
        
        this.value = value
        if(!this.isValid()) throw new Error("Invalid CPF") 
    }

    private isValid() : boolean{

        if(this.value?.length != 11) return false
 
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
            
            for (let i = 0; i < this.value.length; i++) {
                if(this.value[i] != this.value[i + 1]) return true
            }
        }
        
        return false
    }

    getFormattedValue(): string {
        return this.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }

    equals(other: CPF): boolean {
        return this.toString() === other.toString()
    }

    public toString(){
        return this.value
    }
}