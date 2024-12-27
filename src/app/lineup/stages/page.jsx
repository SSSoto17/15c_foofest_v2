import { getStages } from "@/lib/lineup";
import LineupLayout from "@/components/lineup/LineupLayout";
import ByStage from "@/components/lineup/ByStage";

export default async function Stages() {
  const stages = await getStages();

  return (
    <LineupLayout category="stages">
      <ByStage data={stages}></ByStage>
    </LineupLayout>
  );
}
