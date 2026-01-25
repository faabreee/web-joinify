"use client";

export default function Index() {
    return (
        <main className="min-h-screen">
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col items-center justify-center gap-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold">
                        Bienvenido a Mi App
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Una aplicación moderna construida con Next.js y shadcn/ui. El navbar superior permite una navegación fácil.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-semibold mb-2">Sección {item}</h3>
                                <p className="text-muted-foreground">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}