"use client";

import { Pencil } from "lucide-react";
import { z } from "zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components";
import { Project } from "../types";
import {
  updateDescriptionAction,
  deleteProjectAction,
  revalidate,
  updateCommitsAction,
  updateIssuesAction,
} from "../actions";
import { useState } from "react";
import UpdateDescription from "./update-description";
import UpdateData from "./update-data";
import UpdateData from "./update-data";
import DeleteProject from "./delete-project";
import { updateFormSchema } from "../validation";
import { extractRepositoryDetails } from "../logic";
import { extractRepositoryDetails } from "../logic";

type Props = {
  project: Project;
};

export default function EditProjectDetails({ project }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const { username, titleFromUrl } = extractRepositoryDetails(
    project.repository
  );
  async function updateProjectData() {
  const { username, titleFromUrl } = extractRepositoryDetails(
    project.repository
  );
  async function updateProjectData() {
    try {
      setLoading(true);
      await updatePerformanceScoreAction(project.projectWebsite!, project.id);
      await updateCommitsAction(username, titleFromUrl, project.id);
      await updateIssuesAction(username, titleFromUrl, project.id);
    } catch (error) {
      console.log("error updating project:", error);
    }
    setLoading(false);
    revalidate();
  }

  async function onSubmit(values: z.infer<typeof updateFormSchema>) {
    const updateDescription = {
      id: project.id,
      description: values.description,
      imageUrl: values.imageUrl,
    };
    try {
      await updateDescriptionAction(updateDescription);
    } catch (error) {
      console.log("error updating performance:", error);
    }
    revalidate();
  }
  async function deleteProject() {
    await deleteProjectAction(project.id);
  }
  const placeholder = {
    description: project.description,
    imageUrl: project.imageUrl,
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Pencil size={20} strokeWidth={2.5} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit project</DialogTitle>
            <DialogDescription>
              Make changes to your project here. Click save when you´re done.
            </DialogDescription>
          </DialogHeader>
          <UpdateData onClick={updateProjectData} loading={loading} />
          <UpdateDescription onSubmit={onSubmit} placeholder={placeholder} />
          <DeleteProject onClick={deleteProject} />
        </DialogContent>
      </Dialog>
    </>
  );
}
