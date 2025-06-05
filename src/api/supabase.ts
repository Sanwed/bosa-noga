import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://icojjptjhpmvidbzcoua.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imljb2pqcHRqaHBtdmlkYnpjb3VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwOTU0OTUsImV4cCI6MjA2NDY3MTQ5NX0.gT72wYxQYqGG7U3mbv3mglISKaNW1C5RaMINLOFXsx4';

export const supabase = createClient(supabaseUrl, supabaseKey);