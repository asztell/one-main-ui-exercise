type CheckingProps = {
  errors: {
    routing: boolean
    bankAccount: boolean
    confirmBankAccount: boolean
  }
  values: {
    routing: string
    bankAccount: string
    confirmBankAccount: string
  }
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void
}

export function Checking({ errors, values, onChange, onBlur }: CheckingProps) {
  return (
    <>
      <div className="field">
        <label htmlFor="routing" className={errors.routing ? 'has-error' : ''}>
          Routing Number
        </label>
        <input
          type="number"
          id="routing"
          value={values.routing}
          onChange={onChange}
          onBlur={onBlur}
        />
        <span className={errors.routing ? 'error-message' : 'hide'}>
          Routing Number is required
        </span>
      </div>
      <div className="field">
        <label
          htmlFor="bankAccount"
          className={errors.bankAccount ? 'has-error' : ''}
        >
          Bank Account Number
        </label>
        <input
          type="number"
          id="bankAccount"
          value={values.bankAccount}
          onChange={onChange}
          onBlur={onBlur}
        />
        <span className={errors.bankAccount ? 'error-message' : 'hide'}>
          Bank Account Number is required
        </span>
      </div>
      <div className="field">
        <label
          htmlFor="confirmBankAccount"
          className={errors.confirmBankAccount ? 'has-error' : ''}
        >
          Confirm Bank Account Number
        </label>
        <input
          type="number"
          id="confirmBankAccount"
          value={values.confirmBankAccount}
          onChange={onChange}
          onBlur={onBlur}
        />
        <span className={errors.confirmBankAccount ? 'error-message' : 'hide'}>
          Confirm Bank Account Number is required
        </span>
      </div>
    </>
  )
}
