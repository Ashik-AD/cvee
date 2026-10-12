import "./App.css";
import Layout from "./layout";
import ServicesProvider from "./context/Services";
import { Switch } from "wouter";
import { Toaster } from "./components/ui/toast";

function App() {
  return (
    <ServicesProvider>
      <Switch>
        <Layout />
      </Switch>
      <Toaster />
    </ServicesProvider>
  );
}

export default App;
