import BlogCard from './BlogCard';

export default function BlogGrid({ posts = [] }) {
  return (
    <div className="row g-4">
      {posts.map(p => (
        <div key={p.id} className="col-12 col-md-6 col-lg-4">
          <BlogCard post={p} />
        </div>
      ))}
    </div>
  );
}
