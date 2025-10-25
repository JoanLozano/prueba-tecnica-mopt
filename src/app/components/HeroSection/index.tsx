import Image from "next/image";

export default function HeroSection() {
    return (
        <header className="relative w-full h-[40vh] lg:h-[50vh]  flex items-center justify-center text-center text-white">
            <Image
                loading="eager"
                src="/HeroBG.webp"
                alt="Hero background"
                fill
                priority
                className="object-cover -z-10"
            />
            <div className="bg-white/10 backdrop-blur-sm md:rounded-2xl px-8 py-6 shadow-lg">
                <h1 className="text-5xl font-bold drop-shadow-md">
                    Welcome to Mopt!
                </h1>
            </div>
        </header>
    );
}
