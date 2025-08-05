export interface Article {
  _id?: string;          // Usado por MongoDB, opcional
  id?: number;           // Si usas id numérico, opcional
  title: string;
  excerpt?: string;      // Resumen o descripción corta, opcional
  imageUrl?: string;
  category: string;
  content: string;       // El contenido del artículo (obligatorio)
}
