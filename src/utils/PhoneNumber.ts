export class PhoneNumber {
    private value: string

    constructor(value: string){
        if(!this.isValid()) throw new Error("Invalid phone number") 
        this.value = value
    }

    isValid() : boolean {

        if(this.value.length > 11 || this.value.length < 10) throw new Error("Invalid phone number")

        if(
            parseInt(this.value[0]) > 0
            && parseInt(this.value[1]) > 0
            && parseInt(this.value[2]) == 9
        ) return true

        return false
    }

    getInternationalFormat(): string{
        return "+55".concat(this.value)
    }

}