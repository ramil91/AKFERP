import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="page page-center">
      <div className="container container-tight py-4">
        <div className="empty">
          <div className="empty-header">404</div>
          <p className="empty-title">Oops! Page not found.</p>
          <p className="empty-subtitle text-muted">
            The page you are looking for was not found. You may have mistyped the URL or the page has been moved.
          </p>
          <div className="empty-action">
            <Link to="/" className="btn btn-primary">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
