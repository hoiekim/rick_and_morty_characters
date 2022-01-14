import React from "react";

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log("error: " + error);
    console.log("errorInfo: " + JSON.stringify(errorInfo));
    console.log("componentStack: " + errorInfo.componentStack);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <h3 className="error">Something went wrong!</h3>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
