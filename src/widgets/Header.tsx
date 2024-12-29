import React from 'react';
import { motion } from 'framer-motion';
import { RoutineGamifier } from '@shared/types/RoutineGamifier';

interface Props {
  coins: RoutineGamifier.Coins
}

const Header: React.FC<Props> = ({ coins }) => (
  <header className="flex backdrop-blur-md sticky top-0 p-2 flex-wrap gap-2 justify-between items-center w-full max-w-4xl mb-8">
    <h1 className="text-3xl font-bold">RoutineGamifier</h1>
    <div className="flex items-center bg-gray-800 py-2 px-4 rounded-lg">
      <span className="text-lg mr-2">
        Забавки:
        </span>
      <motion.div
        key={coins}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-bold text-yellow-300 flex items-center gap-2"
      >
        {coins}
        <img width="34" height="34" src="/RoutineGamifier/icons/coin-1.svg" alt="" />
      </motion.div>
    </div>
  </header>
);

export default Header;