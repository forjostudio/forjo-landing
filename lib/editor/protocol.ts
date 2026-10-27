import type { LandingContent } from '@/lib/content/schema'

/**
 * Mensajes entre el editor del panel y su vista previa (un iframe del mismo
 * origen). El editor manda el contenido tal como está en pantalla, sin
 * guardar; la vista previa lo dibuja con el mismo componente que la landing.
 * Las secciones se identifican por su clave del contenido (hero, services…),
 * que es el `data-edit` del bloque en la landing.
 */
export type ToPreview =
  /** El editor pregunta si la vista previa está lista: el iframe puede haber
   *  cargado antes de que el editor escuche, y su "ready" se habría perdido. */
  | { type: 'forjo:hello' }
  | { type: 'forjo:content'; content: LandingContent }
  | { type: 'forjo:focus'; section: string }

export type FromPreview =
  | { type: 'forjo:ready' }
  /** Clic sobre una sección de la vista previa: el editor la abre. */
  | { type: 'forjo:select'; section: string }

export function isMessage<T extends { type: string }>(data: unknown): data is T {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as { type?: unknown }).type === 'string' &&
    (data as { type: string }).type.startsWith('forjo:')
  )
}
