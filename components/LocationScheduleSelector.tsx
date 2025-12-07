import React, { useState } from 'react';

interface LocationScheduleSelectorProps {
  address: string;
  setAddress: (addr: string) => void;
  schedule: string;
  setSchedule: (sched: string) => void;
}

const LocationScheduleSelector: React.FC<LocationScheduleSelectorProps> = ({
  address,
  setAddress,
  schedule,
  setSchedule,
}) => {
  const [isLocating, setIsLocating] = useState(false);
  const [isDateFocused, setIsDateFocused] = useState(false);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("La geolocalización no es compatible con este navegador.");
      return;
    }

    setIsLocating(true);
    
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // In a real production app, you would use a Geocoding API here.
        // For now, we will fill it with the coordinates.
        setAddress(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        setIsLocating(false);
      },
      (error) => {
        console.error("Error Geolocation:", error.message);
        
        let msg = "No se pudo obtener la ubicación.";
        switch(error.code) {
          case error.PERMISSION_DENIED:
            msg = "Permiso denegado. Por favor permite el acceso a la ubicación en tu navegador.";
            break;
          case error.POSITION_UNAVAILABLE:
            msg = "La ubicación no está disponible actualmente.";
            break;
          case error.TIMEOUT:
            msg = "Se agotó el tiempo de espera para obtener la ubicación.";
            break;
        }
        
        alert(msg);
        setIsLocating(false);
      },
      options
    );
  };

  return (
    <div>
      <h2 className="text-lg font-bold leading-tight tracking-tight text-text-primary-light dark:text-text-primary-dark mb-3">
        Ubicación y Cita
      </h2>
      <div className="space-y-3">
        {/* Address Input */}
        <div className="group flex items-center gap-4 rounded-xl border border-border-light bg-card-light p-4 dark:border-border-dark dark:bg-card-dark focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
          <span className="material-symbols-outlined text-2xl text-text-secondary-light dark:text-text-secondary-dark group-focus-within:text-primary transition-colors">
            location_on
          </span>
          <div className="flex-1">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-transparent border-none p-0 text-base text-text-primary-light dark:text-text-primary-dark focus:ring-0 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark outline-none"
              placeholder="Dirección del servicio"
            />
          </div>
          <button
            type="button"
            onClick={handleDetectLocation}
            disabled={isLocating}
            title="Usar mi ubicación actual"
            className="flex size-8 items-center justify-center rounded-full text-primary hover:bg-primary/10 active:scale-90 transition-all disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-xl ${isLocating ? 'animate-spin' : ''}`}>
              {isLocating ? 'progress_activity' : 'my_location'}
            </span>
          </button>
        </div>

        {/* Schedule Input */}
        <div className="group flex items-center gap-4 rounded-xl border border-border-light bg-card-light p-4 dark:border-border-dark dark:bg-card-dark focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all relative">
          <span className="material-symbols-outlined text-2xl text-text-secondary-light dark:text-text-secondary-dark group-focus-within:text-primary transition-colors">
            calendar_month
          </span>
          <div className="flex-1 relative h-6">
            <input
              type="datetime-local"
              value={schedule}
              onFocus={() => setIsDateFocused(true)}
              onBlur={() => setIsDateFocused(false)}
              onChange={(e) => setSchedule(e.target.value)}
              className="w-full h-full bg-transparent border-none p-0 text-base text-text-primary-light dark:text-text-primary-dark focus:ring-0 outline-none font-sans"
              style={{ colorScheme: 'light dark' }} 
            />
            
            {/* Custom Placeholder Overlay: Covers the messy native inputs when empty and not focused */}
            {!schedule && !isDateFocused && (
              <div className="pointer-events-none absolute inset-0 flex items-center bg-card-light dark:bg-card-dark">
                <span className="text-base text-text-secondary-light dark:text-text-secondary-dark truncate">
                  Selecciona fecha y hora
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationScheduleSelector;