import Dropdown from 'react-bootstrap/Dropdown'

const BacklogHeadingSelector = ( { backlogs, selected, onBacklogChange } ) => {

  if(!backlogs || !selected) {
    return null
  }
  if(backlogs.length === 0) {
    return (<p>You don't have any backlogs to see here.</p>)
  }

  const selectedName = `Backlog ${selected.id}`
  
  if(backlogs.length === 1) {
    return (<h3>{selectedName}</h3>)
  }
  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-primary">
        {selectedName}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {
          backlogs.filter(b => b.id !== selected.id)
                  .map(b => (                  
                    <Dropdown.Item
                      key={b.id}
                      onClick={() => onBacklogChange(b)}>
                        Backlog {b.id}
                    </Dropdown.Item>
                  ))
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default BacklogHeadingSelector