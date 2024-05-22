export type AppointmentListItemType = {
  client_id: string | null;
  created_at: string | null;
  created_by: string | null;
  date: string | null;
  id: string;
  name: string | null;
  professional_id: string | null;
  services: {
    duration: number | null;
    id: string;
    service_name: string | null;
  } | null;
  starts_at: string | null;
  ends_at: string | null;
  workspace_id: string | null;
};
