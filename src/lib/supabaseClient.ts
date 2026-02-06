import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        '⚠️ Supabase environment variables not configured. ' +
        'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
    );
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
);

// Type definitions for database tables
export interface Lead {
    id?: string;
    email: string;
    current_bill: number;
    hvac_cost?: number;
    savings_estimate: number;
    annual_savings?: number;
    created_at?: string;
}

export interface Profile {
    id: string;
    nome?: string;
    email?: string;
    plano_status?: 'free' | 'basic' | 'business' | 'industrial';
    created_at?: string;
    updated_at?: string;
}
