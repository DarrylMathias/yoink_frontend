import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Logo } from "./Logo";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white font-sans text-center px-4">
          <div className="font-serif text-[60px] font-bold tracking-[-2px] mb-8 cursor-pointer" onClick={() => window.location.href = '/'}>
            <Logo isResultsPage={true} />
          </div>
          <h1 className="text-2xl font-bold text-[#D62121] mb-2">Oops! Our crawlers tripped.</h1>
          <p className="text-[#555] mb-6 max-w-lg">
            The Yoink search engine encountered an unexpected rendering error.
          </p>
          {this.state.error && (
            <div className="bg-[#f0f0f0] border border-[#d9d9d9] text-[#333] p-4 rounded text-sm text-left max-w-2xl overflow-auto w-full mb-6 font-mono">
              <strong>Error Details:</strong><br />
              {this.state.error.toString()}
            </div>
          )}
          <button
            className="bg-[#e5e5e5] border border-[#999999] font-sans text-[13px] font-bold px-4 py-2 cursor-pointer text-black active:border-inset hover:bg-gray-200 transition-colors"
            onClick={() => window.location.href = '/'}
          >
            Return to Yoink Search
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
