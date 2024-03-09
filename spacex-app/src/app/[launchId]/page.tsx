export default function LaunchDetail({
  params,
}: {
  params: { launchId: string };
}) {
  return <h1>Details about launch {params.launchId}</h1>;
}