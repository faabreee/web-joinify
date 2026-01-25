'use client'

import {Button} from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthoraLoginv2 } from "@/hooks/auth/authora";
import { useToast } from "@/hooks/use-toast";

const HOST_API_VIO_AUTHORA = process.env.NEXT_PUBLIC_HOST_API_AUTHORA;

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast()

    const { trigger, isMutating } = useAuthoraLoginv2();
    
    const redirectToAuthoraLogin = () => {
        const baseUrl = `${HOST_API_VIO_AUTHORA}/oauth2/authorize`;
    
        const params = new URLSearchParams({
            response_type: "code",
            client_id: "demo-client",
            scope: "openid profile",
            redirect_uri: "http://localhost:3000/authentication/login",
            state: "xyz123"
        });

        router.push(`${baseUrl}?${params.toString()}`);
    } 

    
    const exchangeCodeForToken = async (code: string) => {
        try {
            const response = await trigger({ code });

            document.cookie = `access_token=${response.access_token}; path=/; max-age=${response.expires_in}; SameSite=Lax`;
  
            toast({
                title: "Logeo ",
                variant: "success",
                description: "Friday, February 10, 2023 at 5:57 PM",
            })
            

            router.replace("/");
        } catch (error) {
            console.error(error);
        }
        
        router.replace("/");
    };
  
    useEffect(() => {
      const code = searchParams.get("code");
  
      // if found code then get token
      if (code) {
        exchangeCodeForToken(code);
      }
    }, [searchParams]);
  

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="relative hidden bg-muted lg:block">
                <img
                    src="https://images.unsplash.com/photo-1619658535018-5a55d32e4628?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div
                            className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        </div>
                        Joinify
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-lg">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2 text-left">
                                <h1 className="text-2xl font-bold">Welcome back</h1>
                                <p className="text-balance text-sm text-muted-foreground">
                                    Login to your account in Authora
                                </p>
                            </div>
                            <div className="grid gap-6">
                                <Button onClick={() => {

                                    toast({
                                        title: "Logeo",
                                        variant: 'success',
                                        // description: "Friday, February 10, 2023 at 5:57 PM",
                                    })

                                }}></Button>
                                <Button onClick={redirectToAuthoraLogin} className="w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100"
                                         viewBox="0 0 44 44">
                                        <path
                                            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                            fill="#FFC107"
                                        />
                                        <path
                                            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                            fill="#FF3D00"
                                        />
                                        <path
                                            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                            fill="#4CAF50"
                                        />
                                        <path
                                            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                            fill="#1976D2"
                                        />
                                    </svg>
                                    Login
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link href={"register"} className="underline">
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}