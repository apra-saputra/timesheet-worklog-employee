"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "../commons/DatePicker";
import SelectProjectComponent from "../commons/SelectProjectComponent";
import { projects } from "@/utils/constants/dummyData";
import { Card, CardContent, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { useRouter } from "next/router";

type FormSchema = {
  userId: string;
  projectId: string;
  detail: string;
  hoursWorked: number | undefined;
};

interface FormComponentProps {
  className?: string;
}

const FormComponent: React.FC<FormComponentProps> = ({ className }) => {
  const { toast } = useToast();
  const router = useRouter();

  const [form, setForm] = useState<FormSchema>({
    userId: "6d22b435-7318-41b9-9f87-477fbdd37f56",
    projectId: "9418fc1a-6a88-45b2-9209-62b49bfca83d",
    detail: "",
    hoursWorked: undefined,
  });
  const [dateWorked, setDateWorked] = useState<Date | undefined>(undefined);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      if (!dateWorked) {
        throw new Error("Date Invalid");
      }
      const values = { ...form, dateWorked };
      await axios("/api/logs", {
        method: "POST",
        data: values,
      });
      
      toast({
        title: "Success",
        description: "Your record has been saved",
        duration: 1000 * 3,
      });
      router.push("/admin/dashboard");
    } catch (error) {
      const err = error as Error;
      toast({
        variant: "destructive",
        title: "Ooops something wrong",
        description: err.message.toString(),
        duration: 1000 * 5,
      });
    }
  }

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <h2 className="text-2xl font-semibold">Form Input</h2>
      </CardHeader>
      <CardContent className="w-full">
        <form onSubmit={onSubmit} className="space-y-8 min-w-[320px]">
          <div>
            <Label>Work Detail</Label>
            <Textarea
              placeholder="Work Detail"
              cols={3}
              onChange={(e) =>
                setForm((prevState) => ({
                  ...prevState,
                  detail: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <Label>Project</Label>
            <SelectProjectComponent
              data={projects}
              placeholder="Select Project"
              onChange={(value) =>
                setForm((prevState) => ({ ...prevState, projectId: value }))
              }
              variable={form.projectId}
            />
          </div>
          <Separator />
          <div>
            <Label>Date</Label>
            <DatePicker value={dateWorked || ""} onSelect={setDateWorked} />
          </div>
          <div>
            <Label>Hours</Label>
            <Input
              placeholder="in hours (1-8)"
              // {...field}
              name="hoursWorked"
              value={form.hoursWorked}
              onChange={onChange}
            />
          </div>
          <Separator />

          <Button type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormComponent;
