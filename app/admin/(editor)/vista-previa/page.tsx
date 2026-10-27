import { PreviewFrame } from '@/components/admin/PreviewFrame'

/** La página que va dentro del iframe del editor. No trae contenido: lo
 *  recibe del editor (el layout ya verificó que sea el admin). */
export default function PreviewFramePage() {
  return <PreviewFrame />
}
