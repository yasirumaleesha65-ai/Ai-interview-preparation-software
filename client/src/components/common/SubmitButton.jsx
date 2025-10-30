function SubmitButton({ label, loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full py-3 rounded-lg font-semibold transition ${
        loading
          ? "bg-cyan-700 cursor-not-allowed"
          : "bg-cyan-500 hover:bg-cyan-400 text-slate-900"
      }`}
    >
      {loading ? "Processing..." : label}
    </button>
  );
}

export default SubmitButton;
