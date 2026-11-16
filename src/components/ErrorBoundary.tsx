import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Top-level React Error Boundary ensuring graceful recovery
 * without blank screens on production Netlify deployments.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Application rendering error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-[#0B132B] text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#102A56] border border-[#3B82F6]/30 rounded-2xl p-8 text-center space-y-4 shadow-2xl">
            <h1 className="text-xl font-bold tracking-tight">DigWeb Expert</h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              A temporary display issue occurred while loading this view. Please refresh the page to continue.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
