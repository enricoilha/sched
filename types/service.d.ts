

export interface ServiceType {
  id: string;
  user_id: string;
  service_name: string;
  duration: number;
  price: number;
  description?: string;
  disabled: boolean;
}
