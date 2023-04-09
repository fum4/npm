interface Props {
  params: {
    id: string;
  };
}

export default function Step({ params }: Props) {
  return <div>{params.id}</div>;
}
