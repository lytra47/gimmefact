import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wdwbkshflemffdbevipb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indkd2Jrc2hmbGVtZmZkYmV2aXBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU0NjkyODQsImV4cCI6MjAyMTA0NTI4NH0.qsZH7NdUtxgluNMw7-UcKoXZwmAJyXnUMiUmoFUAFhg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
