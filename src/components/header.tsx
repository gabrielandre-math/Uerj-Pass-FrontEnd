// src/components/header.tsx
import logo from "../assets/uerj-pass-logo.svg";

export function Header() {
  return (
    <div className="flex items-center gap-5">
      <div
        className="
                           
          bg-white/20           
          backdrop-blur-md       
          border border-white/0 
          rounded-2xl            
          shadow-xs          
        "
      >
        <img
          className="w-12 h-12 object-contain"
          src={logo}
          alt="Uerj Pass Logo"
        />
      </div>

      <nav className="flex items-center gap-5 text-sm">
        <a
          href="#"
          className="
            font-medium
            text-foreground         
            hover:text-primary     
            transition
            "
        >
          Eventos
        </a>
        <a
          href="#"
          className="
            font-medium
            text-muted-foreground    
            hover:text-foreground    
            transition
            "
        >
          Participantes
        </a>
      </nav>
    </div>
  );
}
