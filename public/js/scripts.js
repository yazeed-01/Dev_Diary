
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
})


function deletePost(postId) {
    fetch(`/posts/${postId}/delete`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        console.log('Post deleted successfully');
        window.location.href = '/';
        // (Your code to remove the post from the UI)
      } else {
        console.error('Failed to delete post');
      }
    })
    .catch(error => {
      console.error('Error deleting post:', error);
    });
  }
  

