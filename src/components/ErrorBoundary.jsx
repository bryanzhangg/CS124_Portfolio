import { Component } from "react";
import ErrorPage from "../pages/ErrorPage";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Portfolio rendering error:", error, info);
  }

  render() {
    return this.state.hasError ? <ErrorPage unexpected /> : this.props.children;
  }
}
