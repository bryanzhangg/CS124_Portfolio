import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <small>© {new Date().getFullYear()} Bryan Zhang. All rights reserved.</small>
    </footer>
  );
}
