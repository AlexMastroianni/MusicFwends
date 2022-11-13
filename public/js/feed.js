// Function to create new post
const newPostHandler = async (event) => {
  event.preventDefault();
  const postContent = document.querySelector('#post-content').value.trim();

  if (postContent) {
    const response = await fetch('/api/feed', {
      method: 'POST',
      body: JSON.stringify({ postContent }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/feed');
    } else {
      alert('Failed to create new post');
    }
  }
};

// Future function to implemented
// Function to create new comment
// const newCommentHandler = async (event) => {
//   event.preventDefault();

//   const commentContent = document
//     .querySelector('#comment-content')
//     .value.trim();

//   const authorId = document.querySelector('#author_id').value.trim();
//   const postId = document.querySelector('#post_id').value.trim();

//   if (commentContent && authorId && postId) {
//     const response = await fetch('/api/feed', {
//       method: 'POST',
//       body: JSON.stringify({ commentContent, authorId, postId }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     if (response.ok) {
//       document.location.replace('/feed');
//     } else {
//       alert('Failed to create new comment');
//     }
//   }
// };

// Function to delete post
const delButtonHandler = async (event) => {
  console.log(event.target);
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/feed/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      document.location.replace('/feed');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newPostHandler);

document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);
