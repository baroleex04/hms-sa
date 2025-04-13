// ErrorBoundary.tsx
import React from "react";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error: any;
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong: {this.state.error?.message}</h2>;
    }

    return this.props.children;
  }
}
