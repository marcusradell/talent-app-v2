import { projectService } from "./instance";

export async function seedProjects() {
  const projects = [
    {
      username: "Lawe Sangena",
      title: "Portfolio Planner",
      repository: "https://github.com/Lawe02/PortfolioPlanner",
      description: "Make easy money from pyramid pension plan",
      id: "0adc4893-cd92-497e-9c1b-3b7ef6a5dfef",
      imageUrl:
        "https://ca.slack-edge.com/TA01UCHBN-U07BFHZF4CB-c7ee64bed20c-512",
      performance: "99",
      userId: "ee3447ab-b2a4-46bc-8013-094a5ea20245",
    },
    {
      username: "Lawe Sangena v2",
      title: "Portfolio Planner v2",
      repository: "https://github.com/Lawe02/PortfolioPlanner",
      description: "Make easy money from pyramid pension plan",
      id: "1d58f4b5-b754-4869-bbe6-8b817d0060f2",
      imageUrl:
        "https://ca.slack-edge.com/TA01UCHBN-U07BFHZF4CB-c7ee64bed20c-512",
      performance: "99",
      userId: "8e4dce82-efbd-4907-abcc-604e9d51db50",
    },
  ];

  try {
    projects.map(async (project) => await projectService.add(project));
    console.log("Seeding of Projects complete!");
  } catch (error) {
    console.log("Error seeding Projects", error);
  }
}
