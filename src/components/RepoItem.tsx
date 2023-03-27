import styled from 'styled-components';
import { Repo } from '../Repo';

const PostItem = styled.div`
  margin-bottom: 32px;
  border-bottom: 1px solid #555;
`;
const PostContent = styled.div`
  margin-bottom: 16px;
  & a {
    font-weight: 700;
    color: #333;
    &:hover {
      color: #555;
    }
  }
`;

const PostFooter = styled.div`
  display: flex;
  margin-bottom: 16px;
  justify-content: space-between;
  color: #555;
  align-items: flex-end;
  font-size: 12px;
  & a {
    color: #333;
    &:hover {
      color: #555;
    }
  }
`;

const UserSpan = styled.span`
  a {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 8px;
  }
`;

export default function RepoItem({ repo }: { repo: Repo }) {
  const {
    id,
    full_name,
    private: is_private,
    owner,
    html_url,
    description,
    created_at,
    language,
    license,
  } = repo;

  return (
    <PostItem key={id}>
      <PostContent>
        <a target="_blank" rel="noreferrer" href={html_url}>
          {full_name}
        </a>
        {[language, is_private ? 'Private' : 'Public', license?.name]
          .filter(Boolean)
          .map((content, index) => (
            <span key={index}>
              {' · '}
              <small>{content}</small>
            </span>
          ))}

        <p>{description}</p>
      </PostContent>
      <PostFooter>
        <UserSpan>
          <a target="_blank" rel="noreferrer" href={owner.url}>
            <img
              alt={owner.login}
              style={{ width: 30, height: 30 }}
              src={owner.avatar_url}
            />
            {owner.login}
          </a>
        </UserSpan>
        <span style={{ fontSize: 12 }}>
          Created: {new Date(created_at).toLocaleDateString()}
        </span>
      </PostFooter>
    </PostItem>
  );
}
