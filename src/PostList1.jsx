import { useQuery } from '@tanstack/react-query';
import { getPosts } from './api/posts';

function PostList1() {
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  if (postsQuery.status === 'loading') return <h1>Loading...</h1>;
  if (postsQuery.status === 'error') {
    return <pre>{JSON.stringify(postsQuery.error)}</pre>;
  }
  return (
    <div>
      <h1>Posts List 1</h1>
      <ol>
        {postsQuery.data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
}

export default PostList1;
