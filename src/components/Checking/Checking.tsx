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
}

export function Checking({ errors, values, onChange }: CheckingProps) {
  return (
    <>
      <div className="field">
        <label htmlFor="routing" className={errors.routing ? 'error' : ''}>
          Routing Number
        </label>
        <input
          type="number"
          maxLength={9}
          id="routing"
          value={values.routing}
          onChange={onChange}
        />
      </div>
      <div className="field">
        <label
          htmlFor="bankAccount"
          className={errors.bankAccount ? 'error' : ''}
        >
          Bank Account Number
        </label>
        <input
          type="number"
          maxLength={10}
          id="bankAccount"
          value={values.bankAccount}
          onChange={onChange}
        />
      </div>
      <div className="field">
        <label
          htmlFor="confirmBankAccount"
          className={errors.confirmBankAccount ? 'error' : ''}
        >
          Confirm Bank Account Number
        </label>
        <input
          type="number"
          maxLength={10}
          id="confirmBankAccount"
          value={values.confirmBankAccount}
          onChange={onChange}
        />
      </div>
    </>
  )
}
