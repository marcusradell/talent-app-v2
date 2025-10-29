import { db } from "@/db";

import { createDeveloperProfilesService } from "./service";
import { iamService, secureService } from "../iam";
import { assignmentsService } from "../assignments";

const insecureDeveloperProfilesService = createDeveloperProfilesService(
  db,
  iamService.getCurrentUser,
  assignmentsService.getScoredAssignmentsByCohortIdAndIdentityId,
  assignmentsService.getAssignmentBySlug,
  assignmentsService.getAverageScoresByIdentityId
);

export const developerProfilesService = secureService(
  "developerProfiles",
  insecureDeveloperProfilesService
);
