import { redirect } from 'next/navigation'

/** "Contenido" se edita en el editor a pantalla completa. */
export default function AdminHome() {
  redirect('/admin/editar')
}
