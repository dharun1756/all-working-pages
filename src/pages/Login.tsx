import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";

const images = [
    "/IMG_4201.jpg",
    "/IMG_4207.jpg",
    "/IMG_4228.jpg",
    "/IMG_4233.jpg",
    "/IMG_4236.jpg",
    "/IMG_4238.jpg",
    "/IMG_4242.jpg",
    "/IMG_4243.jpg",
    "/IMG_4245.jpg",
    "/IMG_4261.jpg",
    "/IMG_4279.jpg",
    "/IMG_4295.jpg",
    "/IMG_6110.jpg",
    "/IMG_6494.jpg",
    "/IMG_6499.jpg",
];

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast({
                title: "Missing fields",
                description: "Please enter both email and password.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                toast({
                    title: "Login failed",
                    description: error.message,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Welcome back!",
                    description: "You have been logged in successfully.",
                });
                navigate("/");
            }
        } catch {
            toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex w-screen h-screen overflow-hidden font-sans">

            {/* LEFT SIDE — Animated image cards (60%) */}
            <div className="relative flex-1 h-full overflow-hidden bg-[hsl(222,47%,8%)] max-md:hidden">
                <div className="auth-bg">
                    {/* Column 1 - scrolling up */}
                    <div className="auth-col flex-1 flex flex-col gap-4 animate-scroll-up">
                        {[...images, ...images].map((src, i) => (
                            <div key={`c1-${i}`} className="shrink-0 rounded-2xl overflow-hidden shadow-lg border border-white/5">
                                <img src={src} alt="" loading="lazy" className="w-full h-[260px] object-cover block brightness-[0.85] saturate-[1.1]" />
                            </div>
                        ))}
                    </div>
                    {/* Column 2 - scrolling down */}
                    <div className="auth-col flex-1 flex flex-col gap-4 animate-scroll-down">
                        {[...images.slice(3), ...images, ...images.slice(0, 4)].map((src, i) => (
                            <div key={`c2-${i}`} className="shrink-0 rounded-2xl overflow-hidden shadow-lg border border-white/5">
                                <img src={src} alt="" loading="lazy" className="w-full h-[260px] object-cover block brightness-[0.85] saturate-[1.1]" />
                            </div>
                        ))}
                    </div>
                    {/* Column 3 - scrolling up (slower) */}
                    <div className="auth-col flex-1 flex flex-col gap-4 animate-scroll-up-slow">
                        {[...images.slice(5), ...images, ...images.slice(0, 5)].map((src, i) => (
                            <div key={`c3-${i}`} className="shrink-0 rounded-2xl overflow-hidden shadow-lg border border-white/5">
                                <img src={src} alt="" loading="lazy" className="w-full h-[260px] object-cover block brightness-[0.85] saturate-[1.1]" />
                            </div>
                        ))}
                    </div>
                    {/* Column 4 - scrolling down (slower) */}
                    <div className="auth-col flex-1 flex flex-col gap-4 animate-scroll-down-slow">
                        {[...images.slice(1), ...images, ...images.slice(0, 2)].map((src, i) => (
                            <div key={`c4-${i}`} className="shrink-0 rounded-2xl overflow-hidden shadow-lg border border-white/5">
                                <img src={src} alt="" loading="lazy" className="w-full h-[260px] object-cover block brightness-[0.85] saturate-[1.1]" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE — Video + Form (40%) */}
            <div className="relative w-[40%] min-w-[400px] h-full overflow-hidden max-md:w-full max-md:min-w-0">
                <video
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    src="/15293315_1080_1920_30fps.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                {/* Overlay */}
                <div className="absolute inset-0 z-[1] bg-[rgba(15,23,42,0.55)] backdrop-blur-[1px]" />

                {/* Login form */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-7">
                    <div className="w-full max-w-[380px] bg-[#464646]/90 backdrop-blur-[24px] backdrop-saturate-[1.4] border border-white/15 rounded-3xl py-10 px-8 shadow-[0_24px_80px_rgba(0,0,0,0.35),inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_1px_0_0_rgba(255,255,255,0.1)] animate-[cardAppear_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards] text-slate-100">
                        {/* Logo / Brand */}
                        <div className="text-center mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0C66F2] to-[#0952C8] flex items-center justify-center mx-auto mb-4 shadow-lg animate-[logoPulse_3s_ease-in-out_infinite]">
                                <LogIn className="w-7 h-7 text-primary-foreground" />
                            </div>
                            <h1 className="text-[26px] font-bold tracking-tight text-white mb-1.5">Welcome Back</h1>
                            <p className="text-sm text-white/55">Sign in to your account to continue</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleLogin} className="flex flex-col gap-[18px]">
                            <div className="space-y-2">
                                <Label htmlFor="login-email" className="!text-white/70 text-[13px]">
                                    Email Address
                                </Label>
                                <Input
                                    id="login-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="!bg-white/[0.07] !border-white/[0.12] !text-white !rounded-xl !h-11 !text-sm transition-all duration-200 placeholder:!text-white/30 focus:!bg-white/10 focus:!border-[hsl(217,91%,60%)] focus:!ring-[3px] focus:!ring-blue-500/15 focus:!outline-none"
                                    autoComplete="email"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="login-password" className="!text-white/70 text-[13px]">
                                        Password
                                    </Label>
                                    <button
                                        type="button"
                                        className="text-xs text-secondary hover:text-secondary/80 transition-colors font-medium"
                                        tabIndex={-1}
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="login-password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="!bg-white/[0.07] !border-white/[0.12] !text-white !rounded-xl !h-11 !text-sm transition-all duration-200 placeholder:!text-white/30 focus:!bg-white/10 focus:!border-[hsl(217,91%,60%)] focus:!ring-[3px] focus:!ring-blue-500/15 focus:!outline-none !pr-10"
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-11 text-sm font-semibold mt-1.5 !border-none !rounded-xl !bg-gradient-to-br !from-[#0C66F2] !to-[#0952C8] !shadow-[0_4px_16px_rgba(12,102,242,0.3)] transition-all duration-250 hover:!-translate-y-px hover:!shadow-[0_8px_28px_rgba(12,102,242,0.45)] active:!translate-y-0"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
