import { Separator } from "@/components/ui/separator";
import { AverageScore } from "./average-score";
import { SpiderGraph } from "./spider-graph";
import { H2 } from "@/components/ui/header/header-h2";
import { scoresService } from "../instance";
import { AddAssignment } from "./add-assignment";
import { Assignments } from "./accordion/assignments";

export async function ScoreBoard() {
  const hardcodedUserId = 1;
/*   const scores = */
/*     await scoresService.getScoreById(hardcodedUserId); */
    const assignments =  await scoresService.getAssignmentsById(hardcodedUserId)


  return (
    <section className="min-w-72">
      <Separator className="my-4" />
      <H2>Salt Scoring</H2>
{/*       <AverageScore averageScore={scores.averageScore} /> */}
{/*       <SpiderGraph scores={scores} /> */}
      <AddAssignment/>
      <Assignments assignments={assignments}/>
    </section>
  );
}
