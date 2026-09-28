import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Pengelolaan Sampah</h1>
      
      <p className="text-gray-600 mb-8">
        Selamat datang di aplikasi pencatatan laporan sampah dari masyarakat.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Jenis Sampah"
          description="Kelola jenis-jenis sampah"
          icon="📦"
          href="/jenis-sampah"
          color="bg-blue-500"
        />
        
        <DashboardCard
          title="Wilayah"
          description="Kelola data wilayah"
          icon="📍"
          href="/wilayah"
          color="bg-green-500"
        />
        
        <DashboardCard
          title="User"
          description="Kelola data pengguna"
          icon="👤"
          href="/user"
          color="bg-purple-500"
        />
        
        <DashboardCard
          title="Buat Laporan"
          description="Buat laporan sampah baru"
          icon="📝"
          href="/laporan/baru"
          color="bg-orange-500"
        />
      </div>
    </div>
  );
}

function DashboardCard({ title, description, icon, href, color }: {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}) {
  return (
    <Link href={href}>
      <div className={`${color} text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer`}>
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
      </div>
    </Link>
  );
}