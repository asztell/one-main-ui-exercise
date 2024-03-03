import { useState, useMemo, useCallback } from 'react'
import check from '../../assets/check.png'
import cvv from '../../assets/cvv.png'
import { Checking } from '../Checking/Checking'
import { DebitCard } from '../DebitCard/DebitCard'
import './Form.css'

export function Form() {
  const initialValues = useMemo(
    () => ({
      loanAccount: '',
      checking: 'on',
      debitCard: '',
      routing: '',
      bankAccount: '',
      confirmBankAccount: '',
      card: '',
      nameOnCard: '',
      expirationDate: '',
      cvv: ''
    }),
    []
  )
  const [values, setValues] = useState(initialValues)
  const initialErrors = useMemo(
    () => ({
      loanAccount: false,
      routing: false,
      bankAccount: false,
      confirmBankAccount: false,
      card: false,
      nameOnCard: false,
      expirationDate: false,
      cvv: false
    }),
    []
  )
  const [errors, setErrors] = useState(initialErrors)

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const id = event.target.id
      const value = event.target.value

      if (id === 'checking') {
        setValues({ ...values, checking: 'on', debitCard: '' })
      } else if (id === 'debitCard') {
        setValues({ ...values, debitCard: 'on', checking: '' })
      } else {
        setValues({ ...values, [id]: value })
      }
    },
    [values]
  )

  const onSubmit = useCallback(() => {
    const {
      loanAccount,
      checking,
      routing,
      bankAccount,
      confirmBankAccount,
      card,
      nameOnCard,
      expirationDate,
      cvv
    } = values
    let newErrors
    let request

    if (checking === 'on') {
      newErrors = {
        ...initialErrors,
        loanAccount: loanAccount === '',
        routing: routing === '',
        bankAccount: bankAccount === '',
        confirmBankAccount: confirmBankAccount === ''
      }
      request = {
        loanAccount,
        routing,
        bankAccount
      }
    } else {
      newErrors = {
        ...initialErrors,
        loanAccount: loanAccount === '',
        card: card === '',
        nameOnCard: nameOnCard === '',
        expirationDate: expirationDate === '',
        cvv: cvv === ''
      }
      request = {
        loanAccount,
        card,
        nameOnCard,
        expirationDate,
        cvv
      }
    }
    console.log('request:', request)
    if (Object.values(newErrors).includes(true)) {
      setErrors(newErrors)
      return
    }
    setErrors(initialErrors)
    // there would be a try/catch with a fetch request here to send the form data to the server
  }, [values, initialErrors])

  return (
    <div className="Form">
      <h2>One-time Loan Payment</h2>
      <p>Fill out the form below to complete your payment.</p>
      <form>
        <div className="field">
          <label
            className={errors.loanAccount ? 'error' : ''}
            htmlFor="loanAccount"
          >
            Loan Account Number
          </label>
          <input
            type="number"
            maxLength={10}
            id="loanAccount"
            value={values.loanAccount}
            onChange={onChange}
          />
        </div>
        <div className="split">
          <div className="split-left">
            <div className="field">
              <label htmlFor="accountType">Type of Account</label>
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
                <label htmlFor="debitCard">Debit Card</label>
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
