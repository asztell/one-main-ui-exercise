import { useState } from 'react'
import check from '../../assets/check.png'
import cvv from '../../assets/cvv.png'
import './Form.css'

export function Form() {
  const [values, setValues] = useState({
    loanAccountNumber: '',
    // accountType: '',
    checking: 'on',
    debitCard: '',
    routingNumber: '',
    bankAccountNumber: '',
    confirmBankAccountNumber: '',
    cardNumber: '',
    nameOnCard: '',
    expirationDate: '',
    cvv: ''
  })
  const [errors, setErrors] = useState({
    loanAccountNumber: false,
    accountType: false,
    routingNumber: false,
    bankAccountNumber: false,
    confirmBankAccountNumber: false,
    cardNumber: false,
    nameOnCard: false,
    expirationDate: false,
    cvv: false
  })

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const id = event.target.id
    const value = event.target.value
    console.log('id:', id, 'value:', value)
    console.log('values:', values)
    console.log('id === checking:', id === 'checking')
    if (id === 'checking') {
      setValues({ ...values, checking: 'on', debitCard: '' })
    } else if (id === 'debitCard') {
      setValues({ ...values, debitCard: 'on', checking: '' })
    } else {
      setValues({ ...values, [id]: value })
    }
  }

  function onSubmit() {
    const newErrors =
      values.checking === 'on'
        ? {
            ...errors,
            loanAccountNumber: values.loanAccountNumber === '',
            routingNumber: values.routingNumber === '',
            bankAccountNumber: values.bankAccountNumber === '',
            confirmBankAccountNumber: values.confirmBankAccountNumber === ''
          }
        : {
            ...errors,
            cardNumber: values.cardNumber === '',
            nameOnCard: values.nameOnCard === '',
            expirationDate: values.expirationDate === '',
            cvv: values.cvv === ''
          }
    setErrors(newErrors)
    // there would be a fetch request here to send the form data to the server
    console.log('Form submitted:', values)
  }

  return (
    <div className="Form">
      <h2>One-time Loan Payment</h2>
      <p>Fill out the form below to complete your payment.</p>
      <form>
        <div className="field">
          <label
            className={errors.loanAccountNumber ? 'error' : ''}
            htmlFor="loan-account-number"
          >
            Loan Account Number
          </label>
          <input
            type="text"
            id="loan-account-number"
            value={values.loanAccountNumber}
            onChange={onChange}
          />
        </div>
        <div className="split">
          <div className="split-left">
            <div className="field">
              <label
                className={errors.accountType ? 'error' : ''}
                htmlFor="account-type"
              >
                Type of Account
              </label>
              <div className="radio-group">
                <input
                  type="radio"
                  id="checking"
                  onChange={onChange}
                  checked={values.checking === 'on'}
                />
                <label htmlFor="checking">Checking</label>
                <input
                  type="radio"
                  id="debitCard"
                  onChange={onChange}
                  checked={values.debitCard === 'on'}
                />
                <label htmlFor="debit-card">Debit Card</label>
              </div>
            </div>
            {values.checking === 'on' ? (
              <Checking errors={errors} values={values} onChange={onChange} />
            ) : (
              <DebitCard errors={errors} values={values} onChange={onChange} />
            )}
          </div>
          <div className="split-right">
            {values.checking === 'on' ? (
              <p>Where can I find the routing and account number?</p>
            ) : (
              <p>Where can I find the cvv number?</p>
            )}
            <img
              className={values.debitCard === 'on' ? 'cvv' : 'check'}
              src={values.debitCard === 'on' ? cvv : check}
              alt="routing and account number"
            />
          </div>
        </div>
        <div className="submit">
          <input type="button" value="MAKE PAYMENT" onClick={onSubmit} />
        </div>
      </form>
    </div>
  )
}

type CheckingProps = {
  errors: {
    routingNumber: boolean
    bankAccountNumber: boolean
    confirmBankAccountNumber: boolean
  }
  values: {
    routingNumber: string
    bankAccountNumber: string
    confirmBankAccountNumber: string
  }
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function Checking({ errors, values, onChange }: CheckingProps) {
  return (
    <>
      <div className="field">
        <label
          htmlFor="routing-number"
          className={errors.routingNumber ? 'error' : ''}
        >
          Routing Number
        </label>
        <input
          type="text"
          id="routing-number"
          value={values.routingNumber}
          onChange={onChange}
        />
      </div>
      <div className="field">
        <label
          className={errors.bankAccountNumber ? 'error' : ''}
          htmlFor="bank-account-number"
        >
          Bank Account Number
        </label>
        <input
          type="text"
          id="bank-account-number"
          value={values.bankAccountNumber}
          onChange={onChange}
        />
      </div>
      <div className="field">
        <label
          className={errors.confirmBankAccountNumber ? 'error' : ''}
          htmlFor="confirm-bank-account-number"
        >
          Confirm Bank Account Number
        </label>
        <input
          type="text"
          id="confirm-bank-account-number"
          value={values.confirmBankAccountNumber}
          onChange={onChange}
        />
      </div>
    </>
  )
}
type DebitCardProps = {
  errors: {
    cardNumber: boolean
    nameOnCard: boolean
    expirationDate: boolean
    cvv: boolean
  }
  values: {
    cardNumber: string
    nameOnCard: string
    expirationDate: string
    cvv: string
  }
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function DebitCard({ errors, values, onChange }: DebitCardProps) {
  return (
    <>
      <div className="field">
        <label
          htmlFor="card-number"
          className={errors.cardNumber ? 'error' : ''}
        >
          Card Number
        </label>
        <input
          type="text"
          id="card-number"
          value={values.cardNumber}
          onChange={onChange}
        />
      </div>
      <div className="field">
        <label
          className={errors.nameOnCard ? 'error' : ''}
          htmlFor="name-on-card"
        >
          Name on Card
        </label>
        <input
          type="text"
          id="name-on-card"
          value={values.nameOnCard}
          onChange={onChange}
        />
      </div>
      <div className="half-field">
        <div className="field">
          <label
            className={errors.expirationDate ? 'error' : ''}
            htmlFor="expiration-date"
          >
            Expiration Date
          </label>
          <input
            type="text"
            id="expiration-date"
            value={values.expirationDate}
            onChange={onChange}
          />
        </div>
        <div className="field">
          <label className={errors.cvv ? 'error' : ''} htmlFor="cvv">
            CVV
          </label>
          <input type="text" id="cvv" value={values.cvv} onChange={onChange} />
        </div>
      </div>
    </>
  )
}
