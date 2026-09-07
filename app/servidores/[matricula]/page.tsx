import { ServidorDetail } from "@/features/servidores/ServidorDetail";

export default async function ServidorPage(props: PageProps<"/servidores/[matricula]">) {
  const { matricula } = await props.params;

  return <ServidorDetail matricula={decodeURIComponent(matricula)} />;
}
