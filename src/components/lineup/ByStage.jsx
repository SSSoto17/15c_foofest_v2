import Accordion from "@/components/Accordion";
import StageSchedule from "@/components/lineup/schedule/StageSchedule";

const ByStage = ({ data }) => {
  const stages = data;
  // console.log("STAGES", stages);
  const Midgard = stages.Midgard;
  const Vanaheim = stages.Vanaheim;
  const Jotunheim = stages.Jotunheim;
  // console.log("JOTUNHEIM", Jotunheim);

  return (
    <section className="grid gap-4">
      <Accordion variant="primary" label="Jotunheim" name="stage">
        <StageSchedule data={Jotunheim}></StageSchedule>
      </Accordion>
      <Accordion variant="primary" label="Midgard" name="stage">
        <StageSchedule data={Midgard}></StageSchedule>
      </Accordion>
      <Accordion variant="primary" label="Vanaheim" name="stage">
        <StageSchedule data={Vanaheim}></StageSchedule>
      </Accordion>
    </section>
  );
};

export default ByStage;
