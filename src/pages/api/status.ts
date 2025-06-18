import type {NextApiRequest, NextApiResponse} from 'next';
import type { ServiceStatus, StatusValue} from '@/types/status';


const serviceNames = ['API Gateway', 'Database', 'Auth Service', 'Payment Processor']

function getRandomStatus(): StatusValue {
    const roll = Math.random();
    if(roll < 0.7) return 'online';
    if(roll < 0.9) return 'degraded';
    return 'offline';
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ServiceStatus[]>
){
    console.log(`[Datadog] GET /api/status at ${new Date().toISOString()}`);
    const statuses = serviceNames.map(name => ({
        name,
        status: getRandomStatus()
    }));
    res.status(200).json(statuses);
}