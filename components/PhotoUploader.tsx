import React, { useRef } from 'react';
import { Photo } from '../types';

interface PhotoUploaderProps {
  photos: Photo[];
  onRemove: (id: string) => void;
  onAdd: (file: File) => void;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ photos, onRemove, onAdd }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onAdd(e.target.files[0]);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold leading-tight tracking-tight text-text-primary-light dark:text-text-primary-dark mb-3">
        Añade fotos <span className="text-text-secondary-light dark:text-text-secondary-dark font-medium">(opcional)</span>
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {photos.map((photo) => (
          <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark shadow-sm">
            <img
              src={photo.url}
              alt={photo.alt}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <button
              onClick={() => onRemove(photo.id)}
              className="absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm transition-colors"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>
        ))}
        
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border-light bg-card-light text-text-secondary-light hover:border-primary hover:text-primary hover:bg-primary/5 dark:border-border-dark dark:bg-card-dark dark:text-text-secondary-dark dark:hover:border-primary dark:hover:text-primary dark:hover:bg-primary/5 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-3xl">add_photo_alternate</span>
          <span className="text-xs font-medium">Añadir foto</span>
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default PhotoUploader;