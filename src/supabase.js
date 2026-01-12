import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ygalnjqobfvlaphptqqy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnYWxuanFvYmZ2bGFwaHB0cXF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMDU5NzksImV4cCI6MjA4MzY4MTk3OX0.WXscffVydY0HEfoB8R8MTduL3tJ8lX39h25748t9mk0"
);
