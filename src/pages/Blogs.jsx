
import BlogGrid from '../components/blog/BlogGrid';
import { blogList } from '../data/blogs';

export default function Blogs() {
  const posts = blogList(); // en el futuro: GET API/mockable

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
