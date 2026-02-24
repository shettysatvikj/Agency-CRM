import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ChartsPanel = ({ analytics }) => {
  if (!analytics) return null;
  const { charts } = analytics;

  const bySourceLabels = charts.bySource.map((x) => x._id);
  const bySourceData = charts.bySource.map((x) => x.count);

  const byStatusLabels = charts.byStatus.map((x) => x._id);
  const byStatusData = charts.byStatus.map((x) => x.count);

  const byDateLabels = charts.byDate.map((x) => x._id);
  const byDateData = charts.byDate.map((x) => x.count);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mt-6">
      
      {/* Leads by Source */}
      <motion.div
        variants={cardVariant}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300"
      >
        <h3 className="text-base sm:text-lg font-semibold text-blue-700 mb-4">
          🚀 Leads by Source
        </h3>

        <div className="h-[200px] sm:h-[220px] md:h-[240px]">
          <Bar
            data={{
              labels: bySourceLabels,
              datasets: [
                {
                  label: 'Leads',
                  data: bySourceData,
                  backgroundColor: '#3b82f6',
                  borderRadius: 8,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
            }}
          />
        </div>
      </motion.div>

      {/* Leads by Status */}
      <motion.div
        variants={cardVariant}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300"
      >
        <h3 className="text-base sm:text-lg font-semibold text-indigo-700 mb-4">
          📊 Leads by Status
        </h3>

        <div className="h-[200px] sm:h-[220px] md:h-[240px]">
          <Pie
            data={{
              labels: byStatusLabels,
              datasets: [
                {
                  data: byStatusData,
                  backgroundColor: [
                    '#e5e7eb',
                    '#60a5fa',
                    '#34d399',
                    '#22c55e',
                    '#f97316',
                  ],
                  borderWidth: 0,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </motion.div>

      {/* Leads Over Time */}
      <motion.div
        variants={cardVariant}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300"
      >
        <h3 className="text-base sm:text-lg font-semibold text-purple-700 mb-4">
          📈 Leads Over Time (30 Days)
        </h3>

        <div className="h-[200px] sm:h-[220px] md:h-[240px]">
          <Line
            data={{
              labels: byDateLabels,
              datasets: [
                {
                  label: 'Leads',
                  data: byDateData,
                  fill: true,
                  backgroundColor: 'rgba(99,102,241,0.15)',
                  borderColor: '#6366f1',
                  tension: 0.4,
                  pointBackgroundColor: '#6366f1',
                  pointRadius: 3,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ChartsPanel;