import SprintHistory from './SprintHistory';

const SprintsHistory = ({ backlogId, sprints }) => {
  return (
    <div>
        {sprints.map((sprint) => 
          (
            <SprintHistory key={sprint.id} backlogId={backlogId} sprint={sprint} />
          )
        )}
    </div>
  )
}

export default SprintsHistory