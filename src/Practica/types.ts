/**
 * Objeto JSON de tipo note
 */
export type note = {
  user?: string,
  title?: string,
  body?: string,
  color?: string,
}

/**
 * Tipo de dato para elaborar una petición
 */
export type RequestType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  user?: string;
  title?: string;
  newtitle?: string;
  body?: string;
  color?: string;
}

/**
 * Tipo de dato para elaborar una respuesta
 */
export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  success: boolean;
  message: [string[], string?]
  notes?: note[];
}

