const FormInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  icon,
  required = false,
  autoComplete,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-900">
        {label}
      </label>
      <div className="relative mt-2">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base">
            {icon}
          </span>
        )}
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className={`input-field ${icon ? "pl-10" : ""}`}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;
