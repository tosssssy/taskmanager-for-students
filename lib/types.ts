export type SubjectProps = {
  id: number;
  author: {
    name: string;
    email: string;
  } | null;
  name: string;
  date: Date;
  period: number;
  day: string;
  status: number;
  memo?: string;
};

export type NewSubjectProps = {
  newSubject: Pick<SubjectProps, "name" | "date" | "period" | "day">;
};

export type UpdateSubjectTypes = {
  updateData: Pick<SubjectProps, "id" | "status" | "memo">;
};
