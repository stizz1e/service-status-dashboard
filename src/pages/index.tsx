import { useEffect, useState } from 'react';
import type {ServiceStatus} from '@/types/status';


export default function Home() {
  const [statuses, setStatuses] = useState<ServiceStatus[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      setError(null);
      const res = await fetch("api/status");
      if (!res.ok) {
        throw new Error(`Server error ${res.status}`);
      }
      const data = await res.json();
      setStatuses(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setStatuses([]);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className="container py-5">
      <h1 className="mb-4">Service Status Dashboard</h1>
      <button className="btn btn-primary mb-3" onClick={fetchStatus}>
        Refresh Status
      </button>
      {error && (
        <div className="alert alert-danger" role="alert">
          Error fetching serivice status: {error}
        </div>
      )}
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <td>Service</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {statuses.map((s) => (
            <tr key={s.name}>
              <td>{s.name}</td>
              <td>
                <span
                  className={`badge ${
                    s.status === 'online'
                    ? 'bg-success'
                    : s.status === 'degraded'
                    ? 'bg-warning text-dark'
                    : 'bg-danger'
                  }`}
                >
                  {s.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}