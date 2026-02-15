import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function TransactionCard({ name, amount, date, type, category }) {
  const isReceived = type === 'received';
  const numAmount = parseFloat(amount);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isReceived ? 'bg-green-100' : 'bg-gray-100'
          }`}>
            {isReceived ? (
              <ArrowDownLeft className="text-green-600" size={20} />
            ) : (
              <ArrowUpRight className="text-gray-600" size={20} />
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{name}</p>
            <p className="text-sm text-gray-500">{date}</p>
            {category && (
              <span className="inline-block mt-1 px-2 py-0.5 bg-purple-50 text-purple-600 text-xs rounded-full">
                {category}
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className={`font-bold text-lg ${
            isReceived ? 'text-green-600' : 'text-gray-800'
          }`}>
            {isReceived ? '+' : '-'}S/ {Math.abs(numAmount).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}