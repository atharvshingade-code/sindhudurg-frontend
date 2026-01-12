import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function useProfile(user) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user) return;

    supabase
      .from("my_profile")
      .select("*")
      .single()
      .then(({ data }) => {
        setProfile(data);
      });
  }, [user]);

  return profile;
}
