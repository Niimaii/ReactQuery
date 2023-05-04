import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostsPaginated } from './api/posts';

export function PostListInfinite() {
  const {
    status,
    error,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    // Returns what the next page is equal to
    getNextPageParam: (prevData) => prevData.nextPage,
    // pageParam is equal to the result of getNextPageParam. Here we set the default value as 1
    queryFn: ({ pageParam = 1 }) => getPostsPaginated(pageParam),
  });

  if (status === 'loading') return <h1>Loading...</h1>;
  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>;

  return (
    <>
      <h1>Post List Infinite</h1>
      {data.pages
        .flatMap((data) => data.posts)
        .map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
    </>
  );
}
