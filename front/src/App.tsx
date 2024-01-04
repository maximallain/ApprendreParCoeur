import Content from "./components/layout/Content";
import Header from "./components/layout/Header";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Content />
    </QueryClientProvider>
  );
}

export default App;
