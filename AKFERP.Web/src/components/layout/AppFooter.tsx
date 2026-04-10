export function AppFooter() {
  return (
    <footer className="footer footer-transparent d-print-none">
      <div className="container-xl">
        <div className="row text-center align-items-center flex-row-reverse">
          <div className="col-auto ms-auto">
            <span className="me-1">Powered by</span>
            <a href="https://tabler.io" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
              Tabler
            </a>
          </div>
          <div className="col-12 col-lg-auto mt-3 mt-lg-0">
            <span>&copy; {new Date().getFullYear()}{' '}</span>
            <a href="/" className="text-decoration-none">ALKHIDMAT</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
