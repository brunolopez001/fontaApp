import React from 'react';

interface ContactInfoProps {
  name: string;
  setName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  name,
  setName,
  phone,
  setPhone,
}) => {
  return (
    <div>
      <h2 className="text-lg font-bold leading-tight tracking-tight text-text-primary-light dark:text-text-primary-dark mb-3">
        Datos de Contacto
      </h2>
      <div className="space-y-3">
        {/* Name Input */}
        <div className="group flex items-center gap-4 rounded-xl border border-border-light bg-card-light p-4 dark:border-border-dark dark:bg-card-dark focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
          <span className="material-symbols-outlined text-2xl text-text-secondary-light dark:text-text-secondary-dark group-focus-within:text-primary transition-colors">
            person
          </span>
          <div className="flex-1">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-none p-0 text-base text-text-primary-light dark:text-text-primary-dark focus:ring-0 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark outline-none"
              placeholder="Tu nombre completo"
            />
          </div>
        </div>

        {/* Phone Input */}
        <div className="group flex items-center gap-4 rounded-xl border border-border-light bg-card-light p-4 dark:border-border-dark dark:bg-card-dark focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
          <span className="material-symbols-outlined text-2xl text-text-secondary-light dark:text-text-secondary-dark group-focus-within:text-primary transition-colors">
            call
          </span>
          <div className="flex-1">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-transparent border-none p-0 text-base text-text-primary-light dark:text-text-primary-dark focus:ring-0 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark outline-none"
              placeholder="Número de teléfono"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;