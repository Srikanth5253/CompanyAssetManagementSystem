const PageHeader = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>

      {children && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
};

export default PageHeader;