import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: +50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-slate-900 text-white p-4 fixed bottom-0 w-full z-20"
    >
      <p>© 2024 Team AMS - All rights reserved</p>
    </motion.footer>
  );
}
