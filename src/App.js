import React, { Component } from 'react'
import alex from 'alex'
import reporter from 'vfile-reporter'

import './App.css'

const sampleText = 'With us on your side, you too can feel like a chairman of the board.  To boldly go where no man has gone before.  We pride ourselves on the workmanship of our products.  Damn, he\'ll love these prices.\nShe\'ll love that new phone!'

const report = vfile => reporter([vfile], { defaultName: '-' })

class App extends Component {
  constructor (props) {
    super(props)
    const vfile = alex.text(sampleText)
    this.state = {
      diReport: report(vfile),
      text: sampleText
    }
  }

  onChange = ({ target: { value } }) => {
    const vfile = alex.text(value)
    this.setState({
      diReport: report(vfile),
      text: value
    })
  }

  render () {
    const { diReport, text } = this.state
    return (
      <div>
        <div>
          <pre>
            <textarea style={{ fontSize: '14pt', width: '100%' }} onChange={this.onChange} value={text} />
          </pre>
        </div>
        <div>
          <pre>
            <code>{diReport}</code>
          </pre>
        </div>
      </div>
    )
  }
}

export default App
