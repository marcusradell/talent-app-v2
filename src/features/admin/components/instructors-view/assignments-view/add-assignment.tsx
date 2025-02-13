"use client";

import { Button } from "@/components/ui/button";
import { createAssignmentAction } from "@/features/admin/action";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components";
import { Plus } from "lucide-react";

type Props = {
  cohorts: { id: string; name: string }[];
};

export function AddAssignmentForm({ cohorts }: Props) {
  const [selectedCohort, setSelectedCohort] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);

    try {
      await createAssignmentAction(formData);
      setOpen(false);
    } catch (error) {
      console.error("Failed to create assignment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer flex gap-1 justify-center items-center mt-4 mb-4"
          onClick={() => setOpen(true)}
        >
          <Plus className="text-primary font-semibold" size={18} />
          <p className="font-semibold">Add assignment</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add assignment</DialogTitle>
          <DialogDescription>
            Add a new assignment here. Click submit when you are done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter assignment title"
              required
            />
          </div>

          <div>
            <Label htmlFor="categories">Categories</Label>
            <Input
              id="categories"
              name="categories"
              placeholder="Enter categories (comma-separated)"
            />
            <p className="text-sm text-gray-500 mt-1">
              Separate multiple categories with commas
            </p>
          </div>

          <div>
            <Label htmlFor="cohortId">Cohort</Label>
            <Select value={selectedCohort} onValueChange={setSelectedCohort}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Cohort" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Cohorts</SelectLabel>
                  {cohorts.map((cohort) => (
                    <SelectItem
                      key={cohort.id}
                      value={cohort.id}
                      className="cursor-pointer"
                    >
                      {cohort.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <input type="hidden" name="cohortId" value={selectedCohort} />
          </div>

          <div>
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              name="comment"
              placeholder="Add any additional comments or instructions"
              className="min-h-[100px]"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
