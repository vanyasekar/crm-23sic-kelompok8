export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-9xl font-extrabold text-yellow-500 mb-4">401</h1>
      <p className="text-2xl font-semibold mb-6">Unauthorized Access</p>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        You do not have permission to view this page. Please login or contact the administrator.
      </p>
      <a 
        href="/"
        className="px-6 py-3 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
      >
        Back to Home
      </a>
    </div>
  );
}
