/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
declare module '*.geojson' { const value: any; export default value; }
declare module 'leaflet.markercluster';

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
}

declare namespace App {
  interface Locals {
    supabase: import('@supabase/supabase-js').SupabaseClient | null;
    user: import('@supabase/supabase-js').User | null;
    member: import('./lib/forum').Member | null;
  }
}
