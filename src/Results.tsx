import React from 'react';

interface Result {
  name: string;
  description: string;
}

interface ResultsProps {
  results: Result[];
}

class Results extends React.Component<ResultsProps> {
  render() {
    const { results } = this.props;

    return (
      <div>
        {results.map((result, index) => (
          <div className={'results-box-inner'} key={index}>
            <h3>{result.name}</h3>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Results;
