function FormError({ message }) {
  if (!message) return null;
  return <p className="text-red-400 text-sm text-center">{message}</p>;
}

export default FormError;
