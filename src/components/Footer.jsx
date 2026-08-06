import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p className="site-footer-logo">
          Online<span>Mall</span>
        </p>
        <p className="site-footer-year">© {new Date().getFullYear()} Online Mall</p>
      </div>
    </footer>
  );
}

export default Footer;
