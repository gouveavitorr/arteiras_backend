export class PhoneNumber {
    private value: string

    constructor(value: string){
        if(!this.isValid()) throw new Error("Invalid phone number") 
        this.value = value
    }

    isValid() : boolean {

        if(this.value.length != 11) throw new Error("Invalid phone number")

        //this.value[0] > 0 && this.value[0] <= 9
        //this.value[1] > 0 && this.value[1] <= 9
        //this.value[2] == 9

        return false
    }

    getInternationalFormat(): string{
        return 
    }

}