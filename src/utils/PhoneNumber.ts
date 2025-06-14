export class PhoneNumber {
    private value: string

    constructor(value: string){
        this.value = value
        if(!this.isValid()) throw new Error("Invalid phone number") 
    }

    isValid() : boolean {

        if(this.value?.length != 11) return false

        if(
            parseInt(this.value[0]) > 0
            && parseInt(this.value[1]) > 0
            && parseInt(this.value[2]) == 9
        ) return true

        return false
    }

    getInternationalFormat(): string {
        return "+55".concat(this.value)
    }

    toString(): string {
        return this.value
    }

    equals(other: PhoneNumber): boolean {
        return this.toString() === other.toString()
    }

}