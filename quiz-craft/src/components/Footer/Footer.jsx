import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white p-4 fixed bottom-0 w-full z-20">
      <div className="flex justify-between items-center">
        <p>© 2024 Team 4 - All rights reserved</p>
        <Link to="/about" className="text-primary font-bold">About us</Link>
      </div>
    </footer>
  );
}
