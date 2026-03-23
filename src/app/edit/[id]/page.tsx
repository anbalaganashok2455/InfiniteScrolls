import UserInfo from "@/components/UserInfo";

interface Props {
  params: { id: string };
}

export default function EditPage({ params }: Props) {
  return <UserInfo id={params.id} />;
}
