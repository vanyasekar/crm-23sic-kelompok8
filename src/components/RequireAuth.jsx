import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function RequireAuth({ children, role }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) return setLoading(false);

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profile?.role === role) {
        setAllowed(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, [role]);

  if (loading) return <div>Loading...</div>;
  if (!allowed) return <Navigate to="/401" replace />;

  return children;
}
