import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface MyObject {
  children: ReactNode; // You can replace 'any' with a more specific type if known
  // other properties
}

class ErrorBoundary extends Component<MyObject, ErrorBoundaryState> {
  constructor(props: MyObject) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, info);
  }

  handleThrowError = () => {
    this.setState({ hasError: true });
    throw new Error('Test Error');
  };

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }

    return (
      <div className={'error-main'}>
        {this.props.children}
        <button className={'error-main-button'} onClick={this.handleThrowError}>
          Throw Error
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;
