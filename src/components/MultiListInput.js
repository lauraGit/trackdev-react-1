import './multi-list-input.css';
import { useState } from 'react'

const MultiListInput = ({ values, onValuesChange }) => {
  const [ newValue, setNewValue ] = useState('')

  function handleInnerInputChange(e) {
    setNewValue(e.target.value)
  }

  function handleAddClick() {
    const alreadyAdded = values.some(value => value === newValue)
    if(!alreadyAdded) {
      let newValues = values.concat([ newValue ])
      setNewValue('')
      onValuesChange(newValues)
    }
  }

  function handleDeleteClick(value) {
    let newValues = values.filter(x => x !== value)
    onValuesChange(newValues)
  }

  if(!values) {
    values = []
  }

  return (
    <div className="multi-list-input">
      <div className="multi-list-input__chips">
        {
          values.map(value => (
            <span className="multi-list-input__chip" key={value}>
              <span>{value}</span>
              <button type="button"
                className="multi-list-input__button" 
                onClick={() => handleDeleteClick(value)}>
                  X
              </button>
            </span>
          ))
        }
      </div>
      <div className="multi-list-input__wrapper">
        <input type="text" value={newValue}
            className="multi-list-input__input"
            onChange={handleInnerInputChange}
            />
        <button type="button"
          className="multi-list-input__button"
          onClick={handleAddClick}>
            +
        </button>
      </div>
    </div>
  )

}

export default MultiListInput