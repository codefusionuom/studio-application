import { Avatar } from "@material-tailwind/react";

export function QuickAvatar() {
  return (
    <div className="pr-5">
      <Avatar
        src="https://docs.material-tailwind.com/img/face-2.jpg"
        alt="avatar"
        size="xxl"
      />
    </div>
  );
}
