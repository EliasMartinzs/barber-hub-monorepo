import {
  Actions,
  Categories,
  Hero,
  Schedule,
  Services,
  Stats,
} from "./_componentes";

const mockStats = {
  todayAppointments: 12,
  weeklyRevenue: 4850,
  totalClients: 156,
  rating: 4.9,
};

const mockAppointments = [
  {
    id: "1",
    client: "Carlos Eduardo",
    service: "Corte Masculino + Barba",
    time: "09:00",
    price: 85,
    status: "COMPLETED" as const,
  },
  {
    id: "2",
    client: "Rafael Silva",
    service: "Corte Degradê",
    time: "10:30",
    price: 45,
    status: "SCHEDULED" as const,
  },
  {
    id: "3",
    client: "Bruno Santos",
    service: "Barba Modelada",
    time: "11:30",
    price: 35,
    status: "SCHEDULED" as const,
  },
  {
    id: "4",
    client: "Lucas Oliveira",
    service: "Corte + Barba + Progressiva",
    time: "14:00",
    price: 150,
    status: "SCHEDULED" as const,
  },
  {
    id: "5",
    client: "Mateus Costa",
    service: "Corte Infantil",
    time: "15:30",
    price: 30,
    status: "SCHEDULED" as const,
  },
  {
    id: "6",
    client: "Thiago Ferreira",
    service: "Sobrancelha",
    time: "16:30",
    price: 25,
    status: "SCHEDULED" as const,
  },
];

const mockCategories = [
  {
    id: "1",
    name: "CORTES",
    servicesCount: 8,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1503951914875-452162b928a1?w=400&h=400&fit=crop",
  },
  {
    id: "2",
    name: "BARBA",
    servicesCount: 5,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop",
  },
  {
    id: "3",
    name: "TRATAMENTOS",
    servicesCount: 4,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=400&fit=crop",
  },
  {
    id: "4",
    name: "PACOTES",
    servicesCount: 3,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34cb?w=400&h=400&fit=crop",
  },
];

const mockServices = [
  { id: "1", name: "Corte Masculino", price: 45, duration: 30 },
  { id: "2", name: "Corte + Barba", price: 85, duration: 60 },
  { id: "3", name: "Barba Modelada", price: 35, duration: 30 },
  { id: "4", name: "Corte Degradê", price: 45, duration: 30 },
  { id: "5", name: "Progressiva", price: 80, duration: 90 },
  { id: "6", name: "Sobrancelha", price: 25, duration: 15 },
];

export default async function Dashboard({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <Hero />
      <Stats stats={mockStats} />
      <Schedule appointments={mockAppointments} />
      <Categories categories={mockCategories} slug={slug} />
      <Services services={mockServices} />
      <Actions slug={slug} />
    </>
  );
}
