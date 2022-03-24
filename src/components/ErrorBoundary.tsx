import React from "react";
import * as Title from "./Header/Title";
import Footer from "./Footer";
import AppContainer from "./App/ui/AppContainer";
import * as Main from "./App/ui/Main";
import TextTransition from "../transitions/TextTransition";

interface IErrorBoundaryProps {
  children: React.ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.setState({ hasError: true });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <AppContainer>
          <Main.Main>
            <div className="mt-48 px-16">
              <Title.Title>
                <Title.H1>
                  <TextTransition>BREADCHAIN</TextTransition>
                </Title.H1>
                <Title.H2>
                  <TextTransition>Crowdstaking</TextTransition>
                </Title.H2>
              </Title.Title>
              <span className="inline-block mt-12">
                There seems to be a problem but dont worry we're on it.
              </span>
            </div>
          </Main.Main>
          <Footer>heyy</Footer>
        </AppContainer>
      );
    }
    return this.props.children;
  }
}
