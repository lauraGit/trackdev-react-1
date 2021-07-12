const BacklogHeadingSelector = ( { backlogs } ) => {

  if(backlogs === null) {
    return null
  }
  if(backlogs.length === 0) {
    return (<p>You don't have any backlogs to see here.</p>)
  }
  if(backlogs.length === 1) {
    return (<h3>Backlog {backlogs[0].id}</h3>)
  }
  return (
    <div>
      {
        backlogs.map(b => (<p>Backlog {b.id}</p>))
      }
    </div>
  )
}

export default BacklogHeadingSelector