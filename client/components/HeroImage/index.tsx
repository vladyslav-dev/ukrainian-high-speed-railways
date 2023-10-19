export default function HeroImage() {
    return (
        <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat h-screen w-screen z-[-1]" 
            style={{ backgroundImage: "url('./railroad-background.jpg')" }}
        />
    )
}