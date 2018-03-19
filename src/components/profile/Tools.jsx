import React from 'react'

import tools from './toolList'

const toolItem = name => (
  <div key={name} className="mr-1 mb-1 badge badge-secondary badge-pill">
    {name}
  </div>
)

export default () => (
  <div>
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <h2 className="section-heading text-center">Tools</h2>
          <hr className="border-white" />
          <p>
            I am a bit picky about the tools I use. Actually, I am{' '}
            <b>very picky</b>. I cannot remember how many times I did rewrite my
            shell config in the past. It is problematic for pair programming
            because I usually am the only one that can work at my computer.
          </p>

          <p>
            Nowadays I try to at least outsource my configurations a bit, using
            some awesome community driven ones like{' '}
            <a href="http://spacemacs.org">Spacemacs</a> and{' '}
            <a href="https://github.com/robbyrussell/oh-my-zsh">Oh My Zsh</a>
          </p>
        </div>
      </div>
    </div>

    <div className="container">
      <div className="row text-center">
        <div className="col-lg-12">{tools.map(tool => toolItem(tool))}</div>
      </div>
    </div>
  </div>
)
