import { USERS } from "@/common";
import { AuthServer } from "@/tmsui";
import { useQuery } from "@tanstack/react-query";
import { TUserFormComponentSchema } from "../form/user.form.type";
import UsersDetailsView from "./users.details.view";

export default function UsersDetailsComponent({ editData, modalRef }: TUserFormComponentSchema) {
  // Fetch fresh user data with training counts when modal is open
  const { data: userData, isLoading } = useQuery({
    queryKey: ["user-details", editData?.userId],
    queryFn: async () => {
      const response = await AuthServer({
        method: "GET",
        url: USERS.FIND_BY_ID(editData?.userId ?? ""),
      });
      return response.data;
    },
    enabled: !!editData?.userId,
  });

  // Use fetched data if available, otherwise fall back to editData
  const userDetails = userData || editData;

  return <UsersDetailsView editData={userDetails} modalRef={modalRef} isLoading={isLoading} />;
}
