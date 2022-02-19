function CPF(cpf) {
    
    //CREATE ONE PROPERTY
    Object.defineProperty(this, 'clearCPF', {
        enumerable: true,
        get: function() {
            
        return cpf.replace(/\D+/g, '')
        },
        
    })
} 

CPF.prototype.checkCPF = function (){

        //prototype that check all the other prototypes
    if(this.clearCPF.length !== 11) return false 
    if(typeof this.clearCPF !== 'string') return false 
    if(this.isSequence()) return false
    
const first9Numbers = this.clearCPF.slice(0, -2)
    

    const penultimateDigit = this.validate(first9Numbers);
    const lastDigit = this.validate(first9Numbers + penultimateDigit)
    const cpfValid = first9Numbers + penultimateDigit + lastDigit
    
    return cpfValid === this.clearCPF
    
}

CPF.prototype.validate = function(first9Numbers) {

    // check if CPF is format valid
    const arrayCPF = Array.from(first9Numbers)
    let regressive = 10
    const totalOfNumbers  = arrayCPF.reduce((acc, value) => {
        
        acc += (regressive * Number(value))
        regressive--

        return acc;

    }, 0)

    const lastDigit = 11 - (totalOfNumbers % 11);
    return lastDigit > 9 ? 0 : String(lastDigit)


}
CPF.prototype.isSequence = function() {
    
    //block that check if and sequence 
    const sequence = this.clearCPF[0].repeat(this.clearCPF.length)
    
    return sequence === this.clearCPF
    
}

//CREATE ONE INSTANCE OF CPF 
const newCPF = new CPF('inset here')


//CHECK IF CPF IS VALID

if(newCPF.checkCPF()) {
    console.log(`CPF VALID `)
} else {
    console.log(`CPF INVALID`)
}



