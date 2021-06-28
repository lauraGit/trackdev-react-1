import './multi-list-input.css';
import { useState } from 'react'
import Button from 'react-bootstrap/Button'

const MultiListInput = ({ id, values, onValuesChange, possibleValues }) => {
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
            list={`${id}--datalist`}
            />
        <Button type="button"
          className="multi-list-input__button"
          onClick={handleAddClick}
          variant="outline-primary">
            +
        </Button>
      </div>
      {
        id && possibleValues
          ? (
          <datalist id={`${id}--datalist`}>
            { possibleValues.map(value => (<option key={value} value={value}></option>)) }
          </datalist>
          )
          : null
      }
    </div>
  )

}

export default MultiListInput