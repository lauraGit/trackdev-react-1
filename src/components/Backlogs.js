import { useState } from 'react'
import BacklogHeadingSelector from "./BacklogHeadingSelector"
import BacklogTasksList from './BacklogTasksList'

const Backlogs = ( { backlogs }) => {
  const firstBacklog = backlogs && backlogs.length > 0
                        ? backlogs[0]
                        : null
  const [ backlog, setBacklog ] = useState(firstBacklog)

  if(!backlog) {
    return (<p>There are no backlogs for this group.</p>)
  }
  return (
    <div className="children-bottom-space">
      <BacklogHeadingSelector backlogs={backlogs} selected={backlog}
                              onBacklogChange={(b) => setBacklog(b)} />
      <BacklogTasksList backlog={backlog} />
    </div>
  )
}

export default Backlogs