import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import AdminDashboard from '@/components/admin-dashboard'

export default async function AdminPage() {
  const session = await getSession()
  if (!session) redirect('/login?next=/admin')
  // Giriş yapan her kullanıcı admin panelini görüntüleyebilir.

  await dbConnect()
  const rows = await User.find({}).sort({ createdAt: -1 }).select('username email role createdAt').lean()
  const users = rows.map((u) => ({
    id: String(u._id),
    username: u.username,
    email: u.email,
    role: u.role,
    createdAt: new Date(u.createdAt).toLocaleDateString('tr-TR'),
  }))

  return <AdminDashboard currentUser={{ username: session.username || 'Yönetici', email: session.email }} users={users} />
}
