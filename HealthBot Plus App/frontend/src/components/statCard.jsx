const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-full text-center">
      <p className="text-sm font-semibold text-gray-600 whitespace-nowrap">
        {title}
      </p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

export default StatCard;
