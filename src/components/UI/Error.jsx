import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorMessage: error.toString() });
    console.error("Error:", error, "Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong: {this.state.errorMessage}</h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
