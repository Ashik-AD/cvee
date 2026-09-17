import "./App.css";
import Layout from "./layout";
import ServicesProvider from "./context/Services";
import { Switch } from "wouter";

function App() {
  return (
    <Switch>
      <ServicesProvider>
        <Layout />
      </ServicesProvider>
    </Switch>
  );
}

export default App;
