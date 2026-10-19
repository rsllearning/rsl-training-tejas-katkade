import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null })
    if (this.props.onReset) {
      this.props.onReset()
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        if (typeof this.props.fallback === 'function') {
          return this.props.fallback({
            error: this.state.error,
            resetErrorBoundary: this.resetErrorBoundary,
          })
        }
        return this.props.fallback
      }

      return (
        <div className="error-box">
          <div className="error-icon">⚠️</div>
          <h3 className="error-title">Unable to Load Products</h3>
          <p className="error-message">
            {this.state.error?.message || 'An unexpected error occurred while fetching product data.'}
          </p>
          <button
            onClick={this.resetErrorBoundary}
            className="btn btn-primary"
            type="button"
          >
            Retry Loading
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
