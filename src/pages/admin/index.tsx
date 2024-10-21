import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Admin = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/admin/dashboard");

    return () => {};
  }, []);

  return <div>Admin</div>;
};

export default Admin;
