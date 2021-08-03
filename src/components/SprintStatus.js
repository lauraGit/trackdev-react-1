import './sprint-status.css'

const SprintStatus = ( {status, isTitle} ) => {
  return (
    <span className={`sprint-status ${isTitle ? 'sprint-status--title' : ''}`}>({status})</span>
  )
}

export default SprintStatus