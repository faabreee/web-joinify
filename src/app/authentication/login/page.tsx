import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
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
                        <form className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2 text-left">
                                <h1 className="text-2xl font-bold">Welcome back</h1>
                                <p className="text-balance text-sm text-muted-foreground">
                                    Login to your account
                                </p>
                            </div>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email"/>
                                </div>
                                <div className="grid gap-2">
                                    {/*<div className="flex items-center">*/}
                                    {/*    /!*<a*!/*/}
                                    {/*    /!*    href="#"*!/*/}
                                    {/*    /!*    className="ml-auto text-sm underline-offset-4 hover:underline"*!/*/}
                                    {/*    /!*>*!/*/}
                                    {/*    /!*    Forgot your password?*!/*/}
                                    {/*    /!*</a>*!/*/}
                                    {/*</div>*/}
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password"/>
                                </div>
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                                <div
                                    className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                      <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                        Or continue with
                                      </span>
                                </div>
                                <Button variant="outline" className="w-full">
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

                                    Login with Google
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link href={"register"} className="underline">
                                    Sign up
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}