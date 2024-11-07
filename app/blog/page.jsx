import FirstBlog from '@/components/FirstBlog';
import OtherBlogs from '@/components/OtherBlogs';

async function fetchBlogs() {
  try {
    const res = await fetch('http://localhost:3000/api/blog', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

const Blog = async () => {
  const blogs = await fetchBlogs();
  const otherBlogs = blogs?.length > 0 && blogs.slice(1);
  const firstBlog = blogs && blogs[0];

  return (
    <div>
      {blogs?.length > 0 ? (
        <>
          <div className="container">
            <h2 className="text-center my-10">
              <span className="text-primaryColor">Trending </span> Blog
            </h2>

            <FirstBlog firstBlog={firstBlog} />
            <OtherBlogs otherBlogs={otherBlogs} />
          </div>
        </>
      ) : (
        <h3>No blogs...</h3>
      )}
    </div>
  );
};

export default Blog;
