import React from "react";
import ReactDOM from "react-dom";

interface Props {
  greeting: string;
}

class MainView extends React.Component<Props> {
  render() {
    return <div>{this.props.greeting}</div>;
  }
}

async function onLoad() {
  document.addEventListener("DOMContentLoaded", async event => {
    const response = await fetch("/api/hello");
    const result = await response.json();
    ReactDOM.render(
      <MainView greeting={result.hello} />,
      document.getElementById("container")
    );
  });
}

onLoad();