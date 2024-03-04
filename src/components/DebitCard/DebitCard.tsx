type DebitCardProps = {
  errors: {
    card: boolean
    nameOnCard: boolean
    expirationDate: boolean
    cvv: boolean
  }
  values: {
    card: string
    nameOnCard: string
    expirationDate: string
    cvv: string
  }
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void
}

export function DebitCard({
  errors,
  values,
  onChange,
  onBlur
}: DebitCardProps) {
  return (
    <>
      <div className="field">
        <label htmlFor="card" className={errors.card ? 'has-error' : ''}>
          Card Number
        </label>
        <input
          type="number"
          id="card"
          value={values.card}
          onChange={onChange}
          onBlur={onBlur}
        />
        <span className={errors.card ? 'error-message' : 'hide'}>
          Card Number is required
        </span>
      </div>
      <div className="field">
        <label
          className={errors.nameOnCard ? 'has-error' : ''}
          htmlFor="nameOnCard"
        >
          Name on Card
        </label>
        <input
          type="text"
          id="nameOnCard"
          value={values.nameOnCard}
          onChange={onChange}
          onBlur={onBlur}
        />
        <span className={errors.nameOnCard ? 'error-message' : 'hide'}>
          Name is required
        </span>
      </div>
      <div className="half-field">
        <div className="field">
          <label
            className={errors.expirationDate ? 'has-error' : ''}
            htmlFor="expirationDate"
          >
            Expiration Date
          </label>
          <input
            type="date"
            id="expirationDate"
            value={values.expirationDate}
            onChange={onChange}
            onBlur={onBlur}
          />
          <span className={errors.expirationDate ? 'error-message' : 'hide'}>
            Expiration Date is required
          </span>
        </div>
        <div className="field">
          <label className={errors.cvv ? 'has-error' : ''} htmlFor="cvv">
            CVV
          </label>
          <input
            type="number"
            id="cvv"
            value={values.cvv}
            onChange={onChange}
            onBlur={onBlur}
          />
          <span className={errors.cvv ? 'error-message' : 'hide'}>
            CVV is required
          </span>
        </div>
      </div>
    </>
  )
}
