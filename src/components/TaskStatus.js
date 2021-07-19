import Badge from 'react-bootstrap/Badge'

const TaskStatus = ( {status} ) => {
  let color = "light"
  switch (status) {
    case "CREATED":
      color = "light";
      break;
    case "TODO": 
      color = "info";
      break;
    case "INPROGRESS":
      color = "warning";
      break;
    case "TESTED":
    case "DONE":
      color = "success";
      break;
    case "DELETED":
      color = "dark";
      break;
  }

  return (<Badge variant={color}>{status}</Badge>)
}

export default TaskStatus