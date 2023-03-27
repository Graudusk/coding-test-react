import styled from 'styled-components';
import './App.css';
import { Repo } from './Repo';
import LoadingIcon from './components/LoadingIcon';
import RepoItem from './components/RepoItem';
import useGithubAPI from './useGithubAPI';

const Wrapper = styled.section({
  height: '100vh',
  overflowX: 'hidden',
  overflowY: 'auto',
});

const Input = styled.input({
  padding: '8px 12px',
  margin: '0 auto',
  width: 300,
  borderRadius: 30,
});

const ItemList = styled.section({
  padding: '64px 0',
  margin: '0 auto',
  paddingBottom: 320,
  width: 600,
});

const PageButtons = styled.section({
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  paddingBottom: 320,

  '& button': {
    cursor: 'pointer',
    borderRadius: '8px',
    padding: '4px 8px',
  },
});

const Header = styled.header({
  '& h1': {
    fontFamily: 'Ubuntu Mono',
    fontWeight: 500,
    textAlign: 'center',
    fontSize: '3rem',
    padding: '1rem',
    display: 'block',
  },
});

const Footer = styled.footer({
  position: 'fixed',
  left: 16,
  bottom: 16,
  '& a': {
    color: '#333',
    '&:hover': {
      color: '#555',
    },
  },
});

function App() {
  const {
    loading,
    data,
    searchTerm,
    setSearchTerm,
    setPage,
    page,
    areMoreResults,
  } = useGithubAPI();

  return (
    <Wrapper>
      <Header>
        <h1>Github Search</h1>
      </Header>
      <div style={{ textAlign: 'center' }}>
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
        />
      </div>
      <ItemList>
        {data.map((repo: Repo, index) => (
          <RepoItem key={index} repo={repo} />
        ))}
        {loading && <LoadingIcon />}
        {data.length > 0 && (
          <PageButtons>
            <button
              disabled={page === 1 || loading}
              onClick={() => setPage(page - 1)}
            >
              Previous page
            </button>
            {areMoreResults && (
              <button
                disabled={!areMoreResults || loading}
                onClick={() => setPage(page + 1)}
              >
                Next page
              </button>
            )}
          </PageButtons>
        )}
      </ItemList>
      <Footer>
        <p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/graudusk"
          >
            github.com/graudusk
          </a>
        </p>
        <p>Made by: Eric Johansson 2023</p>
      </Footer>
    </Wrapper>
  );
}

export default App;
