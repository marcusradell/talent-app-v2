import { faker } from "@faker-js/faker";
import { createRepository } from "../repository";
import { BackgroundInsert } from "../schema";
import { skills } from "./data";
import { db } from "@/db";

const repository = createRepository(db);

export async function backgroundsSeed(count: number = 50) {
  const avatars = await getAvatars(count);

  const backgrounds: BackgroundInsert[] = Array.from(
    { length: count },
    (_, index) => {
      return {
        name: faker.person.fullName(),
        title: faker.person.jobType(),
        bio: faker.person.bio(),
        avatarUrl: avatars[index],
        languages: faker.helpers.arrayElements(
          ["English", "Swedish", "Spanish", "French", "German"],
          3
        ),
        educations: faker.helpers.arrayElements(
          [
            "B.Sc. in Computer Science",
            "M.Sc. in Artificial Intelligence",
            "Ph.D. in Software Engineering",
            "Diploma in Data Science",
            "Certificate in UX Design",
          ],
          2
        ),
        skills: faker.helpers.arrayElements(skills, 10).map((skill) => {
          return {
            id: faker.string.uuid(),
            text: skill,
          };
        }),
        links: faker.helpers
          .arrayElements([
            { url: "https://github.com/alimohseni99", name: "Github" },
            {
              url: "https://www.linkedin.com/in/ali-mohseni-se",
              name: "LinkedIn",
            },
            { url: "https://www.alimohseni.se/", name: "Resume" },
          ])
          .sort((a, b) => a.name.localeCompare(b.name)),
      };
    }
  );
  backgrounds.forEach((background) => {
    repository.add(background);
  });
  console.log("Done seeding Backgrounds...");
}

async function getAvatars(count: number) {
  const result = await fetch(`https://randomuser.me/api/?results=${count}`);
  const data = await result.json();
  return data.results.map(
    (user: { picture: { large: unknown } }) => user.picture.large
  );
}
