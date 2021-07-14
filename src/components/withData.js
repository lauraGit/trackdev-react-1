import { Component } from 'react'

const withData = (WrappedComponent, propName, getData) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null
      }
      this.handleDataTouched = this.handleDataTouched.bind(this)
    }

    componentDidMount() {
      this.updateWithData()
    }

    componentDidUpdate(prevProps) {
      if(this.props !== prevProps) {
        this.updateWithData()
      }
    }

    handleDataTouched() {
      this.updateWithData()
    }

    updateWithData() {
      getData(this.props)
        .then(data => this.setState({ data: data }))
        .catch(error => {})
    }

    render() {
      const newProps = { ...this.props }
      newProps[propName] = this.state.data
      newProps.onDataTouched = this.handleDataTouched
      return <WrappedComponent {...newProps} />
    }
  }
}

export default withData