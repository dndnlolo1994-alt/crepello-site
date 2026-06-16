import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section">
      <div className="section-inner">
        <span className="section-kicker">404</span>
        <h1 className="section-heading">Page not found</h1>
        <p className="section-copy">The requested Crepello page does not exist.</p>
        <div className="button-row" style={{ marginTop: 24 }}>
          <Link className="dark-button" href="/">
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
