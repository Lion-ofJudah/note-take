import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function ProtectRoute({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3000/api/auth/verify-token",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        const data = await response.json();

        if (data.success) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
      } catch (error) {
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    };

    verifyToken();
  }, [navigate]);

  if (!isAuthenticated) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated && <>{children}</>;
}
