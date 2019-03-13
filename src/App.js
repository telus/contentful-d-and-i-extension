import React, { Component } from 'react'
import alex from 'alex'
import reporter from 'vfile-reporter'
import { init as initContentful } from 'contentful-ui-extensions-sdk'

import './App.css'

const report = vfile => reporter([vfile], { defaultName: '-' })

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      diReport: '',
      text: ''
    }
  }

  componentDidMount () {
    initContentful((extension) => {
      extension.window.startAutoResizer()
      const { field } = extension
      this.field = field
      this.setState({
        text: field.getValue()
      })
      this.detachValueChangeHandler = field.onValueChanged((value) => {
        this.setState({
          text: value || ''
        })
      })
    })
  }

  componentWillUnmount () {
    this.detachValueChangeHandler()
  }

  onChange = ({ target: { value } }) => {
    const vfile = alex.text(value)
    this.field.setValue(value)
    this.setState({
      diReport: report(vfile),
      text: value
    })
  }

  render () {
    const { diReport, text } = this.state
    return (
      <div className="cf-form-field">
        <input type="text" onChange={this.onChange} className="cf-form-input" value={text} />
        <div className="cf-form-hint">Diversity and Inclusion Report:</div>
        {diReport.split('\n').map(line => (
          <div key={line} className="cf-form-hint">
            {line}
          </div>
        ))}
      </div>
    )
  }
}

export default App
