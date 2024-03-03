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
}

export function DebitCard({ errors, values, onChange }: DebitCardProps) {
  return (
    <>
      <div className="field">
        <label htmlFor="card" className={errors.card ? 'error' : ''}>
          Card Number
        </label>
        <input
          type="number"
          maxLength={16}
          id="card"
          value={values.card}
          onChange={onChange}
        />
      </div>
      <div className="field">
        <label
          className={errors.nameOnCard ? 'error' : ''}
          htmlFor="nameOnCard"
        >
          Name on Card
        </label>
        <input
          type="text"
          id="nameOnCard"
          value={values.nameOnCard}
          onChange={onChange}
        />
      </div>
      <div className="half-field">
        <div className="field">
          <label
            className={errors.expirationDate ? 'error' : ''}
            htmlFor="expirationDate"
          >
            Expiration Date
          </label>
          <input
            type="date"
            id="expirationDate"
            value={values.expirationDate}
            onChange={onChange}
          />
        </div>
        <div className="field">
          <label className={errors.cvv ? 'error' : ''} htmlFor="cvv">
            CVV
          </label>
          <input
            type="number"
            maxLength={3}
            id="cvv"
            value={values.cvv}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  )
}
