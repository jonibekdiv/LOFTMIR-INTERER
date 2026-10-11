export default function Loading() {
  return (
    <div className="container-x flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-graphite-200 border-t-petrol-600" />
        <p className="text-sm text-graphite-500">Yuklanmoqda...</p>
      </div>
    </div>
  );
}
