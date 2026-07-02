import { getAdmin } from '@/lib/admin/auth'
import { ChangePassword } from '@/components/admin/ChangePassword'

export const dynamic = 'force-dynamic'

export default async function CuentaPage() {
  const user = await getAdmin()
  return (
    <>
      <h1 className="adm-h1">Cuenta</h1>
      <p className="adm-sub">Sesión: {user?.email}</p>
      <ChangePassword />
    </>
  )
}
