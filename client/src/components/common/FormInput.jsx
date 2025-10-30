function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="mb-2 font-medium text-gray-200">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-gray-500 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
    </div>
  );
}

export default FormInput;
