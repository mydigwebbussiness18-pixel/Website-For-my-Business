import { createClient } from "@supabase/supabase-js";
import { AppointmentBooking } from "../types";

// User provided credentials:
// Project ID: zrxedzbeowxylyxynrvk
// API Key: sb_publishable_OP76QK0AWCHa-jIK52Go3w_fJgrrrhj
export const SUPABASE_PROJECT_ID = "zrxedzbeowxylyxynrvk";
export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_OP76QK0AWCHa-jIK52Go3w_fJgrrrhj";

/**
 * Live Supabase client instance connected to Harshadsinh Solanki's DigWeb Expert project
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

export interface SupabaseHealthResult {
  connected: boolean;
  tableExists: boolean;
  message: string;
  error?: string;
  recordCount?: number;
}

/**
 * Checks connection status to Supabase and verifies whether the 'appointments' table is accessible.
 */
export async function checkSupabaseHealth(): Promise<SupabaseHealthResult> {
  try {
    const { data, error, count } = await supabase
      .from("appointments")
      .select("id", { count: "exact", head: true });

    if (error) {
      // Check if error is table not existing (PGRST204 or 42P01)
      const isMissingTable =
        error.code === "PGRST204" ||
        error.code === "42P01" ||
        error.message?.toLowerCase().includes("relation") ||
        error.message?.toLowerCase().includes("does not exist");

      if (isMissingTable) {
        return {
          connected: true,
          tableExists: false,
          message: "Connected to Supabase project, but the 'appointments' table needs to be created.",
          error: error.message
        };
      }

      return {
        connected: false,
        tableExists: false,
        message: `Supabase returned an error: ${error.message}`,
        error: error.message
      };
    }

    return {
      connected: true,
      tableExists: true,
      message: "Successfully connected to Supabase and verified 'appointments' table.",
      recordCount: count || 0
    };
  } catch (err: any) {
    return {
      connected: false,
      tableExists: false,
      message: "Could not reach Supabase endpoint. Check network connectivity.",
      error: err?.message
    };
  }
}

/**
 * Saves a new booking appointment directly to the Supabase 'appointments' table.
 */
export async function saveAppointmentToSupabase(
  booking: AppointmentBooking
): Promise<{ success: boolean; error?: string; data?: any }> {
  try {
    const payload = {
      id: booking.id,
      full_name: booking.fullName,
      business_name: booking.businessName || null,
      phone_number: booking.phoneNumber,
      email: booking.email || null,
      service: booking.interestedService,
      appointment_date: booking.appointmentDate || null,
      appointment_time: booking.appointmentTime || null,
      message: booking.message,
      status: booking.status || "pending",
      created_at: booking.submittedAt || new Date().toISOString()
    };

    const { data, error } = await supabase
      .from("appointments")
      .insert([payload])
      .select();

    if (error) {
      console.warn("Supabase insertion error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.warn("Exception inserting into Supabase:", err);
    return { success: false, error: err?.message || "Failed to insert into Supabase" };
  }
}

/**
 * Fetches all appointment bookings from Supabase ordered by newest first.
 */
export async function fetchAppointmentsFromSupabase(): Promise<{
  success: boolean;
  appointments: AppointmentBooking[];
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return { success: false, appointments: [], error: error.message };
    }

    const appointments: AppointmentBooking[] = (data || []).map((row: any) => ({
      id: row.id,
      fullName: row.full_name,
      businessName: row.business_name || "",
      phoneNumber: row.phone_number,
      email: row.email || "",
      interestedService: row.service,
      appointmentDate: row.appointment_date || "",
      appointmentTime: row.appointment_time || "",
      message: row.message || "",
      status: row.status || "pending",
      submittedAt: row.created_at,
      savedToSupabase: true
    }));

    return { success: true, appointments };
  } catch (err: any) {
    return { success: false, appointments: [], error: err?.message };
  }
}

/**
 * SQL Schema script to run in Supabase SQL editor if table is not yet initialized.
 */
export const SUPABASE_SETUP_SQL = `-- Run this in your Supabase SQL Editor:
-- Project: zrxedzbeowxylyxynrvk

CREATE TABLE IF NOT EXISTS public.appointments (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  business_name TEXT,
  phone_number TEXT NOT NULL,
  email TEXT,
  service TEXT NOT NULL,
  appointment_date TEXT,
  appointment_time TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow anonymous visitors to insert booking appointments
CREATE POLICY "Allow public inserts"
  ON public.appointments
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow reading appointments
CREATE POLICY "Allow public reads"
  ON public.appointments
  FOR SELECT
  TO anon
  USING (true);
`;
