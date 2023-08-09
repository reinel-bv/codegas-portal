export interface ParamsProps {
    searchParams: {
      page?: number;
      search?: string;
      userId?: string;
      step?: string;
    };
}
   
export type RenderUsersProps = {
  page: number;
  limit: number;
  step?: string | undefined;
  access: string;
  search: string | undefined;
  userId: string | undefined;
}
