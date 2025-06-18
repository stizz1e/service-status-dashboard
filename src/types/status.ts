export type StatusValue = 'online' | 'degraded' | 'offline';

export type ServiceStatus = {
    name: string;
    status: StatusValue;
};