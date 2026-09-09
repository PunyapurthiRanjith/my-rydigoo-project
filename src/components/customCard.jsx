import { formatCurrency } from "../utils/fareCalculator";

const CustomCardComponent = ({ image, cardTitle, text, baseFare, perKm }) => {
  return (
    <div className="group max-w-sm overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="overflow-hidden">
        <img
          className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
          src={image}
          alt={cardTitle}
        />
      </div>
      <div className="p-6">
        <h5 className="text-xl font-bold text-gray-900">{cardTitle}</h5>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{text}</p>
        {baseFare && (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-teal-50 px-4 py-2">
            <span className="text-xs font-medium uppercase tracking-wide text-teal-700">
              Starting at
            </span>
            <span className="font-bold text-teal-800">
              {formatCurrency(baseFare)} + {formatCurrency(perKm)}/km
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomCardComponent;
