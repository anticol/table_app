import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UsersTable } from './components/UsersTable';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserDetailPage } from './components/UserDetail';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Wrapper>
        <Router>
          <Routes>
            <Route path="/" element={<UsersTable />} />
            <Route path="/users/:userId" element={<UserDetailPage />} />
          </Routes>
        </Router>
      </Wrapper>
    </QueryClientProvider>
  );
}

export default App;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;

  @media (max-width: 600px) {
    padding: 16px;
  }
`;
