import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Sidebar } from "@/components/Sidebar";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Graveyard from "@/pages/Graveyard";
import Changelog from "@/pages/Changelog";
import Articles from "@/pages/Articles";
import About from "@/pages/About";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/graveyard" component={Graveyard} />
      <Route path="/changelog" component={Changelog} />
      <Route path="/articles" component={Articles} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 ml-56">
          <Router />
        </div>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
