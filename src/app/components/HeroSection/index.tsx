import Image from "next/image";

export default function HeroSection() {
    return (
        <header className="relative w-full h-[50vh] lg:h-[60vh] flex items-center justify-center text-center">
            {/* Imagen de fondo */}
            <Image
                loading="eager"
                src="/HeroBG.webp"
                alt="Hero background"
                fill
                priority
                className="object-cover -z-10"
            />
            
            {/* Overlay oscuro para mejor contraste */}
            <div className="absolute inset-0 bg-black/40 -z-5" />
            
            {/* Contenido principal */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
                <div className="bg-white/15 backdrop-blur-md rounded-3xl px-8 py-10 md:px-12 md:py-14 shadow-2xl border border-white/20 animate__animated animate__fadeInUp">
                    <h1 className="text-[32px] md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl mb-4 font-geist">
                        Ministerio de Obras Públicas y Transportes
                    </h1>
                    <p className="text-base md:text-lg text-white/90 drop-shadow-lg font-inter max-w-2xl mx-auto">
                        Construyendo infraestructura para el desarrollo y progreso de El Salvador
                    </p>
                </div>
            </div>
        </header>
    );
}
