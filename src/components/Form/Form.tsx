import { useState, useMemo, useCallback } from 'react'
import check from '../../assets/check.png'
import cvv from '../../assets/cvv.png'
import { Checking } from '../Checking/Checking'
import { DebitCard } from '../DebitCard/DebitCard'
import { validate, ValidationKey } from '../../utils/validations'
import './Form.css'

type ValuesKey =
  | 'loanAccount'
  | 'checking'
  | 'debitCard'
  | 'routing'
  | 'bankAccount'
  | 'confirmBankAccount'
  | 'card'
  | 'nameOnCard'
  | 'expirationDate'
  | 'cvv'

type Values = {
  loanAccount: string
  checking: string
  debitCard: string
  routing: string
  bankAccount: string
  confirmBankAccount: string
  card: string
  nameOnCard: string
  expirationDate: string
  cvv: string
}

type ErrorsKey =
  | 'loanAccount'
  | 'routing'
  | 'bankAccount'
  | 'confirmBankAccount'
  | 'card'
  | 'nameOnCard'
  | 'expirationDate'
  | 'cvv'

type Errors = {
  loanAccount: boolean
  routing: boolean
  bankAccount: boolean
  confirmBankAccount: boolean
  card: boolean
  nameOnCard: boolean
  expirationDate: boolean
  cvv: boolean
}

const isValuesKey = (key: string): key is ValuesKey => {
  return [
    'loanAccount',
    'checking',
    'debitCard',
    'routing',
    'bankAccount',
    'confirmBankAccount',
    'card',
    'nameOnCard',
    'expirationDate',
    'cvv'
  ].includes(key)
}

const isValidationKey = (key: string): key is ValidationKey => {
  return [
    'loanAccount',
    'routing',
    'bankAccount',
    'confirmBankAccount',
    'card',
    'nameOnCard',
    'expirationDate',
    'cvv'
  ].includes(key)
}

export function Form() {
  const initialValues = useMemo<Values>(
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
  const [values, setValues] = useState<Values>(initialValues)
  const initialErrors = useMemo<Errors>(
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
  const [errors, setErrors] = useState<Errors>(initialErrors)

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = event.target
      if (isValuesKey(id)) {
        if (id === 'checking') {
          setValues({ ...values, checking: 'on', debitCard: '' })
        } else if (id === 'debitCard') {
          setValues({ ...values, debitCard: 'on', checking: '' })
        } else {
          setValues({ ...values, [id]: value })
        }
      }
    },
    [values]
  )

  const onBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      const { id, value } = event.target

      if (isValidationKey(id) && !validate[id](value)) {
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
    let newErrors = {
      ...initialErrors,
      loanAccount: !validate.loanAccount(loanAccount)
    }
    let request

    if (checking === 'on') {
      newErrors = {
        ...newErrors,
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
        ...newErrors,
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
            className={errors.loanAccount ? 'has-error' : ''}
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
          <span className={errors.loanAccount ? 'error-message' : 'hide'}>
            Loan Account Number is required
          </span>
        </div>
        <div className="split-container">
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
