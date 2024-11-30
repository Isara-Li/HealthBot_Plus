const StatCard = ({ title, value }) => {
  return (
    <div className="bg-gray-200 shadow-lg rounded-lg p-4 w-full sm:w-60 md:w-72 lg:w-80 text-center">
      <p className="text-sm font-semibold text-gray-600 whitespace-nowrap">{title}</p>
      <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

export default StatCard;
