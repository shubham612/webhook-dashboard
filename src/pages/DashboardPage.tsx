export default function DashboardPage() {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>
  
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Total Webhooks</p>
            <h2 className="text-3xl font-bold mt-2">12</h2>
          </div>
  
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Deliveries</p>
            <h2 className="text-3xl font-bold mt-2">542</h2>
          </div>
  
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Retries</p>
            <h2 className="text-3xl font-bold mt-2">32</h2>
          </div>
  
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Dead Letters</p>
            <h2 className="text-3xl font-bold mt-2">4</h2>
          </div>
        </div>
      </div>
    );
  }