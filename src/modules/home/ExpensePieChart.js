import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#d32f2f", "#009900"];

const ExpensePieChart = ({ income, expense }) => {
  const data = [
    { name: "Expense", value: expense },
    { name: "Income", value: income },
  ];

  const hasData = income > 0 || expense > 0;
  return (
    <motion.div
      style={{ width: "100%", maxWidth: 400, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 16, minHeight: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', border: '1px solid #bbb', letterSpacing: '-0.5px' }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
    >
      {hasData ? (
        <>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#000"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#fff', color: '#000', border: '1px solid #000' }} itemStyle={{ color: '#000' }} />
              <Legend wrapperStyle={{ color: '#000' }} />
            </PieChart>
          </ResponsiveContainer>
          {/* Bar Chart for additional visualization */}
          {(income > 0 || expense > 0) && (
            <div style={{ marginTop: 32, width: '100%' }}>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#000" />
                  <XAxis dataKey="name" stroke="#000" />
                  <YAxis stroke="#000" />
                  <Tooltip contentStyle={{ background: '#fff', color: '#000', border: '1px solid #000' }} itemStyle={{ color: '#000' }} />
                  <Legend wrapperStyle={{ color: '#000' }} />
                  <Bar dataKey="value" fill="#000" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      ) : (
        <span style={{ color: '#000', fontSize: 18, opacity: 0.7, letterSpacing: '-0.5px' }}>No data now</span>
      )}
    </motion.div>
  );
};

export default ExpensePieChart;
