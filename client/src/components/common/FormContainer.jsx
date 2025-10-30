function FormContainer({ title, children, onSubmit }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-700">
        <h1 className="text-3xl font-bold text-center text-cyan-400 mb-6">
          {title}
        </h1>
        <form onSubmit={onSubmit} className="space-y-5">
          {children}
        </form>
      </div>
    </div>
  );
}

export default FormContainer;
