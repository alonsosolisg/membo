import { createClient } from "@supabase/supabase-js";

//Import Supabase Keys
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_ANON_KEY;

//Create Supabase Client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
