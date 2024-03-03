import { useState, useMemo, useCallback } from 'react'
import check from '../../assets/check.png'
import cvv from '../../assets/cvv.png'
import { Checking } from '../Checking/Checking'
import { DebitCard } from '../DebitCard/DebitCard'
import { validate } from '../../utils/validations'
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
      const { id, value } = event.target

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

  const onBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      const { id, value } = event.target

      if (!validate[id as keyof typeof validate](value)) {
        setErrors({ ...errors, [id]: true })
      } else {
        setErrors({ ...errors, [id]: false })
      }
    },
    [errors]
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
        loanAccount: !validate.loanAccount(loanAccount),
        routing: !validate.routing(routing),
        bankAccount: !validate.bankAccount(bankAccount),
        confirmBankAccount: !validate.bankAccount(confirmBankAccount)
      }
      request = {
        loanAccount,
        routing,
        bankAccount
      }
    } else {
      newErrors = {
        ...initialErrors,
        loanAccount: !validate.loanAccount(loanAccount),
        card: !validate.card(card),
        nameOnCard: !validate.nameOnCard(nameOnCard),
        expirationDate: !validate.expirationDate(expirationDate),
        cvv: !validate.cvv(cvv)
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
    console.log('newErrors:', newErrors)
    if (Object.values(newErrors).includes(true)) {
      setErrors(newErrors)
      return
    }
    // setErrors(initialErrors)
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
            id="loanAccount"
            value={values.loanAccount}
            onChange={onChange}
            onBlur={onBlur}
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
              <Checking
                errors={errors}
                values={values}
                onChange={onChange}
                onBlur={onBlur}
              />
            ) : (
              <DebitCard
                errors={errors}
                values={values}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          </div>
          <div className="split-right">
            {values.checking === 'on' ? (
              <p>Where can I find the routing and account number?</p>
            ) : (
              <p>Where can I find the cvv number?</p>
            )}
            {/* <img
              className={values.debitCard === 'on' ? 'cvv' : 'check'}
              src={values.debitCard === 'on' ? cvv : check}
              alt="routing and account number"
            /> */}
          </div>
        </div>
        <div className="submit">
          <input type="button" value="MAKE PAYMENT" onClick={onSubmit} />
        </div>
      </form>
    </div>
  )
}
