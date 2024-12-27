import { motion } from 'framer-motion';

const Header = ({ coins }) => (
  <header className="flex flex-wrap gap-2 justify-between items-center w-full max-w-4xl mb-8">
    <h1 className="text-3xl font-bold">RoutineGamifier</h1>
    <div className="flex items-center bg-gray-800 py-2 px-4 rounded-lg">
      <span className="text-lg mr-2">Coins:</span>
      <motion.div
        key={coins}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-bold text-yellow-300"
      >
        {coins}
      </motion.div>
    </div>
  </header>
);

export default Header;