export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      keywords: {
        Row: {
          id: string;
          keyword: string;
          search_volume: number | null;
          competition: string | null;
          avg_price: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          keyword: string;
          search_volume?: number | null;
          competition?: string | null;
          avg_price?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          keyword?: string;
          search_volume?: number | null;
          competition?: string | null;
          avg_price?: number | null;
          updated_at?: string;
        };
      };
      keyword_trends: {
        Row: {
          id: string;
          keyword: string;
          time_unit: string;
          months: number;
          raw_data: Json;
          trend_data: Json;
          fetched_at: string;
          expires_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          keyword: string;
          time_unit?: string;
          months?: number;
          raw_data: Json;
          trend_data?: Json;
          fetched_at?: string;
          expires_at?: string;
          created_at?: string;
        };
        Update: {
          raw_data?: Json;
          trend_data?: Json;
          fetched_at?: string;
          expires_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          display_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
