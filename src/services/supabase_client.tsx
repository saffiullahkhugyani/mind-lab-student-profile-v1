import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wdyyehmthhtxhtkktlfc.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkeXllaG10aGh0eGh0a2t0bGZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwMzcyOTUsImV4cCI6MjAzNTYxMzI5NX0.70tTjB7AEU9Bym_cwM72s3usO-Sxa44lL2aqL_9683w";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
