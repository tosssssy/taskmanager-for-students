export type SubjectType = {
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

export type NewSubjectType = {
  newSubject: Pick<SubjectType, "name" | "date" | "period" | "day">;
};

export type UpdateSubjectTypes = {
  updateData: Pick<SubjectType, "id" | "status" | "memo">;
};
