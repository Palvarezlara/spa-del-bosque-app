import { use, useEffect, useState } from 'react';
import BlogGrid from '../components/blog/BlogGrid';
import { getBlogs } from '../data/api';  
import { blogList } from '../data/blogs';

export default function Blogs() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getBlogs().then(data => setPosts(data.blogs ?? []))
      .catch(() => setPosts(blogList() ?? []));
  }, []);

  return (
    <>
      <header className="py-5 bg-light border-bottom">
        <div className="container">
          <h1 className="display-6">Blog de bienestar</h1>
          <p className="lead mb-0">Consejos, rutinas y novedades para cuidarte cuerpo y mente.</p>
        </div>
      </header>

      <main className="py-5">
        <div className="container">
          <BlogGrid posts={posts} />
        </div>
      </main>
    </>
  );
}
