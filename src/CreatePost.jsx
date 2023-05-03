import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { createPost } from './api/posts';
import Post from './Post';

export default function CreatePost({ setCurrentPage }) {
  const titleRef = useRef();
  const bodyRef = useRef();
  const queryClient = useQueryClient();
  const createPostMutation = useMutation({
    mutationFn: (variables) => {
      createPost(variables);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    createPostMutation.mutate({
      title: titleRef.current.value,
      body: bodyRef.current.value,
    });
  }

  return (
    <div>
      {createPostMutation.isError && JSON.stringify(error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title</label>
          <input id='title' ref={titleRef} />
        </div>
        <div>
          <label htmlFor='body'>Body</label>
          <input id='body' ref={bodyRef} />
        </div>
        <button disabled={createPostMutation.isLoading}>
          {createPostMutation.isLoading ? 'Loading...' : 'Create'}
        </button>
      </form>
    </div>
  );
}
