export interface PortalUser {
  id: string;
  full_name: string;
  email: string;
  school: string;
  department: string;
  graduation_year: string;
  profile_photo: string | null;
  slug: string;
  payment_status: "pending" | "paid";
  created_at: string;
}

export interface PortalMessage {
  id: string;
  user_id: string;
  sender_name: string;
  relationship: string;
  message: string;
  created_at: string;
}

export interface PortalPayment {
  id: string;
  user_id: string;
  amount: number;
  status: "pending" | "success" | "failed";
  reference: string;
  created_at: string;
}
