import React, { useState } from 'react';
import Header from './components/Header';
import ProblemSelector from './components/ProblemSelector';
import PhotoUploader from './components/PhotoUploader';
import ChatBot from './components/ChatBot';
import LocationScheduleSelector from './components/LocationScheduleSelector';
import ContactInfo from './components/ContactInfo';
import { Photo } from './types';
import { 
  INITIAL_PHOTOS, 
  INITIAL_ADDRESS, 
  INITIAL_SCHEDULE, 
  INITIAL_DESCRIPTION, 
  INITIAL_NAME,
  INITIAL_PHONE,
  GOOGLE_SHEET_URL 
} from './constants';

const App: React.FC = () => {
  // State
  const [selectedProblemId, setSelectedProblemId] = useState<string>('leak');
  const [description, setDescription] = useState<string>(INITIAL_DESCRIPTION);
  const [photos, setPhotos] = useState<Photo[]>(INITIAL_PHOTOS);
  const [address, setAddress] = useState<string>(INITIAL_ADDRESS);
  const [schedule, setSchedule] = useState<string>(INITIAL_SCHEDULE);
  const [name, setName] = useState<string>(INITIAL_NAME);
  const [phone, setPhone] = useState<string>(INITIAL_PHONE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handlers
  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddPhoto = (file: File) => {
    // In a real app, this would upload to a server. 
    // Here we just create a local object URL for preview.
    const newPhoto: Photo = {
      id: Date.now().toString(),
      url: URL.createObjectURL(file),
      alt: file.name
    };
    setPhotos((prev) => [...prev, newPhoto]);
  };

  const validateForm = (): boolean => {
    if (!selectedProblemId) {
      alert("Por favor selecciona un tipo de problema.");
      return false;
    }

    if (!description.trim()) {
      alert("Por favor describe brevemente tu problema.");
      return false;
    }

    // Photos are optional as per UI ("opcional")

    if (!address.trim()) {
      alert("Por favor ingresa la dirección del servicio.");
      return false;
    }

    if (!schedule) {
      alert("Por favor selecciona la fecha y hora de la cita.");
      return false;
    }

    if (!name.trim()) {
      alert("Por favor ingresa tu nombre completo.");
      return false;
    }

    if (!phone.trim() || phone.trim().length < 6) {
      alert("Por favor ingresa un número de teléfono válido.");
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setSelectedProblemId('leak');
    setDescription("");
    setPhotos([]); // Clear all photos (even initial mocks)
    setAddress("");
    setSchedule("");
    setName("");
    setPhone("");
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (GOOGLE_SHEET_URL.includes("PLACEHOLDER")) {
      alert("Por favor configura la URL de Google Apps Script en constants.ts primero.");
      return;
    }

    // Run Validation
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    const payload = {
      name,
      phone,
      problemType: selectedProblemId,
      description,
      address,
      schedule,
      photos: photos.map(p => p.url) // Note: Local blob URLs won't be accessible by Google Sheets, only public URLs
    };

    try {
      // We use 'no-cors' mode usually for Google Apps Script to avoid CORS errors in simple client setups,
      // strictly speaking this makes the response opaque, but it sends the data.
      // However, sending as text/plain often bypasses the strict preflight check if the server accepts it.
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload)
      });

      alert('¡Solicitud enviada con éxito! Nos pondremos en contacto contigo pronto.');
      resetForm();
    } catch (error) {
      console.error(error);
      alert('Hubo un error al enviar la solicitud. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden group/design-root">
      <Header />

      <main className="flex-1 pb-32">
        <div className="p-4 space-y-8">
          
          {/* Section 1: Problem Selection */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0ms' }}>
            <ProblemSelector 
              selectedId={selectedProblemId} 
              onSelect={setSelectedProblemId} 
            />
          </section>

          {/* Section 2: Description */}
          <section className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h2 className="text-lg font-bold leading-tight tracking-tight text-text-primary-light dark:text-text-primary-dark mb-3">
              Describe tu problema <span className="text-red-500">*</span>
            </h2>
            <div className="relative">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex w-full resize-none overflow-hidden rounded-xl border border-border-light bg-card-light p-4 text-base font-normal leading-normal text-text-primary-light placeholder:text-text-secondary-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-card-dark dark:text-text-primary-dark dark:placeholder:text-text-secondary-dark dark:focus:border-primary transition-all"
                placeholder="Ej: El grifo de la cocina gotea constantemente y hay un charco debajo del fregadero."
                rows={4}
              />
            </div>
          </section>

          {/* Section 3: Photos */}
          <section className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <PhotoUploader 
              photos={photos} 
              onRemove={handleRemovePhoto} 
              onAdd={handleAddPhoto} 
            />
          </section>

          {/* Section 4: Location & Schedule */}
          <section className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <LocationScheduleSelector 
              address={address}
              setAddress={setAddress}
              schedule={schedule}
              setSchedule={setSchedule}
            />
          </section>

          {/* Section 5: Contact Info */}
          <section className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <ContactInfo 
              name={name}
              setName={setName}
              phone={phone}
              setPhone={setPhone}
            />
          </section>
        </div>
      </main>

      {/* Chat Bot Integration */}
      <ChatBot />

      {/* Sticky Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 border-t border-border-light bg-card-light/95 p-4 backdrop-blur-md dark:border-border-dark dark:bg-card-dark/95 max-w-md mx-auto">
        <button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`
            flex h-12 w-full items-center justify-center rounded-xl bg-primary text-base font-bold text-white shadow-lg shadow-primary/30 transition-all
            ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-hover active:scale-[0.98]'}
          `}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
              Enviando...
            </span>
          ) : (
            'Enviar Solicitud'
          )}
        </button>
      </footer>
    </div>
  );
};

export default App;