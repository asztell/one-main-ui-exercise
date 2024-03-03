const threeDigits = /^\d{3}$/
const nineDigits = /^\d{9}$/
const tenDigits = /^\d{10}$/
const name =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]*$/

export const validate = {
  card: (card: string) => {
    if (
      // 'Visa'
      /^4[0-9]{12}(?:[0-9]{3})?$/.test(card) ||
      // 'Mastercard'
      /^5[1-5][0-9]{14}|^(222[1-9]|22[3-9]\\d|2[3-6]\\d{2}|27[0-1]\\d|2720)[0-9]{12}$/.test(
        card
      ) ||
      // 'American Express'
      /^3[47][0-9]{13}$/.test(card) ||
      // 'Discover'
      /^6(?:011|5[0-9]{2})[0-9]{12}$/.test(card) ||
      // 'Diners Club'
      /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/.test(card)
    ) {
      return true
    }
    return false
  },
  loanAccount: (loanAccount: string) => tenDigits.test(loanAccount),
  routing: (routing: string) => nineDigits.test(routing),
  bankAccount: (bankAccount: string) => tenDigits.test(bankAccount),
  nameOnCard: (nameOnCard: string) => name.test(nameOnCard),
  expirationDate: (expirationDate: string) => expirationDate === '',
  cvv: (cvv: string) => threeDigits.test(cvv)
}
