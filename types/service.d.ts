

export interface ServiceType {
    user_id: string;
    service_name: string;
    duration: number;
    price: number;
    description?: string;
    disabled: boolean;
}