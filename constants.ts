import { ServiceProblem, Photo } from './types';

export const PROBLEM_TYPES: ServiceProblem[] = [
  { id: 'leak', label: 'Fuga de agua' },
  { id: 'clog', label: 'Tubería atascada' },
  { id: 'install', label: 'Instalación nueva' },
  { id: 'heater', label: 'Calentador' },
  { id: 'other', label: 'Otro' },
];

export const INITIAL_PHOTOS: Photo[] = [
  {
    id: '1',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBINNww9hgESL3byUn3kn42Eg1TRMKAQBMs7tug6A0EkGM7i96oJ00PaUztyJostO6gf02UJHAmBpC_TtFBBeXKk7xyunyf2gjv-_LRkw6aj6rPzoy40PlF1B8Y77n8_T0-OTCrj37W5paPJpYmXe0zO-QUxpY2hUx-3s_O84rSTXPG68_J4C5jRcHY-WjQ3hi2eZeQkn-hrPuPtcvIWbNMLSJ1oL4caOcVSW8gUNS6faMSiNKmPbptuTEenJomK-750guaYLEmZm0',
    alt: 'Leaking kitchen faucet with a puddle underneath'
  },
  {
    id: '2',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAXqAIhbPjc925jIXouGqtccbkpOm4HpZVCnFNp5q1BJtf_LEoftUtCxkZga1cuZ0-p94f0KYdkqcPQII-pvWoJfJRuQtIbXWc0Di0rwKU8WNRDc4-CuPqIgUop6AD0HRedh5HdDLL3KcWMzlnzfkq5WcagaaRfwKyiTu4TWk0c58d7fset5hRuzQ_tEKS17Gx91DQ-l4pAkPVW8noXy2kxHZR9LMHqQVICAjLpMVwvgDfBTKmGSPAQtxfbBUhrCDDSbpbGnqW4fQ',
    alt: 'Close-up of a corroded pipe under a sink'
  }
];

export const INITIAL_ADDRESS = "Av. Siempre Viva 742";
export const INITIAL_SCHEDULE = ""; // Empty to force user selection via picker
export const INITIAL_DESCRIPTION = "";
export const INITIAL_NAME = "";
export const INITIAL_PHONE = "";

// TODO: REEMPLAZA ESTA URL CON LA URL DE TU APLICACIÓN WEB DE GOOGLE APPS SCRIPT
// Para obtenerla:
// 1. Ve a tu Google Sheet -> Extensiones -> Apps Script
// 2. Pega el código de abajo en el editor.
// 3. Dale a "Implementar" -> "Nueva implementación" -> Selecciona "Aplicación web".
// 4. En "Quién tiene acceso", selecciona "Cualquier usuario" (Anyone).
// 5. Copia la URL generada y pégala aquí.
export const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwz903CMYI9nNzDfaMX88ZNgqV5PCaXdKUxzxqmQM5nqPz9W0MuYIRwXbMjqOpWAfYs/exec";



/* 
=== CÓDIGO GOOGLE APPS SCRIPT ACTUALIZADO ===

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  var timestamp = new Date();
  
  // Asume que las columnas son: Fecha, Nombre, Teléfono, Problema, Descripción, Dirección, Horario, Fotos
  sheet.appendRow([
    timestamp,
    data.name,
    data.phone,
    data.problemType,
    data.description,
    data.address,
    data.schedule,
    data.photos.join(", ")
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

*/