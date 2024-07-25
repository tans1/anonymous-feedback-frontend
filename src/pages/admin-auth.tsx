import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState, useEffect } from "react";
import Posts from "./admin-posts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ThreeDots } from "react-loader-spinner";

interface Props {
  fingerprint: number;
}

export default function Admin({ fingerprint }: Props) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && storedToken.length > 0) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/validate/token`, {
          headers: { Authorization: `Bearer ${storedToken}` }
        })
        .then(() => {
          setToken(storedToken);
        })
        .catch(() => {
          toast.error("Error during login:");
          setToken(null);
        });
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLoginSuccess = (credentialResponse: any) => {
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/google/webhook`, {
        ...credentialResponse,
        user_fingerprint: fingerprint
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
      })
      .catch(() => {
        toast.error("Error during login:");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLoginError = () => {
    toast.error("Login Failed");
  };

  return (
    <>
      {token ? (
        <Posts fingerprint={fingerprint} />
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <Card className="w-[350px] shadow-lg p-5">
            <CardHeader>
              <CardTitle>Welcome !!!</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center border border-gray-200 rounded-sm">
                  <ThreeDots
                    visible={true}
                    height="50"
                    width="80"
                    color="#4fa94d"
                    radius="6"
                    ariaLabel="three-dots-loading"
                    wrapperClass=""
                  />
                </div>
              ) : (
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={handleLoginError}
                />
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
