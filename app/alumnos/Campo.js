export default function Campo({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  ...resto
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="rounded border border-gray-300 p-2"
        {...resto}
      />
    </label>
  );
}