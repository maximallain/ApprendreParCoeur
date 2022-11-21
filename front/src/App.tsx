import Content from "./components/layout/Content";
import Header from "./components/layout/Header";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <Header />
        <Content />
      </div>
    </QueryClientProvider>
  );
}

export default App;
