import React from 'react'

export default class CommentFormComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
  }
  onChange(e) {
    this.setState({comment: e.target.value})
  }
  onClick() {
    this.props.createComment(this.state.comment)
    this.setState({comment: ''})
  }
  render() {
    return (
      <div>
        <textarea className="comment"  onChange={this.onChange} value={this.state.comment}></textarea>
        <button onClick={this.onClick}>add comment</button>
      </div>
  )
  }
}
