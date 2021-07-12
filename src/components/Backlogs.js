import { useState } from 'react'
import BacklogHeadingSelector from "./BacklogHeadingSelector"
import BacklogTasksList from './BacklogTasksList'

const Backlogs = ( { backlogs }) => {
  const defaultBacklog = backlogs && backlogs.length > 0
                        ? backlogs[0]
                        : null
  const [ currentBacklog, setCurrentBacklog ] = useState(defaultBacklog)

  if(!defaultBacklog) {
    return (<p>There are no backlogs for this group.</p>)
  }
  return (
    <div>
      <BacklogHeadingSelector backlogs={backlogs} selected={currentBacklog} />
      <BacklogTasksList backlog={currentBacklog} />
    </div>
  )
}

export default Backlogs